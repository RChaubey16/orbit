import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { MagneticButton } from "@/components/magnetic-button";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";
import { PrevNextNav } from "@/components/prev-next-nav";

export const metadata: Metadata = {
  title: "Magnetic Button",
  description: "A button with spring physics that attracts toward the cursor and snaps back with a satisfying bounce.",
  openGraph: {
    title: "Magnetic Button · Orbit",
    description: "A button with spring physics that attracts toward the cursor and snaps back with a satisfying bounce.",
    url: "/components/magnetic-button",
    images: [{ url: "/orbit-home.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnetic Button · Orbit",
    description: "A button with spring physics that attracts toward the cursor and snaps back with a satisfying bounce.",
    images: ["/orbit-home.png"],
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/magnetic-button`;

const USAGE_CODE = `import { MagneticButton } from "@/components/magnetic-button";

export default function Example() {
  return <MagneticButton>Hover near me</MagneticButton>;
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/magnetic-button.tsx"),
  "utf-8"
);

const codeHtmlPromise = codeToHtml(sourceCode, { lang: "tsx", theme: "github-dark" });
const usageHtmlPromise = codeToHtml(USAGE_CODE, { lang: "tsx", theme: "github-dark" });

export default async function MagneticButtonPage() {
  const [codeHtml, usageHtml] = await Promise.all([codeHtmlPromise, usageHtmlPromise]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-16 font-sans">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Magnetic Button
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          A button that pulls toward the cursor within a radius, then springs
          back with mass and damping — creating a satisfying snap that feels
          physical. Inner text floats independently for depth.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <MagneticButton>Hover near me</MagneticButton>
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
                <td className="px-4 py-3 text-zinc-500">Button label</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">strength</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">0.5</td>
                <td className="px-4 py-3 text-zinc-500">Magnetic pull intensity (0–1)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">radius</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">120</td>
                <td className="px-4 py-3 text-zinc-500">Detection radius in pixels</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">className</td>
                <td className="px-4 py-3 text-zinc-500">string</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">Overrides for color, size, rounding</td>
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

      <PrevNextNav currentName="magnetic-button" />
    </div>
  );
}
