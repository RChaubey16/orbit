"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { HoverCard } from "radix-ui";

import { cn } from "@/lib/utils";

type PreviewLinkProps = {
  children: React.ReactNode;
  className?: string;
  imageAlt?: string;
  openDelay?: number;
  closeDelay?: number;
} & (
  | { useScreenshot: true; url: string; imageSrc?: never }
  | { useScreenshot?: false; imageSrc: string; url?: never }
);

export function PreviewLink({
  className,
  children,
  imageAlt = "",
  openDelay = 100,
  closeDelay = 100,
  ...props
}: PreviewLinkProps) {
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  let src: string;
  if (props.useScreenshot && props.url) {
    const params = new URLSearchParams({
      url: props.url,
      screenshot: "true",
      meta: "false",
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": "true",
      "viewport.deviceScaleFactor": "1",
      "viewport.width": "600",
      "viewport.height": "375",
    });
    src = `https://api.microlink.io/?${params.toString()}`;
  } else {
    src = (props as { imageSrc: string }).imageSrc;
  }

  const mouseX = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 400, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLSpanElement>) {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offset = e.clientX - (rect.left + rect.width / 2);
    mouseX.set(Math.max(-50, Math.min(50, offset)));
  }

  return (
    <HoverCard.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      open={open}
      onOpenChange={setOpen}
    >
      <HoverCard.Trigger asChild>
        <span
          ref={triggerRef}
          onMouseMove={handleMouseMove}
          className={cn("inline-flex cursor-pointer", className)}
        >
          {children}
        </span>
      </HoverCard.Trigger>

      {src && (
        <HoverCard.Portal forceMount>
          <HoverCard.Content side="top" sideOffset={8} align="center" className="z-50" forceMount>
            <AnimatePresence>
              {open && (
                <motion.div
                  style={{ x }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="relative max-h-70 w-70 overflow-hidden rounded-sm shadow-lg">
                    {!imgLoaded && <div className="bg-muted absolute inset-0 animate-pulse" />}
                    <Image
                      src={src}
                      alt={imageAlt}
                      width={280}
                      height={188}
                      className="object-cover"
                      onLoad={() => setImgLoaded(true)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCard.Content>
        </HoverCard.Portal>
      )}
    </HoverCard.Root>
  );
}
