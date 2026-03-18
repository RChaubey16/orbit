import Link from 'next/link';
import { Github, Orbit } from 'lucide-react';

import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center px-6 sm:px-8">
        <Link href="/" className="text-foreground flex items-center gap-2 font-semibold">
          <Orbit className="size-5" />
          <span>Orbit</span>
        </Link>
        <nav className="ml-6 flex items-center gap-4 text-sm">
          <Link
            href="/components"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Components
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <a
            href="https://github.com/ruturaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
            aria-label="GitHub"
          >
            <Github />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
