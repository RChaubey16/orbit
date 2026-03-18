import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

import { CopyButton } from '@/components/copy-button';
import { ComponentPreview } from '@/components/component-preview';

import { ShinyButton } from '@/registry/orbit/items/shiny-button/shiny-button';
import { HelloWorld } from '@/registry/orbit/items/hello-world/hello-world';

// Map of slug → preview component
const componentMap: Record<string, React.ReactNode> = {
  'shiny-button': <ShinyButton />,
  'hello-world': <HelloWorld />,
};

// Map of slug → usage example
const usageMap: Record<string, string> = {
  'shiny-button': `import { ShinyButton } from "@/components/shiny-button"

export default function Page() {
  return <ShinyButton text="Get Started" />
}`,
  'hello-world': `import { HelloWorld } from "@/components/hello-world"

export default function Page() {
  return <HelloWorld />
}`,
};

interface RegistryItem {
  name: string;
  title: string;
  description: string;
  type: string;
  files: { path: string; content: string; type: string }[];
}

function getRegistryItem(slug: string): RegistryItem | null {
  const filePath = path.join(process.cwd(), 'public', 'r', `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const registryPath = path.join(process.cwd(), 'public', 'r');
  const files = fs.readdirSync(registryPath).filter((f) => f.endsWith('.json') && f !== 'registry.json');
  return files.map((f) => ({ slug: f.replace('.json', '') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getRegistryItem(slug);
  if (!item) return { title: 'Component Not Found' };
  return {
    title: `${item.title} - Orbit`,
    description: item.description,
  };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getRegistryItem(slug);

  if (!item) notFound();

  const sourceCode = item.files[0]?.content ?? '';
  const installCommand = `pnpm dlx shadcn@latest add https://orbit.ruturaj.xyz/r/${item.name}.json`;
  const usage = usageMap[slug] ?? '';
  const preview = componentMap[slug] ?? null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:py-24">
        {/* Title & Description */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {item.title}
          </h1>
          <p className="text-base text-muted-foreground">{item.description}</p>
        </div>

        {/* Preview */}
        <div className="mt-12">
          <ComponentPreview code={sourceCode}>
            {preview}
          </ComponentPreview>
        </div>

        {/* Installation */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <div className="relative mt-4 rounded-lg bg-zinc-950 dark:bg-zinc-900">
            <CopyButton
              value={installCommand}
              className="absolute right-4 top-4 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            />
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
              <code className="font-mono text-zinc-200">{installCommand}</code>
            </pre>
          </div>
        </div>

        {/* Usage */}
        {usage && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Usage
            </h2>
            <div className="relative mt-4 rounded-lg bg-zinc-950 dark:bg-zinc-900">
              <CopyButton
                value={usage}
                className="absolute right-4 top-4 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              />
              <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
                <code className="font-mono text-zinc-200">{usage}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
