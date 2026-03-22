"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Globe } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
};

const MotionHooksExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgrounds = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  const [background, setBackground] = useState(backgrounds[0]);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 0.44 -- 0.44 * 3 = 1.32 --> 1
    // 0.8  -- 0.8 * 3 = 2.4 --> 2
    const finalValue = Math.floor(latest * backgrounds.length);
    setBackground(backgrounds[finalValue]);
  });

  return (
    <motion.div
      ref={containerRef}
      className="flex min-h-screen items-center justify-center bg-neutral-900"
      animate={{
        background,
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <div className="flex max-w-4xl flex-col gap-10 py-40">
        {features.map((feature, idx) => (
          <Card key={idx} feature={feature} />
        ))}
      </div>
    </motion.div>
  );
};

const Card = ({ feature }: { feature: Feature }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // element = start, viewport = end --- I want the scroll tracking to start
  });

  const translateContent = useSpring(useTransform(scrollYProgress, [0, 1], [200, -300]), {
    stiffness: 100,
    damping: 30,
    mass: 1,
  }); // 0% scroll = 200px, 100% scroll = -300px
  const opacityContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]); // 0% scroll = 0 opacity, 50% scroll = 1 opacity, 100% scroll = 0 opacity

  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);

  return (
    <div ref={ref} className="grid grid-cols-2 items-center gap-20 py-40">
      <motion.div
        style={{
          filter: useMotionTemplate`blur(${blur}px)`, // useMotionTemplate is used to create a template for the motion value, you simple cannot use string interpolation like this `blur(${blur}px)`
          scale: scale,
        }}
        className="flex flex-col gap-5"
      >
        {feature.icon}
        <h2 className="text-4xl font-bold text-white">{feature.title}</h2>
        <p className="text-neutral-400">{feature.description}</p>
      </motion.div>

      <motion.div
        style={{
          y: translateContent,
          opacity: opacityContent,
        }}
      >
        {feature.content}
      </motion.div>
    </div>
  );
};

const features = [
  {
    icon: <Globe className="h-8 w-8 text-neutral-200" />,
    title: "Global Reach",
    description: "Connect with users around the world.",
    content: (
      <div>
        <Image
          src="https://images.unsplash.com/photo-1773060897328-9091387ec521?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Globe"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <Globe className="h-8 w-8 text-neutral-200" />,
    title: "Global Reach",
    description: "Connect with users around the world.",
    content: (
      <div>
        <Image
          src="https://images.unsplash.com/photo-1773060897328-9091387ec521?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Globe"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <Globe className="h-8 w-8 text-neutral-200" />,
    title: "Global Reach",
    description: "Connect with users around the world.",
    content: (
      <div>
        <Image
          src="https://images.unsplash.com/photo-1773060897328-9091387ec521?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Globe"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <Globe className="h-8 w-8 text-neutral-200" />,
    title: "Global Reach",
    description: "Connect with users around the world.",
    content: (
      <div>
        <Image
          src="https://images.unsplash.com/photo-1773060897328-9091387ec521?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Globe"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <Globe className="h-8 w-8 text-neutral-200" />,
    title: "Global Reach",
    description: "Connect with users around the world.",
    content: (
      <div>
        <Image
          src="https://images.unsplash.com/photo-1773060897328-9091387ec521?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Globe"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
];

export default MotionHooksExample;
