import type { Metadata } from "next";
import Link from "next/link";
import { components } from "@/lib/registry";
import { PageTransition } from "@/components/page-transition";
import { ComponentPreview } from "@/components/component-preview";
import { TiltCard } from "@/components/tilt-card";
import { SpotlightCard } from "@/components/spotlight-card";

export const metadata: Metadata = {
  title: "Orbit — Components built to feel different",
  description: "An open-source component library focused on interaction and physical feel. Copy-paste or install via shadcn.",
  openGraph: {
    title: "Orbit — Components built to feel different",
    description: "An open-source component library focused on interaction and physical feel.",
  },
  twitter: {
    title: "Orbit — Components built to feel different",
    description: "An open-source component library focused on interaction and physical feel.",
  },
};

const previewHeights: Record<string, string> = {
  "keyboard-button": "h-36",
  "scramble-text":   "h-48",
  "confetti-button": "h-40",
};

const VIEW_LINK_CLASS = "absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-zinc-900 hover:border-zinc-300";

const VIEW_ICON = (
  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

function CardPreview({ name, href }: { name: string; href: string }) {
  if (name === "tilt-card") {
    return (
      <TiltCard
        className="group relative break-inside-avoid mb-3 rounded-xl border border-zinc-200 w-full bg-white"
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=80"
      >
        <div className="px-5 py-4">
          <p className="text-sm font-semibold text-zinc-900">Mountain Vista</p>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">Hover to feel the depth.</p>
        </div>
        <Link href={href} className={VIEW_LINK_CLASS}>View{VIEW_ICON}</Link>
      </TiltCard>
    );
  }
  if (name === "spotlight-card") {
    return (
      <SpotlightCard
        className="group relative break-inside-avoid mb-3 rounded-xl border border-zinc-800 w-full bg-zinc-900"
        image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80"
      >
        <div className="px-5 py-4">
          <p className="text-sm font-semibold text-white">Night Sky</p>
          <p className="mt-1 text-xs text-zinc-400 leading-relaxed">Move your cursor across.</p>
        </div>
        <Link href={href} className={VIEW_LINK_CLASS}>View{VIEW_ICON}</Link>
      </SpotlightCard>
    );
  }
  return null;
}

const cardComponents = new Set(["tilt-card", "spotlight-card"]);

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 text-center max-w-4xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
          Components built to feel different.
        </h1>
        <p className="mt-5 text-lg text-zinc-500 max-w-xl leading-relaxed">
          An open-source component library focused on interaction and physical feel. Copy-paste or install via shadcn.
        </p>
        <Link
          href="/components/keyboard-button"
          className="mt-8 inline-flex items-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
        >
          Browse components
        </Link>
      </div>

      <div className="px-4 pb-16 sm:px-8 md:px-12 lg:px-20">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3">
          {components.map((component) =>
            cardComponents.has(component.name) ? (
              <CardPreview key={component.name} name={component.name} href={component.href} />
            ) : (
              <div
                key={component.name}
                className={`group relative flex items-center justify-center break-inside-avoid mb-3 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50 transition-colors hover:border-zinc-300 ${previewHeights[component.name] ?? "h-40"}`}
              >
                <ComponentPreview name={component.name} />
                <Link
                  href={component.href}
                  className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-zinc-900 hover:border-zinc-300"
                >
                  View
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </PageTransition>
  );
}
