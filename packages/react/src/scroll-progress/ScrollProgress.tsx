import { type CSSProperties } from 'react'

export interface ScrollProgressProps {
  /** Which edge to pin the bar to. Default "top". */
  position?: 'top' | 'bottom'
  /** Bar thickness. Number → px. Default 3px. */
  height?: number | string
  /** Bar color. Defaults to `currentColor` (set a text color on it instead). */
  color?: string
  className?: string
  style?: CSSProperties
}

/**
 * A page scroll-progress bar with zero runtime JS — a thin wrapper over the
 * pure-CSS `.scroll-progress` recipe (driven by `scroll()`). Renders a single
 * fixed `<div>`; no `'use client'`, no scroll listener.
 *
 * Requires the stylesheet once in your app:
 * `import '@oleksiimazurenko/patterns-core/scroll-progress/style.css'`
 */
export function ScrollProgress({
  position = 'top',
  height,
  color,
  className,
  style,
}: ScrollProgressProps) {
  const vars: Record<string, string> = {}
  if (height !== undefined) vars['--scroll-progress-height'] = typeof height === 'number' ? `${height}px` : height
  if (color) vars['--scroll-progress-color'] = color

  return (
    <div
      aria-hidden="true"
      data-position={position}
      className={className ? `scroll-progress ${className}` : 'scroll-progress'}
      style={{ ...style, ...(vars as CSSProperties) }}
    />
  )
}
