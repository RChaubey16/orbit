import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { AuroraBackground } from "@/components/aurora-background";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";
import { PrevNextNav } from "@/components/prev-next-nav";

export const metadata: Metadata = {
  title: "Aurora Background",
  description: "A softly animated background of drifting color blobs that blend into a dreamy aurora effect.",
  openGraph: {
    title: "Aurora Background · Orbit",
    description: "A softly animated background of drifting color blobs that blend into a dreamy aurora effect.",
  },
  twitter: {
    title: "Aurora Background · Orbit",
    description: "A softly animated background of drifting color blobs that blend into a dreamy aurora effect.",
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/aurora-background`;

const USAGE_CODE = `import { AuroraBackground } from "@/components/aurora-background";

export default function Example() {
  return (
    <AuroraBackground className="rounded-2xl min-h-64">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-64 text-center px-8">
        <h2 className="text-2xl font-semibold text-white">Hello, World.</h2>
        <p className="mt-2 text-sm text-zinc-400">Wrap any content in Aurora.</p>
      </div>
    </AuroraBackground>
  );
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/aurora-background.tsx"),
  "utf-8"
);

export default async function AuroraBackgroundPage() {
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
          Aurora Background
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          Softly animated blobs of color — violet, cyan, blue, fuchsia — that
          slowly drift and blur into each other. Wrap any content to give it a
          dreamy, premium backdrop.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <AuroraBackground className="rounded-xl w-full">
            <div className="relative z-10 flex flex-col items-center justify-center min-h-52 text-center px-8 py-12">
              <p className="text-2xl font-semibold text-white">Hello, World.</p>
              <p className="mt-2 text-sm text-zinc-400">Wrap any content in Aurora.</p>
            </div>
          </AuroraBackground>
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
                <td className="px-4 py-3 text-zinc-500">Content rendered on top of the aurora. Use relative z-10 for layering.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">className</td>
                <td className="px-4 py-3 text-zinc-500">string</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">Classes for rounding, sizing, and padding on the container.</td>
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

      <PrevNextNav currentName="aurora-background" />
    </div>
  );
}
