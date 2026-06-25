import type { Metadata } from "next";
import Link from "next/link";
import { components } from "@/lib/registry";
import { ComponentPreview } from "@/components/component-preview";

export const metadata: Metadata = {
  title: "Components",
  description: "Browse all available Orbit components. Copy-paste or install via shadcn.",
};

export default function ComponentsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Components
        </h1>
        <p className="mt-3 text-zinc-500">
          {components.length} component{components.length !== 1 ? "s" : ""} available.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="rounded-xl border border-zinc-200 p-5 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center justify-center h-24 mb-4 bg-zinc-50 rounded-lg">
              <ComponentPreview name={component.name} />
            </div>
            <p className="font-medium text-zinc-900">{component.title}</p>
            <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
