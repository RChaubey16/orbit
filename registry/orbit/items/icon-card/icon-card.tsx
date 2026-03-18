import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const iconCardVariants = cva("flex max-w-md flex-col gap-5 rounded-lg transition-colors", {
  variants: {
    variant: {
      default: "",
      surface: "p-4 rounded-md shadow-md bg-card/60 shadow-[color:var(--icon-card-color)]/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface IconCardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof iconCardVariants> {
  icon: React.ReactNode;
  title: string;
  description?: string;
  ctaTitle?: string;
  ctaLink?: string;
  color?: string;
}

export function IconCard({
  icon,
  title,
  description,
  ctaTitle,
  ctaLink,
  variant,
  color,
  className,
  style,
  ...props
}: IconCardProps) {
  const resolvedColor = color ?? "#2a9d8f";

  return (
    <div
      className={cn(iconCardVariants({ variant }), className)}
      style={
        {
          ...style,
          "--icon-card-color": resolvedColor,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="w-fit rounded-md border border-(--icon-card-color)/20 p-4 text-(--icon-card-color)">
        {icon}
      </div>

      <p className="text-foreground text-base font-semibold">
        {title} <span className="text-muted-foreground font-normal">{description}</span>
      </p>

      {ctaLink && ctaTitle && (
        <Link
          href={ctaLink}
          className="group/link flex items-center gap-1 font-semibold text-(--icon-card-color)"
        >
          {ctaTitle}

          <span className="relative h-5 w-5">
            <ChevronRight className="absolute inset-0 h-5 w-5 transition-all duration-200 group-hover/link:translate-x-1 group-hover/link:opacity-0" />
            <ArrowRight className="absolute inset-0 h-5 w-5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
          </span>
        </Link>
      )}
    </div>
  );
}
