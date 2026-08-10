import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from 'react'

export interface AccordionProps {
  /**
   * Group name. When set, all items share it as the native `<details name>`, so
   * only one opens at a time (exclusive accordion). Omit for independent items
   * (any number open at once). Must be unique per accordion on the page.
   */
  name?: string
  /** Element/tag for the wrapper. Default "div". */
  as?: ElementType
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * Zero-JS accordion wrapper over native <details>. When `name` is set, it
 * injects that name into each <AccordionItem> child so the browser keeps them
 * mutually exclusive — no state, no handlers, no `'use client'`.
 */
export function Accordion({
  name,
  as: Tag = 'div',
  className,
  style,
  children,
}: AccordionProps) {
  const items = name
    ? Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<{ name?: string }>, { name })
          : child,
      )
    : children

  return (
    <Tag className={className ? `accordion ${className}` : 'accordion'} style={style}>
      {items}
    </Tag>
  )
}
