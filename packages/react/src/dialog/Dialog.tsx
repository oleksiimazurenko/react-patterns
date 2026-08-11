import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type DialogHTMLAttributes,
  type ReactNode,
} from 'react'

// `command` / `commandfor` are the native HTML invoker attributes (Chrome 135+).
// Passed as lowercase so React renders them verbatim on any version.
function invoker(command: string, target: string): ButtonHTMLAttributes<HTMLButtonElement> {
  return { command, commandfor: target } as unknown as ButtonHTMLAttributes<HTMLButtonElement>
}

export interface DialogProps {
  /** Unique id — referenced by triggers/close buttons via `target`. */
  id: string
  /**
   * Native light-dismiss: `"any"` (default) closes on backdrop click **or** Esc,
   * `"closerequest"` on Esc only, `"none"` neither. Zero JS. (Chrome 134+.)
   */
  closedby?: 'any' | 'closerequest' | 'none'
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * A native modal `<dialog>` — opened/closed by `<DialogTrigger>` / `<DialogClose>`
 * through the HTML invoker commands, so it ships zero JS. Backdrop, Esc-to-close,
 * focus trapping and the top layer are the browser's; the animation is pure CSS.
 *
 * Requires the stylesheet once in your app:
 * `import '@oleksiimazurenko/patterns-core/dialog/style.css'`
 */
export function Dialog({ id, closedby = 'any', className, style, children }: DialogProps) {
  return (
    <dialog
      id={id}
      className={className ? `dialog ${className}` : 'dialog'}
      style={style}
      {...({ closedby } as unknown as DialogHTMLAttributes<HTMLDialogElement>)}
    >
      {children}
    </dialog>
  )
}

export interface DialogTriggerProps {
  /** The `id` of the `<Dialog>` to open. */
  target: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** A button that opens the dialog `target` as a modal — native, no `onClick`. */
export function DialogTrigger({ target, className, style, children }: DialogTriggerProps) {
  return (
    <button type="button" className={className} style={style} {...invoker('show-modal', target)}>
      {children}
    </button>
  )
}

export interface DialogCloseProps {
  /** The `id` of the `<Dialog>` to close. */
  target: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** A button that closes the dialog `target` — native, no `onClick`. */
export function DialogClose({ target, className, style, children }: DialogCloseProps) {
  return (
    <button type="button" className={className} style={style} {...invoker('close', target)}>
      {children}
    </button>
  )
}
