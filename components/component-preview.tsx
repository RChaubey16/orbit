"use client";

import { KeyboardButton } from "@/components/button";
import { ConfettiButton } from "@/components/confetti-button";
import { ScrambleText } from "@/components/scramble-text";
import { TiltCard } from "@/components/tilt-card";
import { SpotlightCard } from "@/components/spotlight-card";
import { FlipCounterDemo } from "@/components/flip-counter-demo";
import { AuroraBackground } from "@/components/aurora-background";

const previews: Record<string, React.ReactNode> = {
  "keyboard-button": <KeyboardButton>Click me</KeyboardButton>,
  "scramble-text": <ScrambleText trigger="both">Scramble Text</ScrambleText>,
  "confetti-button": <ConfettiButton>Click me</ConfettiButton>,
  "tilt-card": (
    <TiltCard
      className="w-full bg-white"
      image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=80"
    >
      <div className="px-5 py-4">
        <p className="text-sm font-semibold text-zinc-900">Mountain Vista</p>
        <p className="mt-1 text-xs text-zinc-500 leading-relaxed">Hover to feel the depth.</p>
      </div>
    </TiltCard>
  ),
  "flip-counter": <FlipCounterDemo />,
  "spotlight-card": (
    <SpotlightCard
      className="w-full bg-zinc-900"
      image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80"
    >
      <div className="px-5 py-4">
        <p className="text-sm font-semibold text-white">Night Sky</p>
        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">Move your cursor across.</p>
      </div>
    </SpotlightCard>
  ),
  "aurora-background": (
    <AuroraBackground className="w-full rounded-lg">
      <div className="relative z-10 flex items-center justify-center min-h-[6rem]">
        <p className="text-xs font-semibold text-white tracking-wide">Aurora</p>
      </div>
    </AuroraBackground>
  ),
};

export function ComponentPreview({ name }: { name: string }) {
  return <>{previews[name] ?? null}</>;
}
