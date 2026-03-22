"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Github, Menu, Orbit, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isComponents = pathname.startsWith("/components");

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <nav className="flex items-center py-4">
        <Link href="/" className="text-foreground flex items-center gap-2 font-semibold">
          <Orbit className="size-7" />
          <span className="text-xl">Orbit</span>
        </Link>

        {/* Desktop nav */}
        <div className="ml-auto hidden items-center gap-6 md:flex">
          <Link
            href="/components"
            className={`rounded-md px-4 py-2 transition-colors ${
              isComponents
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Components
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="https://github.com/ruturaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
              aria-label="GitHub"
            >
              <Github />
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-1 md:hidden">
          <Link
            href="https://github.com/ruturaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
            aria-label="GitHub"
          >
            <Github />
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="text-muted-foreground hover:bg-muted hover:text-foreground relative inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
          >
            <Menu
              className={`size-5 transition-all duration-200 ${mobileOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
            />
            <X
              className={`absolute size-5 transition-all duration-200 ${mobileOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu — absolutely positioned so it overlays page content */}
      <div
        className={`border-border bg-background/95 absolute inset-x-0 top-full border-b backdrop-blur transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="px-2 pt-1 pb-3">
          <Link
            href="/components"
            onClick={() => setMobileOpen(false)}
            className={`group flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
              isComponents
                ? "bg-muted text-foreground"
                : "text-foreground/80 hover:bg-muted hover:text-foreground"
            }`}
          >
            <span>Components</span>
            <ChevronRight className="text-muted-foreground size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
