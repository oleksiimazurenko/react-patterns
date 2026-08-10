import { type CSSProperties, type ElementType, type ReactNode } from 'react'

const toSize = (v: number | string | undefined): string | undefined =>
  v === undefined ? undefined : typeof v === 'number' ? `${v}px` : v

export interface FitTextProps {
  /** Minimum font size — the mobile floor. Number → px, string → as-is. Default 2rem. */
  min?: number | string
  /** Maximum font size — the desktop ceiling. Number → px, string → as-is. Default 4.5rem. */
  max?: number | string
  /** Fluid slope: font grows this % of the container's width (cqi). Default 10. */
  slope?: number
  /** Container element/tag. Default "div". */
  as?: ElementType
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * Text that scales to its container with pure CSS — zero runtime JS.
 *
 * The outer element is the query container; the inner `<span>` reads `cqi`
 * from it and clamps between `min` and `max`. Long words break and hyphenate
 * by the document's `lang`, so nothing ever overflows. No hooks, no measuring,
 * no layout shift after hydration.
 *
 * Requires the stylesheet once in your app:
 * `import '@oleksiimazurenko/patterns-core/fit-text/style.css'`
 */
export function FitText({
  min,
  max,
  slope,
  as: Tag = 'div',
  className,
  style,
  children,
}: FitTextProps) {
  const vars = {
    ...(toSize(min) !== undefined && { '--fit-text-min': toSize(min) }),
    ...(toSize(max) !== undefined && { '--fit-text-max': toSize(max) }),
    ...(slope !== undefined && { '--fit-text-slope': String(slope) }),
  } as CSSProperties

  return (
    <Tag
      className={className ? `fit-text ${className}` : 'fit-text'}
      style={{ ...vars, ...style }}
    >
      <span className="fit-text__inner">{children}</span>
    </Tag>
  )
}
