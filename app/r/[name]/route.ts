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
    "scramble-text": {
      file: "components/scramble-text.tsx",
      title: "Scramble Text",
      description: "Text that cycles through random characters before resolving, creating a satisfying decoding effect.",
    },
    "confetti-button": {
      file: "components/confetti-button.tsx",
      title: "Confetti Button",
      description: "A button that bursts confetti from the click position, with physics-based particles that drift and fade.",
    },
    "tilt-card": {
      file: "components/tilt-card.tsx",
      title: "Tilt Card",
      description: "A card that tilts in 3D perspective toward the cursor, with a subtle glare that follows the mouse.",
    },
    "spotlight-card": {
      file: "components/spotlight-card.tsx",
      title: "Spotlight Card",
      description: "A card with a radial light beam that tracks the cursor across its surface, giving a premium holographic feel.",
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
