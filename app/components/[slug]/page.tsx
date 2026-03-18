import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Orbit } from "lucide-react";

import { ComponentPreview } from "@/components/component-preview";
import { CopyButton } from "@/components/copy-button";
import { highlightCode } from "@/lib/highlight";
import {
  CardDefault as IconCardDefault,
  CardSurface as IconCardSurface,
} from "@/registry/orbit/examples/icon-card.tsx/cards";
import {
  CardDefault,
  CardElevated,
  CardInset,
} from "@/registry/orbit/examples/testimonial-card/cards";
import { HelloWorld } from "@/registry/orbit/items/hello-world/hello-world";
import { IconCard } from "@/registry/orbit/items/icon-card/icon-card";
import { ShinyButton } from "@/registry/orbit/items/shiny-button/shiny-button";
import { TestimonialCard } from "@/registry/orbit/items/testimonial-card/testimonial-card";

interface ComponentExample {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
}

// Map of slug → examples
const examplesMap: Record<string, ComponentExample[]> = {
  "testimonial-card": [
    {
      title: "Default",
      description: "A clean, minimal testimonial card with no background fill.",
      preview: <CardDefault />,
      code: `<TestimonialCard
  avatar="https://github.com/shadcn.png"
  name="Shadcn"
  designation="SWE @ Vercel"
  quote="Lorem ipsum dolor sit amet consectetur adipiscing elit."
/>`,
    },
    {
      title: "Elevated",
      description: "A raised testimonial card with a subtle shadow for depth.",
      preview: <CardElevated />,
      code: `<TestimonialCard
  avatar="https://github.com/shadcn.png"
  name="Shadcn"
  designation="SWE @ Vercel"
  quote="Lorem ipsum dolor sit amet consectetur adipiscing elit."
  variant="elevated"
/>`,
    },
    {
      title: "Inset",
      description: "A testimonial card with a recessed, filled background.",
      preview: <CardInset />,
      code: `<TestimonialCard
  avatar="https://github.com/shadcn.png"
  name="Shadcn"
  designation="SWE @ Vercel"
  quote="Lorem ipsum dolor sit amet consectetur adipiscing elit."
  variant="inset"
/>`,
    },
  ],
  "icon-card": [
    {
      title: "Default",
      description: "A minimal icon card with a call-to-action link.",
      preview: <IconCardDefault />,
      code: `<IconCard
  icon={<Orbit />}
  title="Professional services."
  description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
  ctaTitle="Contact sales"
  ctaLink="#"
/>`,
    },
    {
      title: "Surface",
      description: "An icon card with a raised surface background and custom color.",
      preview: <IconCardSurface />,
      code: `<IconCard
  icon={<Orbit />}
  title="Professional services."
  description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
  ctaTitle="Contact sales"
  ctaLink="#"
  variant="surface"
  color="#758bfd"
/>`,
    },
  ],
};

// Map of slug → preview component
const componentMap: Record<string, React.ReactNode> = {
  "shiny-button": <ShinyButton />,
  "hello-world": <HelloWorld />,
  "testimonial-card": (
    <TestimonialCard
      avatar="https://github.com/shadcn.png"
      name="Shadcn"
      designation="SWE @ Vercel"
      quote="Lorem ipsum dolor sit amet consectetur adiicing elit. Quisquam, quod."
      variant="inset"
    />
  ),
  "icon-card": (
    <IconCard
      icon={<Orbit />}
      title="Professional services."
      description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
      ctaTitle="Contact sales"
      ctaLink="#"
    />
  ),
};

// Map of slug → usage example
const usageMap: Record<string, string> = {
  "shiny-button": `import { ShinyButton } from "@/components/shiny-button"

export default function Page() {
  return <ShinyButton text="Get Started" />
}`,
  "hello-world": `import { HelloWorld } from "@/components/hello-world"

export default function Page() {
  return <HelloWorld />
}`,
  "testimonial-card": `import { TestimonialCard } from "@/components/testimonial-card"

export default function Page() {
  return (
    <TestimonialCard
      avatar="https://github.com/shadcn.png"
      name="Shadcn"
      designation="SWE @ Vercel"
      quote="Lorem ipsum dolor sit amet consectetur adipiscing elit."
      variant="inset"
    />
  )
}`,
  "icon-card": `import { Orbit } from "lucide-react"
import { IconCard } from "@/components/icon-card"

export default function Page() {
  return (
    <IconCard
      icon={<Orbit />}
      title="Professional services."
      description="Get tailored guidance on implementation."
      ctaTitle="Contact sales"
      ctaLink="#"
    />
  )
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
  const filePath = path.join(process.cwd(), "public", "r", `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const registryPath = path.join(process.cwd(), "public", "r");
  const files = fs
    .readdirSync(registryPath)
    .filter((f) => f.endsWith(".json") && f !== "registry.json");
  return files.map((f) => ({ slug: f.replace(".json", "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getRegistryItem(slug);
  if (!item) return { title: "Component Not Found" };
  return {
    title: `${item.title} - Orbit`,
    description: item.description,
  };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getRegistryItem(slug);

  if (!item) notFound();

  const sourceCode = item.files[0]?.content ?? "";
  const installCommand = `pnpm dlx shadcn@latest add https://orbit.ruturaj.xyz/r/${item.name}.json`;
  const usage = usageMap[slug] ?? "";
  const preview = componentMap[slug] ?? null;
  const examples = examplesMap[slug] ?? [];

  const [highlightedSource, highlightedInstall, highlightedUsage, ...highlightedExamples] =
    await Promise.all([
      highlightCode(sourceCode, "tsx"),
      highlightCode(installCommand, "bash"),
      usage ? highlightCode(usage, "tsx") : Promise.resolve(""),
      ...examples.map((ex) => highlightCode(ex.code, "tsx")),
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

        {/* Examples */}
        {examples.length > 0 && (
          <div className="mt-16">
            <h2 className="text-foreground text-xl font-semibold tracking-tight">Examples</h2>
            <div className="mt-6 space-y-12">
              {examples.map((example, index) => (
                <div key={example.title}>
                  <h3 className="text-foreground text-lg font-medium">{example.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{example.description}</p>
                  <div className="mt-4">
                    <ComponentPreview
                      code={example.code}
                      highlightedCode={highlightedExamples[index]}
                    >
                      {example.preview}
                    </ComponentPreview>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
