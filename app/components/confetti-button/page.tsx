import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { ConfettiButton } from "@/components/confetti-button";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";
import { PrevNextNav } from "@/components/prev-next-nav";

export const metadata: Metadata = {
  title: "Confetti Button",
  description: "A button that bursts confetti from the click position, with physics-based particles that drift and fade.",
  openGraph: {
    title: "Confetti Button · Orbit",
    description: "A button that bursts confetti from the click position, with physics-based particles that drift and fade.",
    url: "/components/confetti-button",
    images: [{ url: "/orbit-home.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Confetti Button · Orbit",
    description: "A button that bursts confetti from the click position, with physics-based particles that drift and fade.",
    images: ["/orbit-home.png"],
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/confetti-button`;

const USAGE_CODE = `import { ConfettiButton } from "@/components/confetti-button";

export default function Example() {
  return <ConfettiButton>Click me</ConfettiButton>;
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/confetti-button.tsx"),
  "utf-8"
);

const codeHtmlPromise = codeToHtml(sourceCode, { lang: "tsx", theme: "github-dark" });
const usageHtmlPromise = codeToHtml(USAGE_CODE, { lang: "tsx", theme: "github-dark" });

export default async function ConfettiButtonPage() {
  const [codeHtml, usageHtml] = await Promise.all([codeHtmlPromise, usageHtmlPromise]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-16 font-sans">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Confetti Button
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          A button that bursts confetti from the click position, with
          physics-based particles that drift and fade.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <ConfettiButton>Click me</ConfettiButton>
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
                <td className="px-4 py-3 font-mono text-zinc-800">particleCount</td>
                <td className="px-4 py-3 text-zinc-500">number</td>
                <td className="px-4 py-3 font-mono text-zinc-400">80</td>
                <td className="px-4 py-3 text-zinc-500">Number of confetti particles per burst</td>
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

      <PrevNextNav currentName="confetti-button" />
    </div>
  );
}
