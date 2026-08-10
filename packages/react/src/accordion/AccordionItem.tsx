import { type ReactNode } from 'react'

export interface AccordionItemProps {
  /** The always-visible header (the clickable question/label). */
  title: ReactNode
  /** Open on first render. */
  defaultOpen?: boolean
  /**
   * Native `<details name>` group. Usually injected by a parent `<Accordion name>`;
   * set it directly only when using items without the wrapper.
   */
  name?: string
  className?: string
  children?: ReactNode
}

/**
 * One accordion row — a native <details> with a styled <summary>. The smooth
 * open/close and the chevron come entirely from the `.accordion-*` stylesheet;
 * this ships zero JS.
 *
 * Requires the stylesheet once in your app:
 * `import '@oleksiimazurenko/patterns-core/accordion/style.css'`
 */
export function AccordionItem({
  title,
  defaultOpen,
  name,
  className,
  children,
}: AccordionItemProps) {
  return (
    <details
      className={className ? `accordion-item ${className}` : 'accordion-item'}
      name={name}
      open={defaultOpen}
    >
      <summary className="accordion-summary">{title}</summary>
      <div className="accordion-content">{children}</div>
    </details>
  )
}
