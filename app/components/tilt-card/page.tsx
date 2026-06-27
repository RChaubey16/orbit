import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { TiltCard } from "@/components/tilt-card";
import { CopyButton } from "@/components/copy-button";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";

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
        <PreviewTabs>
          <TiltCard className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-md w-64">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
              <svg
                className="h-5 w-5 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
            <p className="font-semibold text-zinc-900">Tilt Card</p>
            <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
              Hover to see the 3D tilt and glare effect.
            </p>
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
          Usage
        </h2>
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute top-3.5 right-4 z-10">
            <CopyButton text={USAGE_CODE} />
          </div>
          <div
            className="text-sm [&>pre]:p-5 [&>pre]:overflow-x-auto [&>pre]:rounded-xl [&>pre]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: usageHtml }}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Props
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
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
                <td className="px-4 py-3 font-mono text-zinc-400">true</td>
                <td className="px-4 py-3 text-zinc-500">Show a glare overlay that follows the cursor</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">scale</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">1.03</td>
                <td className="px-4 py-3 text-zinc-500">Scale factor applied on hover</td>
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

      <section>
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Component
        </h2>
        <CodeAccordion codeHtml={codeHtml} rawCode={sourceCode} />
      </section>
    </div>
  );
}
