import { type CSSProperties, type ReactNode } from 'react'

export interface PopoverProps {
  /** Unique id — referenced by `<PopoverTrigger target>`. */
  id: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * A native popover (menu / dropdown / tooltip) — opened by `<PopoverTrigger>`
 * via the Popover API, so it ships zero JS. Toggle, light-dismiss and the top
 * layer are the browser's; it auto-anchors to its trigger and the animation is
 * pure CSS.
 *
 * Requires the stylesheet once in your app:
 * `import '@oleksiimazurenko/patterns-core/popover/style.css'`
 */
export function Popover({ id, className, style, children }: PopoverProps) {
  return (
    <div
      id={id}
      popover="auto"
      className={className ? `popover ${className}` : 'popover'}
      style={style}
    >
      {children}
    </div>
  )
}

export interface PopoverTriggerProps {
  /** The `id` of the `<Popover>` to toggle. */
  target: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** A button that toggles the popover `target` — native, no `onClick`. */
export function PopoverTrigger({ target, className, style, children }: PopoverTriggerProps) {
  return (
    <button type="button" popoverTarget={target} className={className} style={style}>
      {children}
    </button>
  )
}
