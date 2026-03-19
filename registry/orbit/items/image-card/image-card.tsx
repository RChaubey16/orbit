import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const imageCardVariants = cva("group flex max-w-md flex-col transition-colors", {
  variants: {
    variant: {
      default: "",
      background:
        "p-4 rounded-sm bg-card shadow-[0px_2px_4px_rgba(0,0,0,0.18)] dark:shadow-[inset_0_3px_10px_rgba(255,255,255,0.1)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ImageCardProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">,
    VariantProps<typeof imageCardVariants> {
  imageSrc: string;
  imageAltText: string;
  title: string;
  cardLink: string;
  subTitle?: string;
  description?: string;
}

export function ImageCard({
  imageSrc,
  imageAltText,
  title,
  subTitle,
  description,
  cardLink,
  variant,
  className,
  ...props
}: ImageCardProps) {
  return (
    <Link href={cardLink} className={cn(imageCardVariants({ variant }), className)} {...props}>
      <Image src={imageSrc} alt={imageAltText} width={500} height={500} className="rounded-sm" />

      <div className="mt-4 space-y-3">
        {subTitle && (
          <p className="text-muted-foreground flex items-center justify-between text-sm">
            {subTitle}
            <ChevronRight className="text-foreground hidden h-5 w-5 group-hover:block" />
          </p>
        )}
        <p className="text-foreground text-3xl font-semibold">{title}</p>
        <p className="text-muted-foreground text-base font-normal">{description}</p>
      </div>
    </Link>
  );
}
