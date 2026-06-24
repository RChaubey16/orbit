import { readFileSync } from "fs";
import { join } from "path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  if (name !== "keyboard-button") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const content = readFileSync(
    join(process.cwd(), "components/button.tsx"),
    "utf-8"
  );

  return Response.json({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "keyboard-button",
    type: "registry:ui",
    title: "Keyboard Button",
    description:
      "A button that looks and feels like a mechanical keyboard key, with visual depth and a satisfying click sound.",
    files: [
      {
        path: "components/keyboard-button.tsx",
        content,
        type: "registry:ui",
        target: "components/keyboard-button.tsx",
      },
    ],
  });
}
