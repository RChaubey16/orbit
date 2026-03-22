"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Copy,
  CreditCard,
  Layers,
  Loader2,
  Moon,
  Sparkles,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

import { IconCard } from "@/registry/orbit/items/icon-card/icon-card";
import { PreviewLink } from "@/registry/orbit/items/preview-link/preview-link";
import RotatingStack from "@/registry/orbit/items/rotating-stack/rotating-stack";
import { StatusCheck } from "@/registry/orbit/items/status-check/status-check";
import { TestimonialCard } from "@/registry/orbit/items/testimonial-card/testimonial-card";

// ─── Animation variants ────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SLIDE_UP = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const CARD_ANIM = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

const DOT_GRID = {
  backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// ─── Component data ─────────────────────────────────────────────────────────

const rotatingNotifications = [
  {
    id: 1,
    message: "Rotating Stack just shipped to Orbit",
    cta: "View",
    icon: <Sparkles className="h-4 w-4 text-amber-500" />,
  },
  {
    id: 2,
    message: "Dark mode across all components",
    cta: "Explore",
    icon: <Moon className="h-4 w-4 text-indigo-400" />,
  },
  {
    id: 3,
    message: "Copy-paste ready — no configuration",
    cta: "Copy",
    icon: <Copy className="h-4 w-4 text-emerald-500" />,
  },
];

const paymentStatus = {
  idle: {
    label: "Pay $24.00",
    icon: CreditCard,
    sublabel: null,
    dotColor: "#9ca3af",
    glowColor: null,
  },
  processing: {
    label: "Processing",
    icon: Loader2,
    sublabel: "Please wait…",
    dotColor: "#f59e0b",
    glowColor: "#f59e0b",
    spin: true,
  },
  completed: {
    label: "Payment sent",
    icon: CheckCircle,
    sublabel: "$24.00 · just now",
    dotColor: "#22c55e",
    glowColor: "#22c55e",
  },
  failed: {
    label: "Payment failed",
    icon: XCircle,
    sublabel: "Try again",
    dotColor: "#ef4444",
    glowColor: "#ef4444",
  },
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="pt-16 pb-24">
      {/* Hero */}
      <motion.div
        className="max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
      >
        <motion.p
          variants={SLIDE_UP}
          className="text-muted-foreground mb-4 font-mono text-xs tracking-widest uppercase"
        >
          UI Component Library
        </motion.p>

        <motion.h1
          variants={SLIDE_UP}
          className="text-foreground mb-5 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] tracking-tight"
        >
          Your UI,
          <br />
          In Perfect Orbit.
        </motion.h1>

        <motion.p
          variants={SLIDE_UP}
          className="text-muted-foreground mb-8 max-w-md text-lg leading-7"
        >
          Tasteful, minimal components that help teams create refined user experiences without
          unnecessary complexity.
        </motion.p>

        <motion.div variants={SLIDE_UP}>
          <Link
            href="/components"
            className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
          >
            Browse Components
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Component Preview Grid */}
      <div className="mt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-foreground text-sm font-medium">
            Components <span className="text-muted-foreground font-normal">— 6 available</span>
          </p>
          <Link
            href="/components"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            View all →
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
          }}
        >
          <PreviewCard
            name="Rotating Stack"
            slug="rotating-stack"
            description="Animated notification stack that cycles through items."
          >
            <div className="w-full max-w-md">
              <RotatingStack notifications={rotatingNotifications} className="!w-full" />
            </div>
          </PreviewCard>

          <PreviewCard
            name="Status Check"
            slug="status-check"
            description="Dynamic island-style animated state machine button."
          >
            <StatusCheck
              idle={paymentStatus.idle}
              processing={paymentStatus.processing}
              completed={paymentStatus.completed}
              failed={paymentStatus.failed}
            />
          </PreviewCard>

          <PreviewCard
            name="Testimonial Card"
            slug="testimonial-card"
            description="Showcase user quotes with avatar and attribution."
          >
            <TestimonialCard
              quote="Orbit components are the cleanest UI kit I've used."
              name="Sarah Chen"
              designation="Product Designer"
              className="w-full max-w-xs"
            />
          </PreviewCard>

          <PreviewCard
            name="Icon Card"
            slug="icon-card"
            description="Feature card with accent icon and CTA link."
          >
            <IconCard
              icon={<Layers className="h-5 w-5" />}
              title="Copy & Paste."
              description="Drop straight into your project."
              ctaTitle="Browse all"
              ctaLink="/components"
              color="#2a9d8f"
              className="w-full max-w-xs"
            />
          </PreviewCard>

          <PreviewCard
            name="Preview Link"
            slug="preview-link"
            description="Hover a link to see a live website screenshot."
          >
            <p className="text-muted-foreground text-sm">
              Hover over{" "}
              <PreviewLink
                imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=280&h=188&fit=crop"
                imageAlt="Preview"
                className="text-foreground font-medium underline underline-offset-2"
              >
                this link
              </PreviewLink>{" "}
              to see a preview.
            </p>
          </PreviewCard>
        </motion.div>
      </div>
    </div>
  );
}

// ─── PreviewCard ─────────────────────────────────────────────────────────────

interface PreviewCardProps {
  name: string;
  slug: string;
  description: string;
  children: React.ReactNode;
}

function PreviewCard({ name, slug, description, children }: PreviewCardProps) {
  return (
    <motion.div
      variants={CARD_ANIM}
      className="bg-card hover:border-foreground/20 overflow-hidden rounded-xl border transition-colors"
    >
      <div className="flex h-50 items-center justify-center overflow-hidden p-6" style={DOT_GRID}>
        {children}
      </div>
      <Link
        href={`/components/${slug}`}
        className="flex items-center justify-between border-t px-4 py-3"
      >
        <div>
          <p className="text-foreground text-sm font-medium">{name}</p>
          <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
        </div>
        <div className="text-muted-foreground hover:text-foreground ml-4 shrink-0 transition-colors">
          <ArrowRight className="h-4 w-4" />
        </div>
      </Link>
    </motion.div>
  );
}
