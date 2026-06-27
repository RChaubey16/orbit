import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { TiltCard } from "@/components/tilt-card";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";
import { PrevNextNav } from "@/components/prev-next-nav";

export const metadata: Metadata = {
  title: "Tilt Card",
  description: "A card that tilts in 3D perspective toward the cursor, with a subtle glare that follows the mouse.",
  openGraph: {
    title: "Tilt Card · Orbit",
    description: "A card that tilts in 3D perspective toward the cursor, with a subtle glare that follows the mouse.",
  },
  twitter: {
    title: "Tilt Card · Orbit",
    description: "A card that tilts in 3D perspective toward the cursor, with a subtle glare that follows the mouse.",
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/tilt-card`;

const USAGE_CODE = `import { TiltCard } from "@/components/tilt-card";

export default function Example() {
  return (
    <TiltCard className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md w-64">
      <p className="text-sm font-semibold text-zinc-900">Tilt Card</p>
      <p className="mt-1 text-sm text-zinc-500">Hover to see the 3D effect.</p>
    </TiltCard>
  );
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/tilt-card.tsx"),
  "utf-8"
);

export default async function TiltCardPage() {
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
          Tilt Card
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          A card that tilts in 3D perspective toward the cursor, with a subtle
          glare that follows the mouse. Wrap any content — works as a container.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <TiltCard
            className="rounded-2xl border border-zinc-200 bg-white shadow-md w-64"
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=80"
          >
            <div className="p-6">
              <p className="font-semibold text-zinc-900">Tilt Card</p>
              <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                Hover to see the 3D tilt and glare effect.
              </p>
            </div>
          </TiltCard>
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
                <td className="px-4 py-3 font-mono text-zinc-800">maxTilt</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">15</td>
                <td className="px-4 py-3 text-zinc-500">Maximum tilt angle in degrees</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">glare</td>
                <td className="px-4 py-3 text-zinc-500">boolean</td>
                <td className="px-4 py-3 font-mono text-zinc-400">false</td>
                <td className="px-4 py-3 text-zinc-500">Show a glare overlay that follows the cursor</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">scale</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">1.03</td>
                <td className="px-4 py-3 text-zinc-500">Scale factor applied on hover</td>
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
                <td className="px-4 py-3 text-zinc-500">CSS classes for rounding, border, background, padding</td>
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

      <PrevNextNav currentName="tilt-card" />
    </div>
  );
}
