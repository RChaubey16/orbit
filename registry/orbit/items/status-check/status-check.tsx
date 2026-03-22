"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

type TransactionStatus = "idle" | "processing" | "completed" | "failed";

export interface StatusState {
  label: string;
  icon: ComponentType<{ className?: string }>;
  sublabel?: string | null;
  iconClass?: string;
  dotColor?: string;
  glowColor?: string | null;
  spin?: boolean;
}

export interface StatusCheckProps {
  idle: StatusState;
  processing: StatusState;
  completed: StatusState;
  failed: StatusState;
  simulateFailure?: boolean;
  processingDuration?: number;
  className?: string;
}

export function StatusCheck({
  idle,
  processing,
  completed,
  failed,
  simulateFailure = false,
  processingDuration = 2500,
  className,
}: StatusCheckProps) {
  const [status, setStatus] = useState<TransactionStatus>("idle");

  const stateMap = { idle, processing, completed, failed };
  const cfg = stateMap[status];
  const Icon = cfg.icon;

  function handleClick() {
    if (status === "processing") return;

    if (status === "completed" || status === "failed") {
      setStatus("idle");
      return;
    }

    setStatus("processing");
    setTimeout(() => {
      setStatus(simulateFailure ? "failed" : "completed");
    }, processingDuration);
  }

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <motion.button
        layout
        onClick={handleClick}
        disabled={status === "processing"}
        className={cn(
          "relative flex cursor-pointer items-center gap-3 overflow-hidden",
          "rounded-full border border-border bg-card px-5 py-3",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed",
        )}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        {/* Accent glow for completed / failed */}
        <AnimatePresence>
          {cfg.glowColor && (
            <motion.div
              key={`glow-${status}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 50% 100%, ${cfg.glowColor}22 0%, transparent 65%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Pulsing status dot */}
        <motion.div
          layout="position"
          className="relative flex h-2 w-2 flex-shrink-0 items-center justify-center"
        >
          <motion.span
            animate={{ backgroundColor: cfg.dotColor ?? "#9ca3af" }}
            transition={{ duration: 0.35 }}
            className="absolute h-2 w-2 rounded-full"
          />
          {status === "processing" && (
            <motion.span
              className="absolute h-2 w-2 rounded-full"
              animate={{ scale: [1, 2.8], opacity: [0.7, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
              style={{ backgroundColor: cfg.dotColor ?? "#9ca3af" }}
            />
          )}
        </motion.div>

        {/* Label + sublabel — slides per state */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={status}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex min-w-0 flex-col items-start"
          >
            <span className="whitespace-nowrap text-sm font-medium leading-tight text-card-foreground">
              {cfg.label}
            </span>
            {cfg.sublabel && (
              <motion.span
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden whitespace-nowrap text-xs leading-tight text-muted-foreground"
              >
                {cfg.sublabel}
              </motion.span>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Icon — swaps per state */}
        <motion.div layout="position" className="flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Icon
                className={cn("h-4 w-4", cfg.iconClass, (cfg.spin ?? false) && "animate-spin")}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.button>

      {/* Reset hint */}
      <AnimatePresence>
        {(status === "completed" || status === "failed") && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-muted-foreground"
          >
            Click to reset
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
