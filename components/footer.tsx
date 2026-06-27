import Link from "next/link";
import { DynaPuff } from "next/font/google";
import { components } from "@/lib/registry";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-100 bg-white">
      <div className="px-4 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <Link href="/" className={`${dynaPuff.className} text-2xl text-zinc-900`}>
              ORBIT.
            </Link>
            <p className="mt-2 text-sm text-zinc-400 max-w-xs leading-relaxed">
              An open-source component library focused on interaction and physical feel.
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-1">
              Links
            </p>
            <Link
              href="/components"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Components
            </Link>
            <a
              href="https://github.com/RChaubey16/orbit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-zinc-400">
          <p>
            Built with care by{" "}
            <a
              href="https://github.com/RChaubey16"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Ruturaj
            </a>
            .
          </p>
          <p>{components.length} components and counting.</p>
        </div>
      </div>
    </footer>
  );
}
