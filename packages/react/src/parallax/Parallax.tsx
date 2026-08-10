import { type CSSProperties, type ElementType, type ReactNode } from 'react'

/** Parse an `animation-range` string like "cover 0% cover 50%" into its parts. */
function parseRange(range: string | undefined) {
  const m = (range ?? '').trim().match(/^([\w-]+)\s+([\d.]+)%\s+([\w-]+)\s+([\d.]+)%$/)
  return m
    ? { sName: m[1] ?? 'cover', sPct: Number(m[2] ?? 0), eName: m[3] ?? 'cover', ePct: Number(m[4] ?? 50) }
    : { sName: 'cover', sPct: 0, eName: 'cover', ePct: 50 }
}

export interface ParallaxProps {
  /**
   * Shorthand travel in px: the element moves from `+amplitude` (enter) to
   * `-amplitude` (leave) along `axis`. Overridden by explicit `from`/`to`.
   */
  amplitude?: number
  /** Axis of travel. Default "y". */
  axis?: 'x' | 'y'
  /** Explicit start offset in px (viewport enter). Overrides `amplitude`. */
  from?: number
  /** Explicit midpoint offset in px (halfway). Defaults to the mean of from/to. */
  mid?: number
  /** Explicit end offset in px (viewport leave). Overrides `amplitude`. */
  to?: number
  /** Fade from this opacity (enter) … */
  opacityFrom?: number
  /** … through this opacity (halfway) … */
  opacityMid?: number
  /** … to this opacity (leave). */
  opacityTo?: number
  /** Scale from this factor (enter) … */
  scaleFrom?: number
  /** … to this factor (leave). */
  scaleTo?: number
  /** Rotate from this angle in deg (enter) … */
  rotateFrom?: number
  /** … to this angle in deg (leave). */
  rotateTo?: number
  /**
   * Stagger direct children instead of the wrapper: each child animates on its
   * own timeline, its START offset cascading by this % per child (shared END).
   */
  stagger?: number
  /** Native CSS `animation-range`, e.g. "cover 0% cover 100%". */
  range?: string
  /** Native CSS `animation-timing-function`, e.g. "ease-out". */
  easing?: string
  /** Element/tag to render. Default "div". */
  as?: ElementType
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * Scroll parallax with zero runtime JS — a thin wrapper over the pure-CSS
 * `.parallax` recipe. It only sets CSS custom properties, so it renders plain
 * server HTML (no `'use client'`, no hooks, no refs) and is RSC-safe.
 *
 * Requires the stylesheet once in your app:
 * `import '@oleksiimazurenko/patterns-core/parallax/style.css'`
 */
export function Parallax({
  amplitude = 30,
  axis = 'y',
  from,
  mid,
  to,
  opacityFrom,
  opacityMid,
  opacityTo,
  scaleFrom,
  scaleTo,
  rotateFrom,
  rotateTo,
  stagger,
  range,
  easing,
  as: Tag = 'div',
  className,
  style,
  children,
}: ParallaxProps) {
  const start = from ?? amplitude
  const end = to ?? -amplitude
  const middle = mid ?? (start + end) / 2

  const base = stagger !== undefined ? 'parallax-stagger' : 'parallax'
  const cls = className ? `${base} ${className}` : base

  const vars: Record<string, string | number> = {
    '--parallax-from': `${start}px`,
    '--parallax-mid': `${middle}px`,
    '--parallax-to': `${end}px`,
  }

  if (stagger !== undefined) {
    const r = parseRange(range)
    vars['--parallax-stagger'] = `${stagger}%`
    vars['--parallax-stagger-rs-name'] = r.sName
    vars['--parallax-stagger-rs'] = `${r.sPct}%`
    vars['--parallax-stagger-re-name'] = r.eName
    vars['--parallax-stagger-re'] = `${r.ePct}%`
  }

  if (opacityFrom !== undefined || opacityMid !== undefined || opacityTo !== undefined) {
    const of = opacityFrom ?? 1
    const ot = opacityTo ?? 1
    vars['--parallax-opacity-from'] = of
    vars['--parallax-opacity-mid'] = opacityMid ?? (of + ot) / 2
    vars['--parallax-opacity-to'] = ot
  }
  if (scaleFrom !== undefined) vars['--parallax-scale-from'] = scaleFrom
  if (scaleTo !== undefined) vars['--parallax-scale-to'] = scaleTo
  if (rotateFrom !== undefined) vars['--parallax-rotate-from'] = `${rotateFrom}deg`
  if (rotateTo !== undefined) vars['--parallax-rotate-to'] = `${rotateTo}deg`

  const merged: CSSProperties = { ...style, ...(vars as CSSProperties) }
  // Non-stagger: `range` maps to the native single-shorthand property.
  // (Stagger consumes `range` via the CSS vars above, per child.)
  if (range && stagger === undefined) merged.animationRange = range
  if (easing) merged.animationTimingFunction = easing

  return (
    <Tag className={cls} data-axis={axis === 'x' ? 'x' : undefined} style={merged}>
      {children}
    </Tag>
  )
}
