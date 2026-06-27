"use client";

import { useRef, useCallback } from "react";

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  peakY: number;
  trail: Array<{ x: number; y: number }>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  alpha: number;
  size: number;
  decay: number;
  glitter: boolean;
}

interface FireworksButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  count?: number;
}

const GRAVITY = 0.12;
const DRAG = 0.985;
const TRAIL_LEN = 14;

function makeRocket(w: number, h: number): Rocket {
  return {
    x: w * 0.15 + Math.random() * w * 0.7,
    y: h,
    vx: (Math.random() - 0.5) * 2.5,
    vy: -(h * 0.017 + Math.random() * h * 0.007),
    hue: Math.random() * 360,
    peakY: h * 0.12 + Math.random() * h * 0.42,
    trail: [],
  };
}

function burst(rocket: Rocket, out: Particle[]) {
  // Flash bloom at explosion point
  out.push({
    x: rocket.x, y: rocket.y,
    vx: 0, vy: 0,
    hue: rocket.hue, alpha: 0.5, size: 55, decay: 0.09, glitter: false,
  });

  const n = 65 + Math.floor(Math.random() * 35);
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.4;
    const speed = 1.8 + Math.random() * 5.5;
    const glitter = Math.random() < 0.3;
    out.push({
      x: rocket.x, y: rocket.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      hue: rocket.hue + (Math.random() - 0.5) * 40,
      alpha: 1,
      size: glitter ? 2.5 : 1.2 + Math.random() * 1.8,
      decay: glitter
        ? 0.006 + Math.random() * 0.005
        : 0.011 + Math.random() * 0.009,
      glitter,
    });
  }
}

export function FireworksButton({
  children,
  className = "",
  count = 5,
  ...props
}: FireworksButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const rockets = useRef<Rocket[]>([]);
  const particles = useRef<Particle[]>([]);
  const running = useRef(false);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // — Rockets —
    const liveRockets: Rocket[] = [];
    for (const r of rockets.current) {
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > TRAIL_LEN) r.trail.shift();

      r.vy += GRAVITY * 0.45; // thrust partially counters gravity
      r.x += r.vx;
      r.y += r.vy;

      // Trail line — segments drawn tail→head with increasing width and alpha
      if (r.trail.length > 1) {
        const pts = [...r.trail, { x: r.x, y: r.y }];
        for (let i = 1; i < pts.length; i++) {
          const t = i / pts.length;
          ctx.save();
          ctx.globalAlpha = t * 0.75;
          ctx.strokeStyle = `hsl(${r.hue},100%,75%)`;
          ctx.lineWidth = t * 3;
          ctx.lineCap = "round";
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsl(${r.hue},100%,70%)`;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x, pts[i].y);
          ctx.stroke();
          ctx.restore();
        }

        // Bright white core on the newest half of the trail
        const half = Math.floor(pts.length / 2);
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(pts[half].x, pts[half].y);
        for (let i = half + 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Rocket head glow
      ctx.save();
      ctx.shadowBlur = 14;
      ctx.shadowColor = `hsl(${r.hue},100%,85%)`;
      ctx.fillStyle = "#fff";
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (r.y <= r.peakY) {
        burst(r, particles.current);
      } else {
        liveRockets.push(r);
      }
    }
    rockets.current = liveRockets;

    // — Particles —
    const liveParticles: Particle[] = [];
    for (const p of particles.current) {
      p.vy += GRAVITY;
      p.vx *= DRAG;
      p.vy *= DRAG;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      if (p.alpha <= 0) continue;

      // Glitter: fast twinkle via sine on time
      const a = p.glitter
        ? p.alpha * (0.4 + 0.6 * Math.abs(Math.sin(Date.now() * 0.015 + p.x)))
        : p.alpha;

      // Outer glow
      ctx.save();
      ctx.globalAlpha = a * 0.25;
      ctx.fillStyle = `hsl(${p.hue},100%,65%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      ctx.globalAlpha = a;
      ctx.fillStyle = `hsl(${p.hue},100%,82%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      liveParticles.push(p);
    }
    particles.current = liveParticles;

    if (rockets.current.length > 0 || particles.current.length > 0) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      canvasRef.current?.remove();
      canvasRef.current = null;
      running.current = false;
    }
  }, []);

  const fire = useCallback(() => {
    if (!canvasRef.current) {
      const c = document.createElement("canvas");
      c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9999;";
      document.body.appendChild(c);
      canvasRef.current = c;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvasRef.current.width = w;
    canvasRef.current.height = h;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        rockets.current.push(makeRocket(w, h));
        if (!running.current) {
          running.current = true;
          rafRef.current = requestAnimationFrame(animate);
        }
      }, i * 220 + Math.random() * 130);
    }
  }, [count, animate]);

  return (
    <button
      onClick={fire}
      className={`relative select-none rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
