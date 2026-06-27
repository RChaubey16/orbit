import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { GlitchText } from "@/components/glitch-text";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";
import { PrevNextNav } from "@/components/prev-next-nav";

export const metadata: Metadata = {
  title: "Glitch Text",
  description: "Text with layered chromatic aberration and scan-line displacement, creating a digital corruption effect.",
  openGraph: {
    title: "Glitch Text · Orbit",
    description: "Text with layered chromatic aberration and scan-line displacement, creating a digital corruption effect.",
    url: "/components/glitch-text",
    images: [{ url: "/orbit-home.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glitch Text · Orbit",
    description: "Text with layered chromatic aberration and scan-line displacement, creating a digital corruption effect.",
    images: ["/orbit-home.png"],
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/glitch-text`;

const USAGE_CODE = `import { GlitchText } from "@/components/glitch-text";

export default function Example() {
  return <GlitchText>Hover over me</GlitchText>;
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/glitch-text.tsx"),
  "utf-8"
);

const codeHtmlPromise = codeToHtml(sourceCode, { lang: "tsx", theme: "github-dark" });
const usageHtmlPromise = codeToHtml(USAGE_CODE, { lang: "tsx", theme: "github-dark" });

export default async function GlitchTextPage() {
  const [codeHtml, usageHtml] = await Promise.all([codeHtmlPromise, usageHtmlPromise]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-16 font-sans">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Glitch Text
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          Text with layered chromatic aberration and scan-line displacement,
          creating a digital corruption effect. Triggers on hover or loops
          continuously.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <GlitchText className="text-2xl font-bold text-zinc-900">
            Hover over me
          </GlitchText>
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
                <td className="px-4 py-3 text-zinc-500">string</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">The text to glitch</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">trigger</td>
                <td className="px-4 py-3 text-zinc-500">&quot;hover&quot; | &quot;always&quot;</td>
                <td className="px-4 py-3 font-mono text-zinc-400">&quot;hover&quot;</td>
                <td className="px-4 py-3 text-zinc-500">When to play the glitch animation</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">speed</td>
                <td className="px-4 py-3 text-zinc-500">&quot;slow&quot; | &quot;normal&quot; | &quot;fast&quot;</td>
                <td className="px-4 py-3 font-mono text-zinc-400">&quot;normal&quot;</td>
                <td className="px-4 py-3 text-zinc-500">How quickly the glitch cycles</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-800">className</td>
                <td className="px-4 py-3 text-zinc-500">string</td>
                <td className="px-4 py-3 font-mono text-zinc-400">—</td>
                <td className="px-4 py-3 text-zinc-500">Custom classes for font, size, color</td>
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

      <PrevNextNav currentName="glitch-text" />
    </div>
  );
}
