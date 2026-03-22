import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Earth, Orbit, Star } from "lucide-react";

import { ComponentPreview } from "@/components/component-preview";
import { CopyButton } from "@/components/copy-button";
import { InstallTabs } from "@/components/install-tabs";
import { highlightCode } from "@/lib/highlight";
import { CardSurface as IconCardSurface } from "@/registry/orbit/examples/icon-card.tsx/cards";
import {
  CardBackground as ImageCardBackground,
  CardDefault as ImageCardDefault,
} from "@/registry/orbit/examples/image-card/cards";
import { PreviewLinkTailwind } from "@/registry/orbit/examples/preview-link/previews";
import { IconTabs } from "@/registry/orbit/examples/rotating-stack/tabs";
import {
  StatusCheckCharge,
  StatusCheckDefault,
  StatusCheckDeploy,
  StatusCheckFail,
} from "@/registry/orbit/examples/status-check/demos";
import {
  CardDefault,
  CardElevated,
  CardInset,
} from "@/registry/orbit/examples/testimonial-card/cards";
import { IconCard } from "@/registry/orbit/items/icon-card/icon-card";
import { ImageCard } from "@/registry/orbit/items/image-card/image-card";
import { PreviewLink } from "@/registry/orbit/items/preview-link/preview-link";
import RotatingStack from "@/registry/orbit/items/rotating-stack/rotating-stack";
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
  "preview-link": [
    {
      title: "Screenshot",
      description: "Fetches a live screenshot of the URL on hover.",
      preview: <PreviewLinkTailwind />,
      code: `<PreviewLink url="https://tailwindcss.com" className="text-xl font-bold" useScreenshot>
  Tailwind CSS
</PreviewLink>`,
    },
  ],
  "rotating-stack": [
    {
      title: "With Icons",
      description: "Notifications with image and React node icons.",
      preview: <IconTabs />,
      code: `import { Earth, Star } from "lucide-react"

const notifications = [
  {
    id: 1,
    icon: { src: "/vercel.svg", alt: "Vercel logo" },
    message: "Vercel has shipped a new feature",
    cta: "Explore",
  },
  {
    id: 2,
    icon: <Star className="h-5 w-5" />,
    message: "Your deployment is ready to preview",
    cta: "View deploy",
  },
  {
    id: 3,
    icon: <Earth className="h-5 w-5" />,
    message: "Domain verification successful",
    cta: "Go to settings",
  },
]

<RotatingStack notifications={notifications} />`,
    },
  ],
  "status-check": [
    {
      title: "Failure",
      description: "Same config with simulateFailure to always end in the failed state.",
      preview: <StatusCheckFail />,
      code: `import { ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react"

<StatusCheck
  simulateFailure
  idle={{ label: "Start Transaction", icon: ArrowRight, dotColor: "#9ca3af", iconClass: "text-muted-foreground" }}
  processing={{ label: "Processing", sublabel: "Verifying payment...", icon: Loader2, iconClass: "text-blue-400", dotColor: "#60a5fa", spin: true }}
  completed={{ label: "Completed", sublabel: "Payment successful", icon: CheckCircle2, iconClass: "text-emerald-400", dotColor: "#34d399", glowColor: "#34d399" }}
  failed={{ label: "Failed", sublabel: "Transaction declined", icon: XCircle, iconClass: "text-red-400", dotColor: "#f87171", glowColor: "#f87171" }}
/>`,
    },
    {
      title: "Deploy",
      description: "Custom labels and icons for a deployment flow.",
      preview: <StatusCheckDeploy />,
      code: `import { CloudUpload, Loader2, Rocket, ServerCrash } from "lucide-react"

<StatusCheck
  idle={{ label: "Deploy to Production", icon: Rocket, dotColor: "#9ca3af", iconClass: "text-muted-foreground" }}
  processing={{ label: "Deploying", sublabel: "Building your project...", icon: Loader2, iconClass: "text-violet-400", dotColor: "#a78bfa", spin: true }}
  completed={{ label: "Live", sublabel: "Deployment successful", icon: CloudUpload, iconClass: "text-emerald-400", dotColor: "#34d399", glowColor: "#34d399" }}
  failed={{ label: "Build Failed", sublabel: "Check your logs", icon: ServerCrash, iconClass: "text-red-400", dotColor: "#f87171", glowColor: "#f87171" }}
  processingDuration={3000}
/>`,
    },
    {
      title: "Charge",
      description: "Custom labels and colors for a payment charge flow.",
      preview: <StatusCheckCharge />,
      code: `import { CheckCircle2, Loader2, XCircle, Zap } from "lucide-react"

<StatusCheck
  idle={{ label: "Charge Card", icon: Zap, dotColor: "#9ca3af", iconClass: "text-muted-foreground" }}
  processing={{ label: "Charging", sublabel: "Contacting bank...", icon: Loader2, iconClass: "text-amber-400", dotColor: "#fbbf24", spin: true }}
  completed={{ label: "Charged", sublabel: "$49.00 collected", icon: CheckCircle2, iconClass: "text-emerald-400", dotColor: "#34d399", glowColor: "#34d399" }}
  failed={{ label: "Declined", sublabel: "Card was declined", icon: XCircle, iconClass: "text-red-400", dotColor: "#f87171", glowColor: "#f87171" }}
/>`,
    },
  ],
  "image-card": [
    {
      title: "Default",
      description: "A clean image card with title, subtitle, and description.",
      preview: <ImageCardDefault />,
      code: `<ImageCard
  title="Professional services"
  description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
  imageSrc="https://images.unsplash.com/photo-1772289934600-cb4ddd71dbd8?q=80&w=1632&auto=format&fit=crop"
  imageAltText="Hero image"
  cardLink="#"
  subTitle="Ruturaj Chaubey | January 20, 2026"
/>`,
    },
    {
      title: "Background",
      description: "An image card with a filled background and subtle shadow.",
      preview: <ImageCardBackground />,
      code: `<ImageCard
  title="Snipr"
  description="Snipr is a screen recording and video editing tool."
  imageSrc="https://images.unsplash.com/photo-1772289934600-cb4ddd71dbd8?q=80&w=1632&auto=format&fit=crop"
  imageAltText="Hero image"
  cardLink="#"
  subTitle="Ruturaj Chaubey | January 20, 2026"
  variant="background"
/>`,
    },
  ],
};

