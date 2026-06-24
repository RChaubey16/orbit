import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import { KeyboardButton } from "@/components/button";
import { CopyButton } from "@/components/copy-button";
import { PackageManagerTabs } from "@/components/package-manager-tabs";

const REGISTRY_URL = "http://localhost:3000/r/keyboard-button";

export default async function KeyboardButtonPage() {
  const code = readFileSync(join(process.cwd(), "components/button.tsx"), "utf-8");

  const codeHtml = await codeToHtml(code, {
    lang: "tsx",
    theme: "github-dark",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 font-sans">
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
        <div className="flex items-center justify-center h-48 rounded-xl border border-zinc-200 bg-zinc-50">
          <KeyboardButton>Click me</KeyboardButton>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Installation
        </h2>
        <PackageManagerTabs registryUrl={REGISTRY_URL} />
        <p className="mt-3 text-xs text-zinc-400">
          Also add a click sound at{" "}
          <code className="font-mono">public/sounds/keyboard-click.mp3</code>.
        </p>
      </section>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Code
        </h2>
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute top-3.5 right-4 z-10">
            <CopyButton text={code} />
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
