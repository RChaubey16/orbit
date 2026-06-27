import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { components } from "@/lib/registry";

export function PrevNextNav({ currentName }: { currentName: string }) {
  const idx = components.findIndex((c) => c.name === currentName);
  const prev = idx > 0 ? components[idx - 1] : null;
  const next = idx < components.length - 1 ? components[idx + 1] : null;

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-zinc-100">
      {prev ? (
        <Link href={prev.href} className="group flex flex-col gap-1">
          <span className="text-xs text-zinc-400">Previous</span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={next.href} className="group flex flex-col gap-1 items-end">
          <span className="text-xs text-zinc-400">Next</span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">
            {next.title}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
