"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

type NotificationIcon =
  | string
  | StaticImageData
  | { src: string | StaticImageData; alt?: string }
  | ReactNode;

type Notification = {
  id: number | string;
  message: string;
  cta: string;
  icon?: NotificationIcon;
};

type RotatingTabsProps = {
  notifications: Notification[];
  interval?: number;
  className?: string;
};

const RotatingTabs = ({ notifications, className, interval = 4000 }: RotatingTabsProps) => {
  const [stack, setStack] = useState(notifications);

  const cycle = () => setStack(([first, ...rest]) => [...rest, first]);

  useEffect(() => {
    setStack(notifications);
  }, [notifications]);

  useEffect(() => {
    const timer = setInterval(cycle, interval);
    return () => clearInterval(timer);
  }, [interval]);

  if (!stack.length) return null;

  const renderIcon = (icon: NotificationIcon) => {
    if (typeof icon === "string") {
      return <Image src={icon} alt="" height={16} width={16} className="invert dark:invert-0" />;
    }
    if (
      typeof icon === "object" &&
      icon !== null &&
      "src" in (icon as object) &&
      !("type" in (icon as object))
    ) {
      const { src, alt } = icon as { src: string | StaticImageData; alt?: string };
      return (
        <Image src={src} alt={alt ?? ""} height={16} width={16} className="invert dark:invert-0" />
      );
    }
    return icon as ReactNode;
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className={cn("relative h-[60px] w-[460px]", className)}>
        {/* Stacked background cards */}
        {stack.slice(1, 3).map((item, i) => (
          <motion.div
            key={item.id}
            className="bg-background absolute inset-0 rounded-2xl border"
            animate={{
              y: -(i + 1) * 10,
              scaleX: 1 - (i + 1) * 0.04,
              opacity: 1 - (i + 1) * 0.35,
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            style={{ zIndex: 10 - (i + 1) }}
          />
        ))}

        {/* Front card */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={stack[0].id}
            initial={{ y: -24, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="bg-card absolute inset-0 z-20 flex items-center gap-3 rounded-2xl border px-4 shadow-sm"
          >
            {stack[0].icon && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                {renderIcon(stack[0].icon)}
              </div>
            )}

            <p className="text-foreground flex-1 text-sm">{stack[0].message}</p>

            <button
              onClick={cycle}
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors"
            >
              {stack[0].cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RotatingTabs;
