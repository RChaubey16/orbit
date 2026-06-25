"use client";

import { useEffect, useRef, useState, HTMLAttributes } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

interface ScrambleTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  trigger?: "hover" | "mount" | "both";
  speed?: number;
  cycles?: number;
}

export function ScrambleText({
  children,
  trigger = "hover",
  speed = 40,
  cycles = 8,
  className = "",
  ...props
}: ScrambleTextProps) {
  const [output, setOutput] = useState(children);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function scramble() {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const text = children;
    const resolveAt = Array.from({ length: text.length }, (_, i) =>
      text[i] === " " ? -1 : cycles + i
    );
    let tick = 0;

    intervalRef.current = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (resolveAt[i] === -1) return " ";
            if (tick >= resolveAt[i]) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      tick++;

      if (resolveAt.every((t) => t === -1 || tick > t)) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setOutput(text);
      }
    }, speed);
  }

  useEffect(() => {
    if (trigger === "mount" || trigger === "both") scramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      className={`font-mono inline-block ${className}`}
      onMouseEnter={trigger === "hover" || trigger === "both" ? scramble : undefined}
      {...props}
    >
      {output}
    </span>
  );
}
