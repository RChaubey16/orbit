interface PreviewTabsProps {
  children: React.ReactNode;
}

export function PreviewTabs({ children }: PreviewTabsProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-center min-h-52 p-6">
      {children}
    </div>
  );
}
