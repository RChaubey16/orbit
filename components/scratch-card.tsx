"use client";

import { useRef, useEffect, useState, useCallback, ReactNode, HTMLAttributes } from "react";

interface ScratchCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  brushSize?: number;
  threshold?: number;
  onComplete?: () => void;
}

export function ScratchCard({
  children,
  brushSize = 40,
  threshold = 60,
  onComplete,
  className = "",
  ...props
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0,   "#c8c8c8");
    g.addColorStop(0.4, "#ebebeb");
    g.addColorStop(0.6, "#c8c8c8");
    g.addColorStop(1,   "#a0a0a0");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(0,0,0,0.04)";
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 3) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const fontSize = Math.max(11, Math.min(14, width * 0.042));
    ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.fillText("✦  Scratch to reveal  ✦", width / 2, height / 2);
  }, []);

  const getXY = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const r = canvas.getBoundingClientRect();
    const src = "touches" in e ? e.touches[0] : e;
    return {
      x: (src.clientX - r.left) * (canvas.width / r.width),
      y: (src.clientY - r.top) * (canvas.height / r.height),
    };
  };

  const drawScratch = useCallback(
    (x: number, y: number) => {
      const ctx = canvasRef.current?.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    },
    [brushSize]
  );

  const checkDone = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || done) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) cleared++;
    }
    if ((cleared / (data.length / 16)) * 100 >= threshold) {
      setDone(true);
      onComplete?.();
    }
  }, [done, threshold, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const down = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      drawing.current = true;
      const { x, y } = getXY(e, canvas);
      drawScratch(x, y);
    };
    const move = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!drawing.current) return;
      const { x, y } = getXY(e, canvas);
      drawScratch(x, y);
    };
    const up = () => {
      drawing.current = false;
      checkDone();
    };

    canvas.addEventListener("mousedown", down);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    canvas.addEventListener("touchstart", down, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);

    return () => {
      canvas.removeEventListener("mousedown", down);
      canvas.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      canvas.removeEventListener("touchstart", down);
      canvas.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [drawScratch, checkDone]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`} {...props}>
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair touch-none"
        style={{
          opacity: done ? 0 : 1,
          transition: done ? "opacity 0.8s ease" : "none",
          pointerEvents: done ? "none" : "auto",
        }}
      />
    </div>
  );
}
