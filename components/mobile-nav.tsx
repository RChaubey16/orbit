"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/registry";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden border-b border-zinc-100 bg-white overflow-x-auto">
      <div className="flex gap-1 px-4 py-2 min-w-max">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className={`shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors whitespace-nowrap ${
              pathname === component.href
                ? "bg-zinc-100 text-zinc-900 font-medium"
                : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
            }`}
          >
            {component.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
