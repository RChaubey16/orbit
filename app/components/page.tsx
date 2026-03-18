import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface RegistryItem {
  name: string;
  title: string;
  description: string;
}

function getRegistryItems(): RegistryItem[] {
  const registryPath = path.join(process.cwd(), 'public', 'r');
  const files = fs
    .readdirSync(registryPath)
    .filter((f) => f.endsWith('.json') && f !== 'registry.json');
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(registryPath, f), 'utf-8');
    return JSON.parse(raw);
  });
}

export const metadata = {
  title: 'Components - Orbit',
  description: 'Browse all Orbit components.',
};

export default function ComponentsPage() {
  const items = getRegistryItems();

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <div className="space-y-2">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">Components</h1>
          <p className="text-muted-foreground text-base">Browse and install Orbit components.</p>
        </div>
        <div className="divide-border border-border mt-10 divide-y rounded-lg border">
          {items.map((item) => (
            <Link
              key={item.name}
              href={`/components/${item.name}`}
              className="hover:bg-muted/50 flex items-center justify-between px-5 py-4 transition-colors"
            >
              <div>
                <p className="text-foreground text-sm font-medium">{item.title}</p>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
              <ChevronRight className="text-muted-foreground size-4 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
