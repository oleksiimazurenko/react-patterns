# demo

Live showcase of the `react-patterns` recipes, and a Next.js 16 best-practices
reference.

- **Next.js 16** (App Router) on **Turbopack**
- **React Compiler** — automatic memoization (`reactCompiler: true`)
- **Cache Components** — Partial Prerendering + `use cache` (`cacheComponents: true`)
- **`proxy.ts`** — the Next 16 rename of `middleware.ts`
- **Tailwind CSS v4** (`@tailwindcss/postcss`) + **oxlint**
- Analytics wired via `instrumentation-client.ts` (one delegated listener, no component)

The recipes are consumed from the workspace (`workspace:*`), so the demo always
runs against the local library source.

```sh
pnpm dev        # http://localhost:3000
pnpm build
pnpm lint       # oxlint
pnpm typecheck
```
