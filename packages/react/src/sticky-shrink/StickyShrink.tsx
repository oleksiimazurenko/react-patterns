import { type CSSProperties, type ElementType, type ReactNode } from 'react'

const len = (v: number | string): string => (typeof v === 'number' ? `${v}px` : v)

export interface StickyShrinkProps {
  /** Full (tall) height. Number → px. Default 80px. */
  from?: number | string
  /** Shrunk height. Number → px. Default 56px. */
  to?: number | string
  /** Scroll distance over which it shrinks. Number → px. Default 200px. */
  distance?: number | string
  /** Element/tag to render. Default "header". */
  as?: ElementType
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * A sticky header that shrinks on scroll with zero runtime JS — a thin wrapper
 * over the pure-CSS `.sticky-shrink` recipe. It only sets CSS custom properties,
 * so it renders plain server HTML (no `'use client'`). Children can read
 * `--sticky-shrink-progress` (0 → 1) to react in step (e.g. scale a logo).
 *
 * Requires the stylesheet once in your app:
 * `import '@oleksiimazurenko/patterns-core/sticky-shrink/style.css'`
 */
export function StickyShrink({
  from,
  to,
  distance,
  as: Tag = 'header',
  className,
  style,
  children,
}: StickyShrinkProps) {
  const vars: Record<string, string> = {}
  if (from !== undefined) vars['--sticky-shrink-from'] = len(from)
  if (to !== undefined) vars['--sticky-shrink-to'] = len(to)
  if (distance !== undefined) vars['--sticky-shrink-distance'] = len(distance)

  return (
    <Tag
      className={className ? `sticky-shrink ${className}` : 'sticky-shrink'}
      style={{ ...style, ...(vars as CSSProperties) }}
    >
      {children}
    </Tag>
  )
}
