"use client";

import { KeyboardButton } from "@/components/button";
import { ConfettiButton } from "@/components/confetti-button";
import { ScrambleText } from "@/components/scramble-text";
import { TiltCard } from "@/components/tilt-card";

const previews: Record<string, React.ReactNode> = {
  "keyboard-button": <KeyboardButton>Click me</KeyboardButton>,
  "scramble-text": <ScrambleText trigger="both">Scramble Text</ScrambleText>,
  "confetti-button": <ConfettiButton>Click me</ConfettiButton>,
  "tilt-card": (
    <TiltCard className="rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm w-36">
      <div className="h-2 w-16 rounded-full bg-zinc-200 mb-2" />
      <div className="h-2 w-24 rounded-full bg-zinc-100" />
    </TiltCard>
  ),
};

export function ComponentPreview({ name }: { name: string }) {
  return <>{previews[name] ?? null}</>;
}
