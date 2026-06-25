import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { ScrambleText } from "@/components/scramble-text";
import { CopyButton } from "@/components/copy-button";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";

export const metadata: Metadata = {
  title: "Scramble Text",
  description: "Text that cycles through random characters before resolving, creating a satisfying decoding effect.",
  openGraph: {
    title: "Scramble Text · Orbit",
    description: "Text that cycles through random characters before resolving, creating a satisfying decoding effect.",
  },
  twitter: {
    title: "Scramble Text · Orbit",
    description: "Text that cycles through random characters before resolving, creating a satisfying decoding effect.",
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/scramble-text`;

const USAGE_CODE = `import { ScrambleText } from "@/components/scramble-text";

export default function Example() {
  return <ScrambleText>Hover over me</ScrambleText>;
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/scramble-text.tsx"),
  "utf-8"
);

export default async function ScrambleTextPage() {
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
          Scramble Text
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          Text that cycles through random characters before resolving, creating
          a satisfying decoding effect. Triggers on hover or mount.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <ScrambleText className="text-2xl font-semibold text-zinc-900">
            Hover over me
          </ScrambleText>
        </PreviewTabs>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Installation
        </h2>
        <PackageManagerTabs registryUrl={REGISTRY_URL} />
      </section>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Code
        </h2>
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute top-3.5 right-4 z-10">
            <CopyButton text={sourceCode} />
          </div>
          <div
            className="text-sm [&>pre]:p-5 [&>pre]:overflow-x-auto [&>pre]:rounded-xl [&>pre]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
        </div>
      </section>
    </div>
  );
}
