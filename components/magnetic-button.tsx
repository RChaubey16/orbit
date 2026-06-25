"use client";

import { ButtonHTMLAttributes, useRef } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  disabled,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * strength;
    const y = (e.clientY - (top + height / 2)) * strength;
    el.style.transition = "transform 0.1s ease-out";
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.transform = "translate(0px, 0px)";
  }

  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      className={`select-none rounded-[8px] border border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-medium tracking-wide text-white cursor-pointer hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
