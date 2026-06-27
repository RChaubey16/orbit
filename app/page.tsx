import type { Metadata } from "next";
import Link from "next/link";
import { components } from "@/lib/registry";
import { PageTransition } from "@/components/page-transition";
import { ComponentPreview } from "@/components/component-preview";

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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {components.map((component) => (
            <div
              key={component.name}
              className="group relative flex items-center justify-center h-32 rounded-xl border border-zinc-200 bg-zinc-50 hover:border-zinc-300 transition-colors"
            >
              <ComponentPreview name={component.name} />
              <Link
                href={component.href}
                className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-zinc-900 hover:border-zinc-300"
              >
                View
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
