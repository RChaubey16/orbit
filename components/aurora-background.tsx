import { HTMLAttributes } from "react";

interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AuroraBackground({
  children,
  className = "",
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={`relative overflow-hidden bg-zinc-950 ${className}`}
      {...props}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-1/2 -left-1/4 h-3/4 w-3/4 rounded-full bg-violet-500/50 blur-[120px]"
          style={{ animation: "aurora-1 14s ease-in-out infinite" }}
        />
        <div
          className="absolute -top-1/3 right-0 h-2/3 w-2/3 rounded-full bg-cyan-400/40 blur-[100px]"
          style={{ animation: "aurora-2 17s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-1/2 w-1/2 rounded-full bg-blue-500/40 blur-[100px]"
          style={{ animation: "aurora-3 11s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-1/4 right-1/3 h-2/5 w-2/5 rounded-full bg-fuchsia-500/30 blur-[80px]"
          style={{ animation: "aurora-4 19s ease-in-out infinite" }}
        />
      </div>
      {children}
    </div>
  );
}
