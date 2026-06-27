"use client";

import { useRef, useEffect, useCallback } from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
}

const STIFFNESS = 0.13;
const DAMPING = 0.76;

export function MagneticButton({
  children,
  className = "",
  strength = 0.5,
  radius = 120,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const active = useRef(false);

  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const dest = useRef({ x: 0, y: 0 });

  const tick = useCallback(() => {
    const dx = dest.current.x - pos.current.x;
    const dy = dest.current.y - pos.current.y;

    // Spring: accelerate toward destination, bleed off velocity with damping
    vel.current.x = vel.current.x * DAMPING + dx * STIFFNESS;
    vel.current.y = vel.current.y * DAMPING + dy * STIFFNESS;

    pos.current.x += vel.current.x;
    pos.current.y += vel.current.y;

    const { x, y } = pos.current;
    const mag = Math.hypot(x, y);

    if (buttonRef.current) {
      // Subtle 3D tilt toward displacement direction + scale up with pull strength
      const rx = -y * 0.07;
      const ry = x * 0.07;
      const scale = 1 + mag * 0.0025;
      buttonRef.current.style.transform =
        `translate(${x}px, ${y}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    }

    // Inner text drifts slightly further — gives a floating depth illusion
    if (innerRef.current) {
      innerRef.current.style.transform =
        `translate(${x * 0.25}px, ${y * 0.25}px)`;
    }

    const settled =
      Math.abs(vel.current.x) < 0.005 &&
      Math.abs(vel.current.y) < 0.005 &&
      Math.abs(dx) < 0.005 &&
      Math.abs(dy) < 0.005;

    if (settled) {
      active.current = false;
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const run = useCallback(() => {
    if (!active.current) {
      active.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        // Non-linear pull: stronger near center, eases off at the detection edge
        const pull = (1 - dist / radius) ** 1.5;
        dest.current = { x: dx * strength * pull, y: dy * strength * pull };
      } else {
        dest.current = { x: 0, y: 0 };
      }

      run();
    };

    const onLeave = () => {
      dest.current = { x: 0, y: 0 };
      run();
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [radius, strength, run]);

  return (
    <button
      ref={buttonRef}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative select-none rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-medium text-white will-change-transform ${className}`}
      {...props}
    >
      <span
        ref={innerRef}
        className="relative block will-change-transform pointer-events-none"
      >
        {children}
      </span>
    </button>
  );
}
