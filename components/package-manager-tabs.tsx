"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

const PMS = ["npm", "pnpm", "yarn", "bun"] as const;
type PM = (typeof PMS)[number];

function getCommand(pm: PM, registryUrl: string) {
  switch (pm) {
    case "npm":  return `npx shadcn@latest add ${registryUrl}`;
    case "pnpm": return `pnpm dlx shadcn@latest add ${registryUrl}`;
    case "yarn": return `yarn dlx shadcn@latest add ${registryUrl}`;
    case "bun":  return `bunx --bun shadcn@latest add ${registryUrl}`;
  }
}

export function PackageManagerTabs({ registryUrl }: { registryUrl: string }) {
  const [active, setActive] = useState<PM>("npm");
  const command = getCommand(active, registryUrl);

  return (
    <div className="rounded-xl bg-zinc-900 overflow-hidden">
      <div className="flex border-b border-zinc-800">
        {PMS.map((pm) => (
          <button
            key={pm}
            onClick={() => setActive(pm)}
            className={`px-4 py-2.5 text-xs font-medium transition-colors ${
              active === pm
                ? "text-zinc-100 border-b border-zinc-100 -mb-px"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {pm}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <code className="text-sm font-mono text-zinc-200 truncate">{command}</code>
        <CopyButton text={command} />
      </div>
    </div>
  );
}
