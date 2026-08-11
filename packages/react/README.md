# @oleksiimazurenko/react-patterns

A growing collection of **React best practices** — each recipe done with as
little client JavaScript as possible (pure CSS, server-first). Import the whole
set, or a single recipe by subpath so you ship only what you use.

**[▶ Live demo](https://react-patterns-demo-flax.vercel.app/)** · [GitHub](https://github.com/oleksiimazurenko/react-patterns)

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
| `@oleksiimazurenko/react-patterns/analytics` | `registerAnalytics` + `trackProps` — one delegated listener, tracked components stay server HTML. |
| `@oleksiimazurenko/react-patterns/scroll-progress` | `<ScrollProgress>` — page progress bar, zero JS. |
| `@oleksiimazurenko/react-patterns/sticky-shrink` | `<StickyShrink>` — sticky header that shrinks on scroll, zero JS. |
| `@oleksiimazurenko/react-patterns/slider` | `<Slider>` — CSS scroll-snap carousel with CSS-only dots & buttons, zero JS. |
| `@oleksiimazurenko/react-patterns/dialog` | `<Dialog>` / `<DialogTrigger>` / `<DialogClose>` — native modal, zero JS. |
| `@oleksiimazurenko/react-patterns/popover` | `<Popover>` / `<PopoverTrigger>` — native menu/dropdown, zero JS. |

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

> **Gotcha — clipping.** Don't wrap a parallax element in an `overflow: hidden`
> ancestor: `hidden` establishes a *scroll container*, so `view()` measures
> progress against that box (which doesn't scroll) instead of the page, and the
> element never moves. Use **`overflow: clip`** to crop the layer — it clips the
> same way but does not create a scroll container, so the timeline stays tied to
> page scroll.

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

## analytics

The moment you add click tracking to a component it usually becomes a client
component and ships JS. Instead: mark elements declaratively with `data-track`,
and handle every event with **one** delegated listener. Tracked components stay
pure server HTML — zero `'use client'`.

Full write-up: [One listener instead of client components](https://oleksiimazurenko.dev/en/blog/one-listener-instead-of-client-components).

**1. Mark elements (Server Components, no `'use client'`):**

```tsx
import { trackProps } from '@oleksiimazurenko/react-patterns/analytics'

<a href={href} {...trackProps('cta_clicked', { place: 'hero', label })}>
  {label}
</a>
// → data-track="cta_clicked" data-track-place="hero" data-track-label="…"
```

**2. Register the single listener once, at app startup.** Lazy-load your SDK
inside `send` so it stays off the critical path:

```ts
import { registerAnalytics } from '@oleksiimazurenko/react-patterns/analytics'

registerAnalytics(async (event, data) => {
  const { track } = await import('@/lib/analytics') // pulled on first interaction
  track(event, data)
})
```

Where to put that one call:

| Runtime | File |
| ------- | ---- |
| **Next.js** | `instrumentation-client.ts` — runs once on the client before app code; no component, no `useEffect` |
| Vite / SPA | `main.ts` |
| Plain HTML | a `<script>` |

`registerAnalytics(send, options?)` attaches a single `click` listener (delegated
via `closest('[data-track]')`) and, unless `toggle: false`, a capture-phase
`toggle` listener so a `<details data-track>` fires when it opens. It returns a
cleanup function. `send(event, data, el)` receives the `data-track` value and the
`data-track-*` payload (`data-track-place` → `data.place`).

## scroll-progress

```tsx
import { ScrollProgress } from '@oleksiimazurenko/react-patterns/scroll-progress'
import '@oleksiimazurenko/patterns-core/scroll-progress/style.css'

// Put it once near the root of your app.
<ScrollProgress className="text-emerald-400" height={3} />
```

| Prop | Default | Description |
| ---- | ------- | ----------- |
| `position` | `"top"` | Which edge to pin the bar to (`"top"` / `"bottom"`). |
| `height` | `3` | Bar thickness (number → px). |
| `color` | `currentColor` | Bar color (or set a text color on it, as above). |

One fixed `<div>`, no `'use client'`. Mirrors the scrollbar, so it stays active
under `prefers-reduced-motion`; unsupported browsers just don't show it.

## sticky-shrink

```tsx
import { StickyShrink } from '@oleksiimazurenko/react-patterns/sticky-shrink'
import '@oleksiimazurenko/patterns-core/sticky-shrink/style.css'

<StickyShrink from={96} to={56} distance={180}>
  <Logo style={{ scale: 'calc(1 - 0.25 * var(--sticky-shrink-progress))' }} />
  <nav>…</nav>
</StickyShrink>
```

| Prop | Default | Description |
| ---- | ------- | ----------- |
| `from` | `80` | Full (tall) height in px. |
| `to` | `56` | Shrunk height in px. |
| `distance` | `200` | Scroll distance (px) over which it shrinks. |
| `as` | `"header"` | Element/tag to render. |

Renders server HTML (no `'use client'`). Children inherit `--sticky-shrink-progress`
(0 → 1) so they can react in step. Uses the nearest scroll container, so it works
as a page header or inside a scrollable box. Stays full height under
`prefers-reduced-motion`.

## slider

```tsx
import { Slider } from '@oleksiimazurenko/react-patterns/slider'
import '@oleksiimazurenko/patterns-core/slider/style.css'

<Slider itemSize="70%" gap="1rem" className="text-emerald-400">
  {slides.map((s) => (
    <li key={s.id}>{/* your slide */}</li>
  ))}
</Slider>
```

| Prop | Default | Description |
| ---- | ------- | ----------- |
| `itemSize` | `85%` | Flex-basis of each slide (e.g. `"70%"`, `"20rem"`). |
| `gap` | `1rem` | Gap between slides. |
| `dotColor` | `currentColor` | Color of the pagination dots. |
| `snapStop` | `"always"` | `"always"` makes a swipe advance one slide at a time; `"normal"` lets a fling pass multiple. |
| `snapAlign` | `"start"` | Where slides snap: `"start"` (multi-slide rows), `"center"` (single slide + peek), `"end"`. |
| `as` | `"ul"` | Element/tag for the track. |

**Slides-per-view** is just `itemSize` (`--slider-item`): a fraction like `"33.333%"`
shows 3, a fixed width like `"18rem"` shows as many as fit, or set it responsively
per breakpoint (`[--slider-item:84%] sm:[--slider-item:46%]`).

**Arrow step:** a `::scroll-button` scrolls by a page (that distance is
browser-controlled, not settable in CSS). So the arrows advance **one slide when
one is shown** (single-slide carousel with a peek) and **page the group when
several are shown** — the platform's scroll-button behavior. Swipe and dots are
always one-at-a-time.

The track is CSS scroll-snap — swipe/trackpad works everywhere, no `'use client'`.
The pagination dots (with an active state) and the prev/next buttons are the CSS
Carousel pseudo-elements (`::scroll-marker`, `::scroll-button`); clicking a button
scrolls the track natively, so they're zero-JS too. They need Chrome 135+, and
elsewhere the track still snaps.

> A carousel is the one place pure CSS can't fully match a JS library — no
> pointer-drag with momentum, no infinite loop, no autoplay. For those, reach for
> [Embla](https://www.embla-carousel.com/). This recipe covers snap + native
> swipe + CSS dots & buttons.

## dialog

```tsx
import { Dialog, DialogTrigger, DialogClose } from '@oleksiimazurenko/react-patterns/dialog'
import '@oleksiimazurenko/patterns-core/dialog/style.css'

<DialogTrigger target="hello">Open</DialogTrigger>

<Dialog id="hello">
  <h2>Native dialog</h2>
  <p>Modal, backdrop, Esc and focus are all the browser's.</p>
  <DialogClose target="hello">Close</DialogClose>
</Dialog>
```

Opened/closed by the HTML **invoker commands** (`command="show-modal"` /
`command="close"` with `commandfor`), so there's **no `onClick`** — zero JS.
The modal, backdrop, Esc-to-close and focus trap are native. **Clicking the
backdrop closes it too**, natively, via the `closedby="any"` attribute (the
default here) — still zero JS. The enter/exit animation is pure CSS
(`@starting-style`). Invoker commands need Chrome 135+, `closedby` Chrome 134+.
Style via `--dialog-bg` / `--dialog-fg` / `--dialog-border` / `--dialog-radius` /
`--dialog-backdrop` (or a `className`).

## popover

```tsx
import { Popover, PopoverTrigger } from '@oleksiimazurenko/react-patterns/popover'
import '@oleksiimazurenko/patterns-core/popover/style.css'

<PopoverTrigger target="menu">Open menu ▾</PopoverTrigger>

<Popover id="menu">
  <button>Profile</button>
  <button>Settings</button>
  <button>Sign out</button>
</Popover>
```

The native **Popover API** (`popovertarget` + `popover`): toggle, click-outside
dismiss and the top layer are native, so it's **zero JS**. It auto-anchors to its
trigger (implicit anchor) and is placed with CSS anchor positioning; the
animation is pure CSS. The Popover API is widely supported; anchor positioning
needs Chrome 125+ (without it the popover still opens, just centered). Style via
`--popover-bg` / `--popover-fg` / `--popover-border` / `--popover-area` (placement,
e.g. `top`, `bottom span-left`) / `--popover-gap`.

## License

MIT © Oleksii Mazurenko
