import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RegistryItem {
  name: string;
  title: string;
  description: string;
}

function getRegistryItems(): RegistryItem[] {
  const registryPath = path.join(process.cwd(), "public", "r");
  const files = fs
    .readdirSync(registryPath)
    .filter((f) => f.endsWith(".json") && f !== "registry.json");
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(registryPath, f), "utf-8");
    return JSON.parse(raw);
  });
}

export const metadata = {
  title: "Components - Orbit",
  description: "Browse all Orbit components.",
};

export default function ComponentsPage() {
  const items = getRegistryItems();

  return (
    <div className="py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-muted-foreground mb-4 font-mono text-xs tracking-widest uppercase">
          UI Component Library
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-foreground text-4xl font-bold tracking-tight">Components</h1>
          <p className="text-muted-foreground mb-0.5 text-sm">
            {items.length} component{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="bg-border mt-4 h-px" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={item.name}
            href={`/components/${item.name}`}
            className="group bg-card hover:border-foreground/20 flex flex-col justify-between gap-8 rounded-xl border p-5 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-foreground text-sm font-medium">{item.title}</p>
                <p className="text-muted-foreground text-xs leading-5">{item.description}</p>
              </div>
              <span className="text-muted-foreground font-mono text-xs tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="bg-muted text-muted-foreground truncate rounded-md px-2 py-0.5 font-mono text-xs">
                npx shadcn@latest add https://orbit.ruturaj.xyz/r/{item.name}.json
              </span>
              <ArrowRight className="text-muted-foreground group-hover:text-foreground h-3.5 w-3.5 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
