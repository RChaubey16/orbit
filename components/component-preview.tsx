"use client";

import { KeyboardButton } from "@/components/button";
import { MagneticButton } from "@/components/magnetic-button";
import { ConfettiButton } from "@/components/confetti-button";

const previews: Record<string, React.ReactNode> = {
  "keyboard-button": <KeyboardButton>Click me</KeyboardButton>,
  "magnetic-button": <MagneticButton>Hover me</MagneticButton>,
  "confetti-button": <ConfettiButton>Click me</ConfettiButton>,
};

export function ComponentPreview({ name }: { name: string }) {
  return <>{previews[name] ?? null}</>;
}
