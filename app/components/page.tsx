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
  const files = fs.readdirSync(registryPath).filter((f) => f.endsWith('.json') && f !== 'registry.json');
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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Components</h1>
          <p className="text-base text-muted-foreground">Browse and install Orbit components.</p>
        </div>
        <div className="mt-10 divide-y divide-border rounded-lg border border-border">
          {items.map((item) => (
            <Link
              key={item.name}
              href={`/components/${item.name}`}
              className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/50"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
