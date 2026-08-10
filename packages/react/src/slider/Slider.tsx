import { type CSSProperties, type ElementType, type ReactNode } from 'react'

export interface SliderProps {
  /** Flex-basis of each slide, e.g. "85%", "20rem". Default 85%. */
  itemSize?: string
  /** Gap between slides. Default 1rem. */
  gap?: string
  /** Color of the pagination dots. Defaults to `currentColor`. */
  dotColor?: string
  /**
   * Whether every slide is a mandatory snap stop. `"always"` (default) advances
   * one slide per button click / swipe even when several are visible; `"normal"`
   * lets a fling pass multiple.
   */
  snapStop?: 'always' | 'normal'
  /** Element/tag for the track. Default "ul". */
  as?: ElementType
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * A zero-JS carousel — a thin wrapper over the pure-CSS `.slider` recipe. The
 * track is CSS scroll-snap; dots and prev/next buttons come from CSS Carousel
 * pseudo-elements. It only sets CSS custom properties, so it renders plain
 * server HTML (no `'use client'`). Each child is a slide.
 *
 * Requires the stylesheet once in your app:
 * `import '@oleksiimazurenko/patterns-core/slider/style.css'`
 */
export function Slider({
  itemSize,
  gap,
  dotColor,
  snapStop,
  as: Tag = 'ul',
  className,
  style,
  children,
}: SliderProps) {
  const vars: Record<string, string> = {}
  if (itemSize) vars['--slider-item'] = itemSize
  if (gap) vars['--slider-gap'] = gap
  if (dotColor) vars['--slider-dot'] = dotColor
  if (snapStop) vars['--slider-snap-stop'] = snapStop

  return (
    <Tag
      className={className ? `slider ${className}` : 'slider'}
      style={{ ...style, ...(vars as CSSProperties) }}
    >
      {children}
    </Tag>
  )
}
