import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { KeyboardButton } from "@/components/button";
import { CopyButton } from "@/components/copy-button";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodeAccordion } from "@/components/code-accordion";

export const metadata: Metadata = {
  title: "Keyboard Button",
  description: "A button that looks and feels like a mechanical keyboard key, with visual depth and a satisfying click sound.",
  openGraph: {
    title: "Keyboard Button · Orbit",
    description: "A button that looks and feels like a mechanical keyboard key, with visual depth and a satisfying click sound.",
  },
  twitter: {
    title: "Keyboard Button · Orbit",
    description: "A button that looks and feels like a mechanical keyboard key, with visual depth and a satisfying click sound.",
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/keyboard-button`;

const USAGE_CODE = `import { KeyboardButton } from "@/components/keyboard-button";

export default function Example() {
  return <KeyboardButton>Click me</KeyboardButton>;
}`;

const sourceCode = readFileSync(join(process.cwd(), "components/button.tsx"), "utf-8");

const displayCode = sourceCode.replace(
  /const CLICK_SOUND = "data:audio\/mp3;base64,[A-Za-z0-9+/=]+"/,
  'const CLICK_SOUND = "data:audio/mp3;base64,..."'
);

export default async function KeyboardButtonPage() {
  const [codeHtml, usageHtml] = await Promise.all([
    codeToHtml(displayCode, { lang: "tsx", theme: "github-dark" }),
    codeToHtml(USAGE_CODE, { lang: "tsx", theme: "github-dark" }),
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-16 font-sans">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Keyboard Button
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          A button that looks and feels like a mechanical keyboard key, with
          visual depth and a satisfying click sound.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs>
          <KeyboardButton>Click me</KeyboardButton>
        </PreviewTabs>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Installation
        </h2>
        <PackageManagerTabs registryUrl={REGISTRY_URL} />
        <p className="mt-3 text-xs text-zinc-400">
          The click sound is bundled with the component — no extra files needed.
        </p>
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
                <td className="px-4 py-3 font-mono text-zinc-800">audioSrc</td>
                <td className="px-4 py-3 text-zinc-500">string</td>
                <td className="px-4 py-3 font-mono text-zinc-400">built-in</td>
                <td className="px-4 py-3 text-zinc-500">Custom click sound URL (base64 or file)</td>
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
