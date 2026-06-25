"use client";

import { KeyboardButton } from "@/components/button";
import { ConfettiButton } from "@/components/confetti-button";

const previews: Record<string, React.ReactNode> = {
  "keyboard-button": <KeyboardButton>Click me</KeyboardButton>,
  "confetti-button": <ConfettiButton>Click me</ConfettiButton>,
};

export function ComponentPreview({ name }: { name: string }) {
  return <>{previews[name] ?? null}</>;
}
