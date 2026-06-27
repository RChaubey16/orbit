"use client";

import { useRef, HTMLAttributes } from "react";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
  image?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255,255,255,0.12)",
  spotlightSize = 350,
  image,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spot.style.background = `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 65%)`;
    spot.style.opacity = "1";
  }

  function handleMouseLeave() {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 rounded-[inherit]"
      />
      {image && (
        <img
          src={image}
          alt=""
          className="w-full h-36 object-cover"
        />
      )}
      {children}
    </div>
  );
}
