import Link from "next/link";
import { Orbit } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t py-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Orbit className="text-muted-foreground size-4" />
          <span className="text-foreground text-sm font-medium">Orbit</span>
          <span className="text-muted-foreground text-sm">— Tasteful, minimal UI components.</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/components"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Components
          </Link>
          <Link
            href="https://github.com/ruturaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            GitHub
          </Link>
          <span className="text-muted-foreground text-sm">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
