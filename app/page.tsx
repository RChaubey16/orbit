import type { Metadata } from "next";
import Link from "next/link";
import { components } from "@/lib/registry";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Orbit — Components built to feel different",
  description: "An open-source component library focused on interaction and physical feel. Copy-paste or install via shadcn.",
  openGraph: {
    title: "Orbit — Components built to feel different",
    description: "An open-source component library focused on interaction and physical feel.",
  },
  twitter: {
    title: "Orbit — Components built to feel different",
    description: "An open-source component library focused on interaction and physical feel.",
  },
};

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 text-center max-w-4xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
          Components built to feel different.
        </h1>
        <p className="mt-5 text-lg text-zinc-500 max-w-xl leading-relaxed">
          An open-source component library focused on interaction and physical feel. Copy-paste or install via shadcn.
        </p>
        <Link
          href="/components/keyboard-button"
          className="mt-8 inline-flex items-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
        >
          Browse components
        </Link>
      </div>

      <div className="px-4 pb-16 sm:px-12 md:px-20">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-6">
          All components
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {components.map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="group rounded-xl border border-zinc-200 px-4 py-3 hover:border-zinc-300 transition-colors"
            >
              <p className="text-sm font-medium text-zinc-900">{component.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
