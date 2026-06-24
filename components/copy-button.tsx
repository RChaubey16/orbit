"use client";

import { useState } from "react";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={copy}
      className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
        copied
          ? "bg-zinc-600 text-zinc-300"
          : "bg-zinc-700 text-zinc-400 hover:text-zinc-200"
      } ${className}`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
