"use client";

import { KeyboardButton } from "@/components/button";
import { ConfettiButton } from "@/components/confetti-button";
import { ScrambleText } from "@/components/scramble-text";

const previews: Record<string, React.ReactNode> = {
  "keyboard-button": <KeyboardButton>Click me</KeyboardButton>,
  "scramble-text": <ScrambleText trigger="both">Scramble Text</ScrambleText>,
  "confetti-button": <ConfettiButton>Click me</ConfettiButton>,
};

export function ComponentPreview({ name }: { name: string }) {
  return <>{previews[name] ?? null}</>;
}
