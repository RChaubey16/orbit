import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const testimonialCardVariants = cva(
  "bg-card flex max-w-md flex-col gap-4 rounded-lg p-4 transition-colors",
  {
    variants: {
      variant: {
        default: "border shadow-sm",
        elevated: "shadow-md",
        inset:
          "shadow-[0px_2px_4px_rgba(0,0,0,0.18)] dark:shadow-[inset_0_3px_10px_rgba(255,255,255,0.1)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof testimonialCardVariants> {
  quote: string;
  name: string;
  designation?: string;
  avatar?: string;
}

export function TestimonialCard({
  quote,
  name,
  designation,
  avatar,
  variant,
  className,
  ...props
}: TestimonialCardProps) {
  const initials =
    name
      ?.trim()
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <div className={cn(testimonialCardVariants({ variant }), className)} {...props}>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-foreground text-base font-semibold">{name}</p>

          {designation && <p className="text-muted-foreground text-sm">{designation}</p>}
        </div>
      </div>

      <p className="text-muted-foreground text-lg leading-relaxed">{quote}</p>
    </div>
  );
}
