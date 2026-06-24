import { KeyboardButton } from "@/components/button";

export default function PlaygroundPage() {
  return (
    <div className="flex flex-1 items-center justify-center gap-3">
      <KeyboardButton>A</KeyboardButton>
      <KeyboardButton>Space</KeyboardButton>
      <KeyboardButton>Enter</KeyboardButton>
    </div>
  );
}
