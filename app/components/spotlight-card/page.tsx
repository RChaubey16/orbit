import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { SpotlightCard } from "@/components/spotlight-card";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";
import { PrevNextNav } from "@/components/prev-next-nav";

export const metadata: Metadata = {
  title: "Spotlight Card",
  description: "A card with a radial light beam that tracks the cursor across its surface, giving a premium holographic feel.",
  openGraph: {
    title: "Spotlight Card · Orbit",
    description: "A card with a radial light beam that tracks the cursor across its surface, giving a premium holographic feel.",
  },
  twitter: {
    title: "Spotlight Card · Orbit",
    description: "A card with a radial light beam that tracks the cursor across its surface, giving a premium holographic feel.",
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/spotlight-card`;

const USAGE_CODE = `import { SpotlightCard } from "@/components/spotlight-card";

export default function Example() {
  return (
    <SpotlightCard className="rounded-2xl bg-zinc-900 p-8 w-72">
      <p className="text-sm font-semibold text-white">Spotlight Card</p>
      <p className="mt-1 text-sm text-zinc-400">Move your cursor over this card.</p>
    </SpotlightCard>
  );
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/spotlight-card.tsx"),
  "utf-8"
);

const codeHtmlPromise = codeToHtml(sourceCode, { lang: "tsx", theme: "github-dark" });
const usageHtmlPromise = codeToHtml(USAGE_CODE, { lang: "tsx", theme: "github-dark" });

export default async function SpotlightCardPage() {
  const [codeHtml, usageHtml] = await Promise.all([codeHtmlPromise, usageHtmlPromise]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-16 font-sans">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Spotlight Card
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          A card with a radial light beam that tracks the cursor across its
          surface. Works as a container — wrap any content inside.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <SpotlightCard
            className="rounded-2xl bg-zinc-900 border border-zinc-800 w-72"
            image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80"
          >
            <div className="p-6">
              <p className="font-semibold text-white">Spotlight Card</p>
              <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                Move your cursor over this card.
              </p>
            </div>
          </SpotlightCard>
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
                <td className="px-4 py-3 font-mono text-zinc-800">spotlightColor</td>
                <td className="px-4 py-3 text-zinc-500">string</td>
                <td className="px-4 py-3 font-mono text-zinc-400">rgba(255,255,255,0.12)</td>
                <td className="px-4 py-3 text-zinc-500">Color of the spotlight gradient</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">spotlightSize</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">350</td>
                <td className="px-4 py-3 text-zinc-500">Radius of the spotlight in pixels</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">image</td>
                <td className="px-4 py-3 text-zinc-500">string</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">Optional image URL rendered at the top of the card</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">className</td>
                <td className="px-4 py-3 text-zinc-500">string</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">CSS classes for rounding, background, padding</td>
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

      <PrevNextNav currentName="spotlight-card" />
    </div>
  );
}