// Map of slug → preview component
const componentMap: Record<string, React.ReactNode> = {
  "preview-link": (
    <PreviewLink url="https://tailwindcss.com" className="text-xl font-bold" useScreenshot>
      Tailwind CSS
    </PreviewLink>
  ),
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
  "rotating-stack": (
    <RotatingStack
      notifications={[
        {
          id: 1,
          icon: { src: "/vercel.svg", alt: "Vercel logo" },
          message: "Vercel has shipped a new feature",
          cta: "Explore",
        },
        {
          id: 2,
          icon: <Star className="h-5 w-5" />,
          message: "Your deployment is ready to preview",
          cta: "View deploy",
        },
        {
          id: 3,
          icon: <Earth className="h-5 w-5" />,
          message: "Domain verification successful",
          cta: "Go to settings",
        },
      ]}
    />
  ),
  "status-check": <StatusCheckDefault />,
  "image-card": (
    <ImageCard
      title="Professional services"
      description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
      imageSrc="https://images.unsplash.com/photo-1772289934600-cb4ddd71dbd8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      imageAltText="Hero image"
      cardLink="#"
      subTitle="Ruturaj Chaubey | January 20, 2026"
    />
  ),
};

// Map of slug → usage example
const usageMap: Record<string, string> = {
  "preview-link": `import { PreviewLink } from "@/components/preview-link"

export default function Page() {
  return (
    <PreviewLink url="https://tailwindcss.com" useScreenshot>
      Tailwind CSS
    </PreviewLink>
  )
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
  "rotating-stack": `import RotatingStack from "@/components/rotating-stack"

export default function Page() {
  return (
    <RotatingStack
      notifications={[
        { id: 1, message: "Vercel has shipped a new feature", cta: "Explore" },
        { id: 2, message: "Your deployment is ready to preview", cta: "View deploy" },
        { id: 3, message: "Domain verification successful", cta: "Go to settings" },
      ]}
    />
  )
}`,
  "status-check": `import { ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react"
import { StatusCheck } from "@/components/status-check"

export default function Page() {
  return (
    <StatusCheck
      idle={{ label: "Start Transaction", icon: ArrowRight, dotColor: "#9ca3af", iconClass: "text-muted-foreground" }}
      processing={{ label: "Processing", sublabel: "Verifying payment...", icon: Loader2, iconClass: "text-blue-400", dotColor: "#60a5fa", spin: true }}
      completed={{ label: "Completed", sublabel: "Payment successful", icon: CheckCircle2, iconClass: "text-emerald-400", dotColor: "#34d399", glowColor: "#34d399" }}
      failed={{ label: "Failed", sublabel: "Transaction declined", icon: XCircle, iconClass: "text-red-400", dotColor: "#f87171", glowColor: "#f87171" }}
    />
  )
}`,
  "image-card": `import { ImageCard } from "@/components/image-card"

export default function Page() {
  return (
    <ImageCard
      title="Professional services"
      description="Get tailored guidance on implementation."
      imageSrc="/hero.jpg"
      imageAltText="Hero image"
      cardLink="#"
      subTitle="Author | January 20, 2026"
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

const BASE_URL = "https://orbit.ruturaj.xyz/r";

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getRegistryItem(slug);

  if (!item) notFound();

  const sourceCode = item.files[0]?.content ?? "";
  const usage = usageMap[slug] ?? "";
  const preview = componentMap[slug] ?? null;
  const examples = examplesMap[slug] ?? [];

  const installCommands = {
    pnpm: `pnpm dlx shadcn@latest add ${BASE_URL}/${item.name}.json`,
    npm: `npx shadcn@latest add ${BASE_URL}/${item.name}.json`,
    yarn: `yarn dlx shadcn@latest add ${BASE_URL}/${item.name}.json`,
    bun: `bunx --bun shadcn@latest add ${BASE_URL}/${item.name}.json`,
  };

  const [highlightedSource, pnpmH, npmH, yarnH, bunH, highlightedUsage, ...highlightedExamples] =
    await Promise.all([
      highlightCode(sourceCode, "tsx"),
      highlightCode(installCommands.pnpm, "bash"),
      highlightCode(installCommands.npm, "bash"),
      highlightCode(installCommands.yarn, "bash"),
      highlightCode(installCommands.bun, "bash"),
      usage ? highlightCode(usage, "tsx") : Promise.resolve(""),
      ...examples.map((ex) => highlightCode(ex.code, "tsx")),
    ]);

  const highlightedInstall = { pnpm: pnpmH, npm: npmH, yarn: yarnH, bun: bunH };

  return (
    <div className="mx-auto max-w-3xl py-12">
      {/* Breadcrumb */}
      <div className="text-muted-foreground mb-8 flex items-center gap-2 text-sm">
        <Link href="/components" className="hover:text-foreground transition-colors">
          Components
        </Link>
        <span>/</span>
        <span className="text-foreground">{item.title}</span>
      </div>

      {/* Title & Description */}
      <h1 className="text-foreground text-3xl font-bold tracking-tight">{item.title}</h1>
      <p className="text-muted-foreground mt-2 text-base">{item.description}</p>
      <div className="bg-border mt-6 h-px" />

      {/* Preview */}
      <div className="mt-10">
        <ComponentPreview code={sourceCode} highlightedCode={highlightedSource}>
          {preview}
        </ComponentPreview>
      </div>

      {/* Installation */}
      <div className="mt-12">
        <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-widest uppercase">
          Installation
        </h2>
        <InstallTabs commands={installCommands} highlighted={highlightedInstall} />
      </div>

      {/* Usage */}
      {usage && (
        <div className="mt-12">
          <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-widest uppercase">
            Usage
          </h2>
          <div className="relative overflow-hidden rounded-lg border">
            <CopyButton value={usage} className="absolute top-3 right-3 z-10" />
            <div
              className="[&_pre]:overflow-x-auto [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedUsage }}
            />
          </div>
        </div>
      )}

      {/* Examples */}
      {examples.length > 0 && (
        <div className="mt-12">
          <h2 className="text-muted-foreground mb-6 text-sm font-semibold tracking-widest uppercase">
            Examples
          </h2>
          <div className="space-y-10">
            {examples.map((example, index) => (
              <div key={example.title}>
                <p className="text-foreground text-base font-medium">{example.title}</p>
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
  );
}
