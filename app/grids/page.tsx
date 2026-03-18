export default function Grids() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl space-y-16 px-8 py-20">
      {/* ───────────────────────────────────────────────
          1. LINE GRID  (most common Vercel pattern)
          Two repeating linear-gradients: one horizontal, one vertical.
          ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-foreground mb-4 text-lg font-semibold">Line Grid</h2>
        <div
          className="relative rounded-xl border p-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="bg-background/80 text-foreground mx-auto max-w-md rounded-lg border p-6 text-center shadow backdrop-blur">
            Content sits on top of the grid. The grid is just a CSS background&nbsp;pattern.
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          2. DOTTED GRID
          A single radial-gradient repeated in a grid.
          ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-foreground mb-4 text-lg font-semibold">Dotted Grid</h2>
        <div
          className="relative rounded-xl border p-10"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        >
          <div className="bg-background/80 text-foreground mx-auto max-w-md rounded-lg border p-6 text-center shadow backdrop-blur">
            Same idea, but with dots instead of lines. Adjust the&nbsp;
            <code className="bg-muted rounded px-1 text-sm">backgroundSize</code>&nbsp;to control
            spacing.
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          3. DASHED / DOTTED BORDER GRID  (separator style)
          Real CSS grid with dashed borders on each cell.
          This is how Vercel does the "section divider" look.
          ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-foreground mb-4 text-lg font-semibold">
          Border Grid (separator style)
        </h2>
        <div className="grid grid-cols-3 rounded-xl border">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="border-border flex aspect-square items-center justify-center border-dashed p-4 not-nth-[3n]:border-r nth-[-n+6]:border-b"
            >
              <span className="text-muted-foreground text-sm">Cell {i + 1}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          4. FADING GRID  (grid that fades out with a mask)
          Uses a radial mask-image so the grid
          dissolves toward the edges — very Vercel.
          ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-foreground mb-4 text-lg font-semibold">Fading Grid (with mask)</h2>
        <div
          className="relative rounded-xl border p-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)",
          }}
        >
          <div className="flex h-48 items-center justify-center">
            <p className="text-foreground text-lg font-medium">
              The grid fades out toward the edges
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
