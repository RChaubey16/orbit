import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { MagneticButton } from "@/components/magnetic-button";
import { CopyButton } from "@/components/copy-button";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { PreviewTabs } from "@/components/preview-tabs";

export const metadata: Metadata = {
  title: "Magnetic Button",
  description: "A button that pulls toward the cursor and springs back, creating a satisfying magnetic attraction effect.",
  openGraph: {
    title: "Magnetic Button · Orbit",
    description: "A button that pulls toward the cursor and springs back, creating a satisfying magnetic attraction effect.",
  },
  twitter: {
    title: "Magnetic Button · Orbit",
    description: "A button that pulls toward the cursor and springs back, creating a satisfying magnetic attraction effect.",
  },
};

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/magnetic-button`;

const USAGE_CODE = `import { MagneticButton } from "@/components/magnetic-button";

export default function Example() {
  return <MagneticButton>Hover me</MagneticButton>;
}`;

const sourceCode = readFileSync(
  join(process.cwd(), "components/magnetic-button.tsx"),
  "utf-8"
);

export default async function MagneticButtonPage() {
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
          Magnetic Button
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed max-w-lg">
          A button that pulls toward the cursor and springs back on leave,
          creating a satisfying magnetic attraction effect.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Preview
        </h2>
        <PreviewTabs codeHtml={usageHtml} rawCode={USAGE_CODE}>
          <MagneticButton>Hover me</MagneticButton>
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
