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
| `@oleksiimazurenko/react-patterns/reveal` | `<Reveal>` — fade-and-rise into view on scroll, zero JS. |
| `@oleksiimazurenko/react-patterns/accordion` | `<Accordion>` / `<AccordionItem>` — native `<details>`, smooth, exclusive, zero JS. |

_More on the way: slider, analytics (one delegated listener), …_

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

// Simple: travels ±30px along Y across the viewport, zero JS.
<Parallax amplitude={30}>
  <img src="/hero.jpg" alt="" />
</Parallax>

// Horizontal, explicit range, with a fade + scale:
<Parallax axis="x" from={40} to={-40} opacityFrom={0} opacityTo={1} scaleFrom={0.9} scaleTo={1}>
  <Card />
</Parallax>

// Stagger direct children (each animates on its own timeline, cascading start):
<Parallax stagger={8} amplitude={24}>
  {items.map((i) => <Item key={i.id} {...i} />)}
</Parallax>
```

| Prop | Default | Description |
| ---- | ------- | ----------- |
| `amplitude` | `30` | Shorthand: travels `+amplitude → -amplitude` px along `axis`. |
| `axis` | `"y"` | Axis of travel (`"x"` or `"y"`). |
| `from` / `mid` / `to` | — | Explicit start / midpoint / end offset in px. Override `amplitude`. |
| `opacityFrom` / `opacityMid` / `opacityTo` | — | Fade across the scroll range. |
| `scaleFrom` / `scaleTo` | — | Scale across the scroll range. |
| `rotateFrom` / `rotateTo` | — | Rotate (deg) across the scroll range. |
| `stagger` | — | Animate direct children instead; start offset cascades this % per child. |
| `range` | `cover 0% cover 100%` | Native CSS `animation-range`. |
| `easing` | `linear` | Native CSS `animation-timing-function`. |
| `as` | `"div"` | Element/tag to render. |

Renders plain server HTML (no `'use client'`). Unsupported browsers (Safari < 26,
Firefox without the flag) and `prefers-reduced-motion` show the element at rest —
no jump, no cleanup rule needed (the animation is gated behind `@supports`).

## reveal

```tsx
import { Reveal } from '@oleksiimazurenko/react-patterns/reveal'
import '@oleksiimazurenko/patterns-core/reveal/style.css'

// Fades and rises into place as it scrolls into view — zero JS.
<Reveal>
  <Card />
</Reveal>

// Tune the entrance:
<Reveal distance={40} scale={0.9} range="entry 0% cover 40%">
  <Section />
</Reveal>
```

| Prop | Default | Description |
| ---- | ------- | ----------- |
| `distance` | `24` | How far (px) the element rises from as it enters. |
| `scale` | `0.96` | Initial scale it grows from. |
| `range` | `entry 0% cover 25%` | Native CSS `animation-range`. |
| `easing` | `linear` | Native CSS `animation-timing-function`. |
| `as` | `"div"` | Element/tag to render. |

Renders plain server HTML (no `'use client'`). The hidden state lives only in
the keyframes, so unsupported browsers and `prefers-reduced-motion` show the
content fully visible in place — it never stays hidden.

## accordion

```tsx
import { Accordion, AccordionItem } from '@oleksiimazurenko/react-patterns/accordion'
import '@oleksiimazurenko/patterns-core/accordion/style.css'

// `name` makes it exclusive (only one open at a time) — native, no JS.
<Accordion name="faq">
  <AccordionItem title="What is this?">A pure-CSS accordion.</AccordionItem>
  <AccordionItem title="Does it ship JS?" defaultOpen>No — native <details>.</AccordionItem>
</Accordion>

// Omit `name` to allow multiple open at once.
<Accordion>
  <AccordionItem title="One">…</AccordionItem>
  <AccordionItem title="Two">…</AccordionItem>
</Accordion>
```

**`<Accordion>`** — `name?` (exclusive group), `as`, `className`, `style`.
**`<AccordionItem>`** — `title` (header), `defaultOpen?`, `name?` (usually injected by the parent), `className`.

Open/close, exclusivity and the smooth `interpolate-size` animation are all
native/CSS — zero `'use client'`. Browsers without `interpolate-size` /
`::details-content` just open instantly.

## License

MIT © Oleksii Mazurenko
