import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { components } from "@/lib/registry";
import { PageTransition } from "@/components/page-transition";
import { ComponentPreview } from "@/components/component-preview";
import { TiltCard } from "@/components/tilt-card";
import { SpotlightCard } from "@/components/spotlight-card";
import { AuroraBackground } from "@/components/aurora-background";

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
  "flip-counter":    "h-40",
};

const VIEW_LINK_CLASS = "absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-zinc-900 hover:border-zinc-300";

const VIEW_ICON = <ArrowUpRight className="h-3 w-3" />;

const cardComponents = new Set(["tilt-card", "spotlight-card", "aurora-background"]);

const NUM_COLS = 4;

export default function Home() {
  const cols: (typeof components)[] = Array.from({ length: NUM_COLS }, () => []);
  components.forEach((c, i) => cols[i % NUM_COLS].push(c));

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
        <div className="flex gap-3">
          {cols.map((col, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-3 min-w-0">
              {col.map((component) =>
                cardComponents.has(component.name) ? (
                  component.name === "tilt-card" ? (
                    <TiltCard
                      key={component.name}
                      className="group relative rounded-xl border border-zinc-200 w-full bg-white"
                      image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=80"
                    >
                      <div className="px-5 py-4">
                        <p className="text-sm font-semibold text-zinc-900">Mountain Vista</p>
                        <p className="mt-1 text-xs text-zinc-500 leading-relaxed">Hover to feel the depth.</p>
                      </div>
                      <Link href={component.href} className={VIEW_LINK_CLASS}>View{VIEW_ICON}</Link>
                    </TiltCard>
                  ) : component.name === "spotlight-card" ? (
                    <SpotlightCard
                      key={component.name}
                      className="group relative rounded-xl border border-zinc-800 w-full bg-zinc-900"
                      image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80"
                    >
                      <div className="px-5 py-4">
                        <p className="text-sm font-semibold text-white">Night Sky</p>
                        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">Move your cursor across.</p>
                      </div>
                      <Link href={component.href} className={VIEW_LINK_CLASS}>View{VIEW_ICON}</Link>
                    </SpotlightCard>
                  ) : (
                    <AuroraBackground
                      key={component.name}
                      className="group relative rounded-xl w-full"
                    >
                      <div className="relative z-10 flex flex-col items-center justify-center min-h-[180px] text-center px-6 py-8">
                        <p className="text-sm font-semibold text-white">Aurora Background</p>
                        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">Dreamy drifting gradients.</p>
                      </div>
                      <Link href={component.href} className={`z-20 ${VIEW_LINK_CLASS}`}>View{VIEW_ICON}</Link>
                    </AuroraBackground>
                  )
                ) : (
                  <div
                    key={component.name}
                    className={`group relative flex items-center justify-center rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50 transition-colors hover:border-zinc-300 ${previewHeights[component.name] ?? "h-40"}`}
                  >
                    <ComponentPreview name={component.name} />
                    <Link href={component.href} className={VIEW_LINK_CLASS}>View{VIEW_ICON}</Link>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
