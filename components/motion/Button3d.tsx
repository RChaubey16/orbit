"use client";

import { motion } from "motion/react";

const Button3d = () => {
  return (
    <div
      className="mx-auto flex min-h-screen max-w-5xl items-center justify-center [perspective::1000px] transform-3d"
      style={{
        backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2), 0.5px, transparent 0)`,
        backgroundSize: `8px 8px`,
        backgroundRepeat: `repeat`,
      }}
    >
      <motion.button
        whileHover={{
          rotateX: 25,
          rotateY: 10,
          y: -5,
        }}
        whileTap={{
          y: 0,
        }}
        style={{
          translateZ: 100,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        type="button"
        className="group border-neutral bg-muted/80 relative w-50 cursor-pointer rounded border px-2 py-4"
      >
        Hello World
        <span className="absolute inset-x-0 bottom-px mx-auto h-px w-3/4 bg-linear-to-r from-transparent via-cyan-500 to-transparent"></span>
        <span className="absolute inset-x-0 bottom-px mx-auto h-1 w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></span>
      </motion.button>
    </div>
  );
};

export default Button3d;
