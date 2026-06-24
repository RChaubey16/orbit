"use client";

import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", disabled, ...props }: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/keyboard-click.mp3");
  }, []);

  const isPressed = pressed && !disabled;

  function playClick() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  return (
    <button
      {...props}
      disabled={disabled}
      onMouseDown={() => { setPressed(true); playClick(); }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => { setPressed(true); playClick(); }}
      onTouchEnd={() => setPressed(false)}
      className={`relative select-none rounded-[6px] border border-black/[0.12] bg-[#f0efea] px-5 py-2.5 text-sm font-medium tracking-wide text-zinc-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{
        backgroundImage: isPressed
          ? "linear-gradient(to bottom, #e8e7e2, #e4e3de)"
          : "linear-gradient(to bottom, #f5f4ef, #ebebE6)",
        boxShadow: isPressed
          ? "inset 0 1px 0 rgba(255,255,255,0.4), 0 0 0 #b8b5b0"
          : "inset 0 1px 0 rgba(255,255,255,0.8), 0 3px 0 #b8b5b0, 0 4px 5px rgba(0,0,0,0.08)",
        transform: isPressed ? "translateY(3px)" : "translateY(0)",
        transition: isPressed
          ? "none"
          : "transform 80ms ease-out, box-shadow 80ms ease-out",
      }}
    >
      {children}
    </button>
  );
}
