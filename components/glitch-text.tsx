"use client";

import { HTMLAttributes, useId } from "react";

interface GlitchTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  trigger?: "hover" | "always";
  speed?: "slow" | "normal" | "fast";
}

const DURATIONS: Record<string, string> = {
  slow: "3s",
  normal: "1.5s",
  fast: "0.5s",
};

export function GlitchText({
  children,
  trigger = "hover",
  speed = "normal",
  className = "",
  ...props
}: GlitchTextProps) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  const dur = DURATIONS[speed];
  const always = trigger === "always";

  const css = `
@keyframes glitch-r-${uid} {
  0%,100% { clip-path: inset(82% 0  4% 0); transform: translate(-4px, 0); }
  10%      { clip-path: inset(12% 0 76% 0); transform: translate( 4px, 0); }
  20%      { clip-path: inset(53% 0 42% 0); transform: translate(-3px, 0); }
  30%      { clip-path: inset( 5% 0 91% 0); transform: translate( 3px, 0); }
  40%      { clip-path: inset(68% 0 24% 0); transform: translate(-4px, 0); }
  50%      { clip-path: inset(32% 0 58% 0); transform: translate( 2px, 0); }
  60%      { clip-path: inset(89% 0  3% 0); transform: translate(-2px, 0); }
  70%      { clip-path: inset(17% 0 79% 0); transform: translate( 4px, 0); }
  80%      { clip-path: inset(43% 0 52% 0); transform: translate(-3px, 0); }
  90%      { clip-path: inset(74% 0 19% 0); transform: translate( 3px, 0); }
}
@keyframes glitch-c-${uid} {
  0%,100% { clip-path: inset(33% 0 62% 0); transform: translate( 4px, 0); }
  10%      { clip-path: inset(78% 0 14% 0); transform: translate(-4px, 0); }
  20%      { clip-path: inset( 6% 0 87% 0); transform: translate( 3px, 0); }
  30%      { clip-path: inset(58% 0 36% 0); transform: translate(-3px, 0); }
  40%      { clip-path: inset(22% 0 70% 0); transform: translate( 4px, 0); }
  50%      { clip-path: inset(91% 0  2% 0); transform: translate(-2px, 0); }
  60%      { clip-path: inset(45% 0 48% 0); transform: translate( 2px, 0); }
  70%      { clip-path: inset( 9% 0 84% 0); transform: translate(-4px, 0); }
  80%      { clip-path: inset(64% 0 30% 0); transform: translate( 3px, 0); }
  90%      { clip-path: inset(19% 0 77% 0); transform: translate(-3px, 0); }
}
.gt-r-${uid},.gt-c-${uid} { clip-path: inset(0 0 100% 0); }
${
  always
    ? `.gt-r-${uid} { animation: glitch-r-${uid} ${dur} steps(1) infinite; }
.gt-c-${uid} { animation: glitch-c-${uid} ${dur} steps(1) infinite; }`
    : `.gt-wrap-${uid}:hover .gt-r-${uid} { animation: glitch-r-${uid} ${dur} steps(1) infinite; }
.gt-wrap-${uid}:hover .gt-c-${uid} { animation: glitch-c-${uid} ${dur} steps(1) infinite; }`
}`;

  return (
    <span className={`gt-wrap-${uid} relative inline-block ${className}`} {...props}>
      <style>{css}</style>
      {children}
      <span
        aria-hidden="true"
        className={`gt-r-${uid} pointer-events-none absolute inset-0 text-red-500`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`gt-c-${uid} pointer-events-none absolute inset-0 text-cyan-400`}
      >
        {children}
      </span>
    </span>
  );
}
