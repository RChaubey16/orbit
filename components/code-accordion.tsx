"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

interface CodeAccordionProps {
  codeHtml: string;
  rawCode: string;
}

export function CodeAccordion({ codeHtml, rawCode }: CodeAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-[#0d1117] text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <span>{open ? "Hide" : "View"} component source</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="relative border-t border-zinc-800">
          <div className="absolute top-3.5 right-4 z-10">
            <CopyButton text={rawCode} />
          </div>
          <div
            className="text-sm [&>pre]:p-5 [&>pre]:overflow-x-auto [&>pre]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
        </div>
      )}
    </div>
  );
}
