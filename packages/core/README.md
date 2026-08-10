# @oleksiimazurenko/patterns-core

Framework-agnostic **pure-CSS core** for [react-patterns](https://github.com/oleksiimazurenko/react-patterns) —
a growing collection of front-end recipes done with as little client JavaScript
as possible. Each recipe ships as its own subpath so you import only what you use.

> Using React? Prefer [`@oleksiimazurenko/react-patterns`](https://www.npmjs.com/package/@oleksiimazurenko/react-patterns),
> which wraps these stylesheets in ready-made components.

**[▶ Live demo](https://react-patterns-demo-flax.vercel.app/)** · [GitHub](https://github.com/oleksiimazurenko/react-patterns)

## Recipes

| Import | What it does |
| ------ | ------------ |
| `@oleksiimazurenko/patterns-core/fit-text/style.css` | Text that scales to its container — container-query `cqi` + `clamp()`, zero JS. |
| `@oleksiimazurenko/patterns-core/parallax/style.css` | Scroll parallax via `animation-timeline: view()` — no scroll listener, zero JS. |
| `@oleksiimazurenko/patterns-core/reveal/style.css` | Fade-and-rise reveal on scroll via `view()` timeline — no IntersectionObserver, zero JS. |
| `@oleksiimazurenko/patterns-core/accordion/style.css` | Native `<details>` accordion with smooth `interpolate-size` open/close — zero JS. |
| `@oleksiimazurenko/patterns-core/scroll-progress/style.css` | Page progress bar via `scroll()` — one fixed element, zero JS. |
| `@oleksiimazurenko/patterns-core/sticky-shrink/style.css` | Sticky header that shrinks on scroll via `scroll()` + a progress var — zero JS. |
| `@oleksiimazurenko/patterns-core/slider/style.css` | Carousel — scroll-snap track + CSS Carousel dots & prev/next buttons — zero JS. |

## fit-text

```html
<link rel="stylesheet" href="@oleksiimazurenko/patterns-core/fit-text/style.css" />

<h2 class="fit-text" style="--fit-text-min: 2rem; --fit-text-max: 72px; --fit-text-slope: 10">
  <span class="fit-text__inner">Learn anything, beautifully</span>
</h2>
```

| Property           | Default  | Description                                                  |
| ------------------ | -------- | ------------------------------------------------------------ |
| `--fit-text-min`   | `2rem`   | Mobile floor — the font never goes below this.               |
| `--fit-text-max`   | `4.5rem` | Desktop ceiling — the font never goes above this.            |
| `--fit-text-slope` | `10`     | Fluid slope — the font grows this % of the container width.  |

## License

MIT © Oleksii Mazurenko
