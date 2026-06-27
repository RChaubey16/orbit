import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { ScratchCard } from "@/components/scratch-card";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";
import { PrevNextNav } from "@/components/prev-next-nav";

export const metadata: Metadata = {
  title: "Scratch Card",
  description: "A canvas-based scratch card that reveals hidden content as you draw over it, with auto-reveal once a threshold is reached.",
  openGraph: {
    title: "Scratch Card · Orbit",
    description: "A canvas-based scratch card that reveals hidden content as you draw over it, with auto-reveal once a threshold is reached.",
  },
  twitter: {
    title: "Scratch Card · Orbit",
    description: "A canvas-based scratch card that reveals hidden content as you draw over it, with auto-reveal once a threshold is reached.",
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/scratch-card`;

const USAGE_CODE = `import { ScratchCard } from "@/components/scratch-card";

export default function Example() {
  return (
    <ScratchCard className="w-72 h-44 rounded-2xl" threshold={60}>
      <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex flex-col items-center justify-center rounded-2xl">
        <span className="text-5xl">🎉</span>
        <p className="mt-2 text-lg font-bold text-white">You won!</p>
        <p className="text-sm text-yellow-100 font-medium">$100 Gift Card</p>
      </div>
    </ScratchCard>
  );
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/scratch-card.tsx"),
  "utf-8"
);

const codeHtmlPromise = codeToHtml(sourceCode, { lang: "tsx", theme: "github-dark" });
const usageHtmlPromise = codeToHtml(USAGE_CODE, { lang: "tsx", theme: "github-dark" });

export default async function ScratchCardPage() {
  const [codeHtml, usageHtml] = await Promise.all([codeHtmlPromise, usageHtmlPromise]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-16 font-sans">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Scratch Card
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          A canvas-based scratch card that reveals hidden content as you draw
          over the silver surface. Once enough is scratched away, the cover
          fades out automatically.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <ScratchCard className="w-72 h-44 rounded-2xl shadow-md" threshold={60}>
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex flex-col items-center justify-center rounded-2xl select-none">
              <span className="text-5xl">🎉</span>
              <p className="mt-2 text-lg font-bold text-white">You won!</p>
              <p className="text-sm text-yellow-100 font-medium">$100 Gift Card</p>
            </div>
          </ScratchCard>
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
                <td className="px-4 py-3 font-mono text-zinc-800">children</td>
                <td className="px-4 py-3 text-zinc-500">ReactNode</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">Content revealed by scratching</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">brushSize</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">40</td>
                <td className="px-4 py-3 text-zinc-500">Radius of the scratch brush in pixels</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">threshold</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">60</td>
                <td className="px-4 py-3 text-zinc-500">% of surface cleared to trigger auto-reveal</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">onComplete</td>
                <td className="px-4 py-3 text-zinc-500">() =&gt; void</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">Called when the threshold is reached</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">className</td>
                <td className="px-4 py-3 text-zinc-500">string</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">Size, rounding, and shadow of the card</td>
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

      <PrevNextNav currentName="scratch-card" />
    </div>
  );
}
