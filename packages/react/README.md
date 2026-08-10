# @oleksiimazurenko/react-patterns

A growing collection of **React best practices** — each recipe done with as
little client JavaScript as possible (pure CSS, server-first). Import the whole
set, or a single recipe by subpath so you ship only what you use.

## Install

```sh
npm install @oleksiimazurenko/react-patterns @oleksiimazurenko/patterns-core
```

`patterns-core` holds the framework-agnostic stylesheets each component builds on.

## Recipes

| Import | What it does |
| ------ | ------------ |
| `@oleksiimazurenko/react-patterns/fit-text` | `<FitText>` — text that scales to its container with zero JS. |
| `@oleksiimazurenko/react-patterns/parallax` | `<Parallax>` — scroll parallax with zero JS (`animation-timeline: view()`). |

_More on the way: accordion, slider, analytics (one delegated listener), …_

## fit-text

```tsx
import { FitText } from '@oleksiimazurenko/react-patterns/fit-text'
import '@oleksiimazurenko/patterns-core/fit-text/style.css'

// No props needed — scales to its container with sensible defaults.
<FitText>Learn anything, beautifully</FitText>

// Optional tuning:
<FitText min="2rem" max={72} slope={10}>Learn anything, beautifully</FitText>
```

| Prop    | Default  | Description                                             |
| ------- | -------- | ------------------------------------------------------- |
| `min`   | `2rem`   | Mobile floor. Number → px, string → as-is.             |
| `max`   | `4.5rem` | Desktop ceiling. Number → px, string → as-is.          |
| `slope` | `10`     | Fluid slope — grows this % of the container width.     |
| `as`    | `"div"`  | Container element/tag.                                  |

## parallax

```tsx
import { Parallax } from '@oleksiimazurenko/react-patterns/parallax'
import '@oleksiimazurenko/patterns-core/parallax/style.css'

// Simple: travels ±20px along Y across the viewport, zero JS.
<Parallax amplitude={20}>
  <img src="/hero.jpg" alt="" />
</Parallax>

// Explicit range, horizontal, with a fade:
<Parallax axis="x" from={40} to={-40} opacityFrom={0} opacityTo={1}>
  <Card />
</Parallax>
```

| Prop          | Default | Description                                                       |
| ------------- | ------- | ----------------------------------------------------------------- |
| `amplitude`   | `0`     | Shorthand: travels `+amplitude → -amplitude` px along `axis`.     |
| `axis`        | `"y"`   | Axis of travel (`"x"` or `"y"`).                                  |
| `from` / `to` | —       | Explicit start/end offset in px. Overrides `amplitude`.          |
| `opacityFrom` / `opacityTo` | — | Fade from/to across the scroll range.                     |
| `as`          | `"div"` | Element/tag to render.                                            |

Renders plain server HTML (no `'use client'`). Unsupported browsers (Safari < 26,
Firefox without the flag) and `prefers-reduced-motion` show the element at rest.

## License

MIT © Oleksii Mazurenko
