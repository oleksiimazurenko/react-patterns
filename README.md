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
| **slider** | 🚧 planned | Carousel with CSS scroll-snap — no library. |
| **analytics** | 🚧 planned | One delegated `document` listener + `data-*` contracts — components stay server HTML. |

## Develop

```sh
pnpm install
pnpm build       # turbo → builds every package
pnpm typecheck
```

Monorepo: pnpm workspaces + Turborepo + Changesets.

### Add a recipe

1. `packages/core/<recipe>/style.css` (pure CSS) + a subpath export in `packages/core/package.json`.
2. `packages/react/src/<recipe>/` (component + `index.ts`), add its entry to `tsup.config.ts` and a subpath export in `packages/react/package.json`.
3. Re-export it from `packages/react/src/index.ts`.

## Credits

The **parallax** recipe uses the CSS `animation-timeline: view()` technique
popularized by [`@ouvarov/scroll-parallax`](https://www.npmjs.com/package/@ouvarov/scroll-parallax)
(MIT, by Oleksandr Uvarov). The implementation here is written from scratch; if
you need a full-featured, battle-tested version, use that package directly.

## License

MIT © Oleksii Mazurenko
