import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";
import { FlipCounterDemo } from "@/components/flip-counter-demo";
import { PrevNextNav } from "@/components/prev-next-nav";

export const metadata: Metadata = {
  title: "Flip Counter",
  description: "A counter where each digit flips with a satisfying mechanical animation, like an airport departure board.",
  openGraph: {
    title: "Flip Counter · Orbit",
    description: "A counter where each digit flips with a satisfying mechanical animation, like an airport departure board.",
  },
  twitter: {
    title: "Flip Counter · Orbit",
    description: "A counter where each digit flips with a satisfying mechanical animation, like an airport departure board.",
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/flip-counter`;

const USAGE_CODE = `import { useState } from "react";
import { FlipCounter } from "@/components/flip-counter";

export default function Example() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6">
      <FlipCounter value={count} minDigits={4} />
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/flip-counter.tsx"),
  "utf-8"
);

export default async function FlipCounterPage() {
  const [codeHtml, usageHtml] = await Promise.all([
    codeToHtml(sourceCode, { lang: "tsx", theme: "github-dark" }),
    codeToHtml(USAGE_CODE, { lang: "tsx", theme: "github-dark" }),
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-16 font-sans">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Flip Counter
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          A counter where each digit flips with a satisfying mechanical
          animation, like an airport departure board. Fully controlled — pass
          any number and it animates to it.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <FlipCounterDemo />
        </PreviewTabs>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Installation
        </h2>
        <PackageManagerTabs registryUrl={REGISTRY_URL} />
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Props
        </h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-3 text-left font-medium text-zinc-500">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">Type</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">Default</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">value</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">The number to display. Change it to trigger the flip.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">minDigits</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">4</td>
                <td className="px-4 py-3 text-zinc-500">Minimum digit columns, zero-padded on the left.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Component
        </h2>
        <CodeAccordion codeHtml={codeHtml} rawCode={sourceCode} />
      </section>

      <PrevNextNav currentName="flip-counter" />
    </div>
  );
}
