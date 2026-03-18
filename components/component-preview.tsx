"use client";

import { useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

export function ComponentPreview({
  code,
  highlightedCode,
  children,
}: {
  code: string;
  highlightedCode: string;
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div>
      <div className="border-border flex border-b">
        <button
          onClick={() => setActiveTab("preview")}
          className={cn(
            "relative px-4 pb-3 text-sm font-medium transition-colors",
            activeTab === "preview"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Preview
          {activeTab === "preview" && (
            <span className="bg-foreground absolute inset-x-0 -bottom-px h-px" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={cn(
            "relative px-4 pb-3 text-sm font-medium transition-colors",
            activeTab === "code"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Code
          {activeTab === "code" && (
            <span className="bg-foreground absolute inset-x-0 -bottom-px h-px" />
          )}
        </button>
      </div>

      {activeTab === "preview" ? (
        <div className="border-border mt-6 flex min-h-[350px] items-center justify-center rounded-lg border p-10">
          {children}
        </div>
      ) : (
        <div className="border-border relative mt-6 overflow-hidden rounded-lg border">
          <CopyButton
            value={code}
            className="text-muted-foreground hover:text-foreground absolute top-4 right-4 z-10"
          />
          <div
            className="[&_code]:font-mono [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-6 [&_pre]:text-sm [&_pre]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      )}
    </div>
  );
}
