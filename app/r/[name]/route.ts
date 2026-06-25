import { readFileSync } from "fs";
import { join } from "path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  const registry: Record<string, { file: string; title: string; description: string }> = {
    "keyboard-button": {
      file: "components/button.tsx",
      title: "Keyboard Button",
      description: "A button that looks and feels like a mechanical keyboard key, with visual depth and a satisfying click sound.",
    },
    "magnetic-button": {
      file: "components/magnetic-button.tsx",
      title: "Magnetic Button",
      description: "A button that pulls toward the cursor and springs back, creating a satisfying magnetic attraction effect.",
    },
    "confetti-button": {
      file: "components/confetti-button.tsx",
      title: "Confetti Button",
      description: "A button that bursts confetti from the click position, with physics-based particles that drift and fade.",
    },
  };

  const entry = registry[name];
  if (!entry) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const content = readFileSync(join(process.cwd(), entry.file), "utf-8");

  return Response.json({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:ui",
    title: entry.title,
    description: entry.description,
    files: [
      {
        path: `components/${name}.tsx`,
        content,
        type: "registry:ui",
        target: `components/${name}.tsx`,
      },
    ],
  });
}
