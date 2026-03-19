import Link from "next/link";
import { Github, Orbit } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <nav className="flex items-center py-4">
        <Link href="/" className="text-foreground flex items-center gap-2 font-semibold">
          <Orbit className="size-7" />
          <span className="text-xl">Orbit</span>
        </Link>

        <div className="ml-auto flex items-center gap-6">
          <Link
            href="/components"
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-4 py-2 transition-colors"
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
      </nav>
    </header>
  );
}
