import { type CSSProperties, type ElementType, type ReactNode } from 'react'

export interface RevealProps {
  /** How far (px) the element rises from as it enters. Default 24. */
  distance?: number
  /** Initial scale it grows from as it enters. Default 0.96. */
  scale?: number
  /** Native CSS `animation-range`. Default "entry 0% cover 25%". */
  range?: string
  /** Native CSS `animation-timing-function`. Default "linear". */
  easing?: string
  /** Element/tag to render. Default "div". */
  as?: ElementType
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * Fade-and-rise reveal on scroll with zero runtime JS — a thin wrapper over the
 * pure-CSS `.reveal` recipe. It only sets CSS custom properties, so it renders
 * plain server HTML (no `'use client'`, no hooks, no refs) and is RSC-safe.
 *
 * Requires the stylesheet once in your app:
 * `import '@oleksiimazurenko/patterns-core/reveal/style.css'`
 */
export function Reveal({
  distance,
  scale,
  range,
  easing,
  as: Tag = 'div',
  className,
  style,
  children,
}: RevealProps) {
  const vars: Record<string, string | number> = {}
  if (distance !== undefined) vars['--reveal-distance'] = `${distance}px`
  if (scale !== undefined) vars['--reveal-scale'] = scale

  const merged: CSSProperties = { ...style, ...(vars as CSSProperties) }
  if (range) merged.animationRange = range
  if (easing) merged.animationTimingFunction = easing

  return (
    <Tag className={className ? `reveal ${className}` : 'reveal'} style={merged}>
      {children}
    </Tag>
  )
}
