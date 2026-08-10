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

_More on the way: parallax, accordion, slider, analytics (one delegated listener), …_

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

## License

MIT © Oleksii Mazurenko
