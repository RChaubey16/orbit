# Orbit

An open-source component library focused on interaction and physical feel. Copy-paste or install via shadcn.

> **Note:** This project is in active development. APIs and components may change without notice.

## Components

| Component | Description |
|---|---|
| [Keyboard Button](http://localhost:3000/components/keyboard-button) | A button that looks and feels like a mechanical keyboard key, with visual depth and a satisfying click sound. |
| [Scramble Text](http://localhost:3000/components/scramble-text) | Text that cycles through random characters before resolving, creating a satisfying decoding effect. |
| [Confetti Button](http://localhost:3000/components/confetti-button) | A button that bursts confetti from the click position, with physics-based particles that drift and fade. |
| [Tilt Card](http://localhost:3000/components/tilt-card) | A card that tilts in 3D perspective toward the cursor, with a subtle glare that follows the mouse. |

## Installation

Each component can be installed via the shadcn CLI:

```bash
npx shadcn@latest add <ORBIT_URL>/r/<component-name>
```

For example:

```bash
npx shadcn@latest add http://localhost:3000/r/keyboard-button
```

Or copy the source directly from each component's page.

## Running Locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Public URL of your deployment (e.g. `https://orbit.example.com`). Used to generate shadcn install commands. |

## Adding a Component

1. Create the component file under `components/<name>.tsx`.
2. Register it in `lib/registry.ts`.
3. Add a preview in `components/component-preview.tsx`.
4. Create a docs page at `app/components/<name>/page.tsx`.
5. Add the registry entry in `app/r/[name]/route.ts`.

## Tech Stack

- [Next.js](https://nextjs.org) — framework
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Motion](https://motion.dev) — animations
- [Shiki](https://shiki.style) — syntax highlighting
- [shadcn registry](https://ui.shadcn.com/docs/registry) — distribution format
