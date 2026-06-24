"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

const TABS = ["Preview", "Code"] as const;
type Tab = (typeof TABS)[number];

interface PreviewTabsProps {
  children: React.ReactNode;
  codeHtml: string;
  rawCode: string;
}

export function PreviewTabs({ children, codeHtml, rawCode }: PreviewTabsProps) {
  const [active, setActive] = useState<Tab>("Preview");

  return (
    <div className="rounded-xl border border-zinc-200 overflow-hidden">
      <div className="flex border-b border-zinc-200 bg-white px-1 pt-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 text-xs font-medium transition-colors rounded-t-md ${
              active === tab
                ? "text-zinc-900 border-b-2 border-zinc-900 -mb-px bg-white"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === "Preview" && (
        <div className="flex items-center justify-center h-48 bg-zinc-50">
          {children}
        </div>
      )}

      {active === "Code" && (
        <div className="relative bg-zinc-900">
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
