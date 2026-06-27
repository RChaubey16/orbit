"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

interface PreviewTabsProps {
  children: React.ReactNode;
  codeHtml?: string;
  rawCode?: string;
}

export function PreviewTabs({ children, codeHtml, rawCode }: PreviewTabsProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  if (!codeHtml) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-center min-h-52 p-6">
        {children}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 overflow-hidden">
      <div className="flex border-b border-zinc-200 bg-white px-2 pt-2 gap-0.5">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors capitalize ${
              tab === t
                ? "bg-zinc-50 text-zinc-900 border border-b-0 border-zinc-200 -mb-px"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "preview" ? (
        <div className="flex items-center justify-center min-h-52 p-6 bg-zinc-50">
          {children}
        </div>
      ) : (
        <div className="relative">
          {rawCode && (
            <div className="absolute top-3.5 right-4 z-10">
              <CopyButton text={rawCode} />
            </div>
          )}
          <div
            className="text-sm [&>pre]:p-5 [&>pre]:overflow-x-auto [&>pre]:leading-relaxed [&>pre]:rounded-none [&>pre]:!rounded-none"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
        </div>
      )}
    </div>
  );
}
