"use client";

import { useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

type PM = "pnpm" | "npm" | "yarn" | "bun";

const TABS: PM[] = ["pnpm", "npm", "yarn", "bun"];

interface InstallTabsProps {
  commands: Record<PM, string>;
  highlighted: Record<PM, string>;
}

export function InstallTabs({ commands, highlighted }: InstallTabsProps) {
  const [active, setActive] = useState<PM>("pnpm");

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="border-b px-2">
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "-mb-px border-b-2 px-3 py-2.5 font-mono text-xs transition-colors",
                active === tab
                  ? "border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <CopyButton value={commands[active]} className="absolute top-3 right-3 z-10" />
        <div
          className="[&_pre]:overflow-x-auto [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlighted[active] }}
        />
      </div>
    </div>
  );
}
