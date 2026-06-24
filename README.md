# Orbit

An open-source component library focused on interaction and physical feel. Copy-paste or install via shadcn.

> **Warning:** This project is in active development. APIs and components may change without notice.

## Getting Started

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Public URL of your deployment (e.g. `https://orbit.example.com`). Used to generate shadcn install commands. |

## Adding a Component

1. Add your component file under `components/`.
2. Register it in `lib/registry.ts`.
3. Add a preview in `lib/previews.tsx`.
4. Create a page under `app/components/<name>/page.tsx`.
5. Add a route handler under `app/r/<name>/route.ts`.

## Tech Stack

- [Next.js](https://nextjs.org) — framework
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Shiki](https://shiki.style) — syntax highlighting
- [shadcn registry](https://ui.shadcn.com/docs/registry) — distribution format
