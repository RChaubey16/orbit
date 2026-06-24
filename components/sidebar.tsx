"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/registry";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 border-r border-zinc-100 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto py-8 px-3">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2 px-2">
        Components
      </p>
      <nav className="flex flex-col gap-0.5">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
              pathname === component.href
                ? "bg-zinc-100 text-zinc-900 font-medium"
                : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
            }`}
          >
            {component.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
