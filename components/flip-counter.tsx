"use client";

import { useEffect, useRef, useState, HTMLAttributes } from "react";

const DIGIT_CLASS = "text-4xl font-bold font-mono text-white leading-none select-none";

function FlipDigit({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState(value);
  const [pending, setPending] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (value === displayed) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setPending(value);
    setIsFlipping(true);

    timeoutRef.current = setTimeout(() => {
      setDisplayed(value);
      setIsFlipping(false);
    }, 450);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value]);

  // h-[200%] trick: inner div is full card height so centering the digit
  // inside it lets each half-container clip the correct half of the digit.
  const half = (digit: string, position: "top" | "bottom") => (
    <div
      className={`absolute inset-x-0 h-1/2 overflow-hidden bg-zinc-900 ${position === "top" ? "top-0 rounded-t-lg" : "bottom-0 rounded-b-lg"}`}
    >
      <div className={`absolute inset-x-0 h-[200%] flex items-center justify-center ${position === "bottom" ? "bottom-0" : "top-0"}`}>
        <span className={DIGIT_CLASS}>{digit}</span>
      </div>
    </div>
  );

  return (
    <div className="relative w-12 h-16 rounded-lg shadow-lg" style={{ perspective: "300px" }}>
      {/* Static halves */}
      {half(pending, "top")}
      {half(displayed, "bottom")}

      {/* Divider */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-px h-px bg-black/50 z-30 pointer-events-none" />

      {/* Animated top flap: shows displayed top, rotates away */}
      {isFlipping && (
        <div
          className="absolute top-0 inset-x-0 h-1/2 overflow-hidden rounded-t-lg bg-zinc-900 z-20"
          style={{ transformOrigin: "center bottom", animation: "flip-down 0.2s ease-in forwards" }}
        >
          <div className="absolute top-0 inset-x-0 h-[200%] flex items-center justify-center">
            <span className={DIGIT_CLASS}>{displayed}</span>
          </div>
        </div>
      )}

      {/* Animated bottom flap: shows pending bottom, unfolds into place */}
      {isFlipping && (
        <div
          className="absolute bottom-0 inset-x-0 h-1/2 overflow-hidden rounded-b-lg bg-zinc-900 z-20"
          style={{
            transformOrigin: "center top",
            transform: "rotateX(90deg)",
            animation: "flip-up 0.2s ease-out 0.2s forwards",
          }}
        >
          <div className="absolute bottom-0 inset-x-0 h-[200%] flex items-center justify-center">
            <span className={DIGIT_CLASS}>{pending}</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface FlipCounterProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  minDigits?: number;
}

export function FlipCounter({
  value,
  minDigits = 4,
  className = "",
  ...props
}: FlipCounterProps) {
  const str = String(Math.max(0, Math.floor(value))).padStart(minDigits, "0");

  return (
    <div className={`flex items-center gap-1.5 ${className}`} {...props}>
      {str.split("").map((digit, i) => (
        <FlipDigit key={i} value={digit} />
      ))}
    </div>
  );
}
