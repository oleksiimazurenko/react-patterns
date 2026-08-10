import { type CSSProperties, type ElementType, type ReactNode } from 'react'

const px = (v: number): string => `${v}px`

export interface ParallaxProps {
  /**
   * Shorthand travel in px: the element moves from `+amplitude` as it enters to
   * `-amplitude` as it leaves (along `axis`). Overridden by explicit `from`/`to`.
   */
  amplitude?: number
  /** Axis of travel. Default "y". */
  axis?: 'x' | 'y'
  /** Explicit start offset in px (at viewport enter). Overrides `amplitude`. */
  from?: number
  /** Explicit end offset in px (at viewport leave). Overrides `amplitude`. */
  to?: number
  /** Fade from this opacity (at enter) … */
  opacityFrom?: number
  /** … to this opacity (at leave). */
  opacityTo?: number
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
  amplitude = 0,
  axis = 'y',
  from,
  to,
  opacityFrom,
  opacityTo,
  as: Tag = 'div',
  className,
  style,
  children,
}: ParallaxProps) {
  const start = from ?? amplitude
  const end = to ?? -amplitude

  const vars = {
    [`--parallax-${axis}-from`]: px(start),
    [`--parallax-${axis}-to`]: px(end),
    ...(opacityFrom !== undefined && { '--parallax-opacity-from': String(opacityFrom) }),
    ...(opacityTo !== undefined && { '--parallax-opacity-to': String(opacityTo) }),
  } as CSSProperties

  return (
    <Tag
      className={className ? `parallax ${className}` : 'parallax'}
      style={{ ...vars, ...style }}
    >
      {children}
    </Tag>
  )
}
