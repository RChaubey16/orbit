import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

import { ComponentPreview } from '@/components/component-preview';
import { CopyButton } from '@/components/copy-button';
import { highlightCode } from '@/lib/highlight';
import { HelloWorld } from '@/registry/orbit/items/hello-world/hello-world';
import { ShinyButton } from '@/registry/orbit/items/shiny-button/shiny-button';

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
  const files = fs
    .readdirSync(registryPath)
    .filter((f) => f.endsWith('.json') && f !== 'registry.json');
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

  const [highlightedSource, highlightedInstall, highlightedUsage] = await Promise.all([
    highlightCode(sourceCode, 'tsx'),
    highlightCode(installCommand, 'bash'),
    usage ? highlightCode(usage, 'tsx') : Promise.resolve(''),
  ]);

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:py-24">
        {/* Title & Description */}
        <div className="space-y-2">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">{item.title}</h1>
          <p className="text-muted-foreground text-base">{item.description}</p>
        </div>

        {/* Preview */}
        <div className="mt-12">
          <ComponentPreview code={sourceCode} highlightedCode={highlightedSource}>
            {preview}
          </ComponentPreview>
        </div>

        {/* Installation */}
        <div className="mt-16">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">Installation</h2>
          <div className="border-border relative mt-4 overflow-hidden rounded-lg border">
            <CopyButton
              value={installCommand}
              className="text-muted-foreground hover:text-foreground absolute top-4 right-4 z-10"
            />
            <div
              className="[&_code]:font-mono [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-6 [&_pre]:text-sm [&_pre]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedInstall }}
            />
          </div>
        </div>

        {/* Usage */}
        {usage && (
          <div className="mt-16">
            <h2 className="text-foreground text-xl font-semibold tracking-tight">Usage</h2>
            <div className="border-border relative mt-4 overflow-hidden rounded-lg border">
              <CopyButton
                value={usage}
                className="text-muted-foreground hover:text-foreground absolute top-4 right-4 z-10"
              />
              <div
                className="[&_code]:font-mono [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-6 [&_pre]:text-sm [&_pre]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightedUsage }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
