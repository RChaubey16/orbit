import type { Metadata } from "next";
import Link from "next/link";
import { components } from "@/lib/registry";
import { previews } from "@/lib/previews";

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
    <div className="px-20 py-20">
      <div className="mb-20">
        <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
          Components built to<br />feel different.
        </h1>
        <p className="mt-5 text-lg text-zinc-500 max-w-md leading-relaxed">
          An open-source component library focused on interaction and physical feel. Copy-paste or install via shadcn.
        </p>
        <Link
          href="/components/keyboard-button"
          className="mt-8 inline-flex items-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
        >
          Browse components
        </Link>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-6">
          All components
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {components.map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="group rounded-xl border border-zinc-200 overflow-hidden hover:border-zinc-300 transition-colors"
            >
              <div className="flex items-center justify-center h-40 bg-zinc-50 pointer-events-none">
                {previews[component.name]}
              </div>
              <div className="px-4 py-3 border-t border-zinc-100">
                <p className="text-sm font-medium text-zinc-900">{component.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
