'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/copy-button';

export function ComponentPreview({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <div>
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('preview')}
          className={cn(
            'relative px-4 pb-3 text-sm font-medium transition-colors',
            activeTab === 'preview'
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          Preview
          {activeTab === 'preview' && (
            <span className="absolute inset-x-0 -bottom-px h-px bg-foreground" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={cn(
            'relative px-4 pb-3 text-sm font-medium transition-colors',
            activeTab === 'code'
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          Code
          {activeTab === 'code' && (
            <span className="absolute inset-x-0 -bottom-px h-px bg-foreground" />
          )}
        </button>
      </div>

      {activeTab === 'preview' ? (
        <div className="flex min-h-[350px] items-center justify-center rounded-lg border border-border p-10 mt-6">
          {children}
        </div>
      ) : (
        <div className="relative mt-6 rounded-lg bg-zinc-950 dark:bg-zinc-900">
          <CopyButton
            value={code}
            className="absolute right-4 top-4 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          />
          <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
            <code className="font-mono text-zinc-200">{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
