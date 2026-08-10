<img src="logo.svg" alt="react-patterns" width="60" height="60" />

# react-patterns

A growing collection of **React best practices** — each recipe done with as
little client JavaScript as possible: pure CSS where a stylesheet is enough,
server-first where markup is enough, and a single delegated listener where the
whole page would otherwise ship islands of JS.

The idea: most things people reach for a library or a `"use client"` component
for are, underneath, a layout or an event-delegation concern. Solve them at that
level and the JavaScript cost disappears — correct on first paint, no hydration,
works during SSR.

## Packages

| Package | Description |
| ------- | ----------- |
| [`@oleksiimazurenko/patterns-core`](packages/core) | Framework-agnostic pure-CSS building blocks. One subpath per recipe. |
| [`@oleksiimazurenko/react-patterns`](packages/react) | React components over the core. One subpath per recipe. |

## Recipes

| Recipe | Status | Idea |
| ------ | ------ | ---- |
| **fit-text** | ✅ ready | Text scales to its container — container-query `cqi` + `clamp()`, zero JS. |
| **parallax** | ✅ ready | Scroll parallax with `animation-timeline: view()` — no scroll listener, no JS. |
| **reveal** | ✅ ready | Fade-and-rise into view on scroll — `view()` timeline, no IntersectionObserver, no JS. |
| **accordion** | ✅ ready | Native `<details>` + `interpolate-size` smooth open/close; exclusive via `name` — no state, no JS. |
| **slider** | ✅ ready | Carousel — CSS scroll-snap track + CSS Carousel dots & prev/next buttons, zero JS (controls need Chrome 135+). |
| **scroll-progress** | ✅ ready | Page progress bar driven by `scroll()` — one fixed element, no listener. |
| **sticky-shrink** | ✅ ready | Sticky header that shrinks on scroll (`scroll()` + a registered progress var). |
| **analytics** | ✅ ready | One delegated `document` listener + `data-*` contracts — components stay server HTML. |

## Demo

A live showcase of every recipe lives in [`apps/demo`](apps/demo) — built to
double as a Next.js 16 best-practices reference:

- **Next.js 16** App Router on **Turbopack**
- **React Compiler** (auto-memoization)
- **Cache Components** — Partial Prerendering + the `use cache` directive
- **`proxy.ts`** (the Next 16 rename of `middleware.ts`)
- **Tailwind CSS v4** + **oxlint**

The analytics recipe is wired the idiomatic way — one `registerAnalytics` call in
`instrumentation-client.ts`, no component.

```sh
pnpm dev     # turbo → runs apps/demo at http://localhost:3000
```

## Develop

```sh
pnpm install
pnpm build       # turbo → builds every package + the demo
pnpm typecheck
pnpm lint        # oxlint
```

Monorepo: pnpm workspaces + Turborepo + Changesets. Library code lives in
`packages/*`; the demo app in `apps/*` (its Next/Tailwind deps never leak into
the published packages).

### Add a recipe

1. `packages/core/<recipe>/style.css` (pure CSS) + a subpath export in `packages/core/package.json`.
2. `packages/react/src/<recipe>/` (component + `index.ts`), add its entry to `tsup.config.ts` and a subpath export in `packages/react/package.json`.
3. Re-export it from `packages/react/src/index.ts`.

## Credits

The **parallax**, **scroll-progress** and **sticky-shrink** recipes build on the
CSS scroll-driven animation techniques (`animation-timeline: view()` / `scroll()`)
popularized by [`@ouvarov/scroll-parallax`](https://www.npmjs.com/package/@ouvarov/scroll-parallax)
(MIT, by Oleksandr Uvarov). The implementations here are written from scratch; if
you need a full-featured, battle-tested version, use that package directly.

## License

MIT © Oleksii Mazurenko
