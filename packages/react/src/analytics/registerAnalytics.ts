export type TrackData = Record<string, string>

/** Called for every tracked interaction. `event` is the `data-track` value. */
export type Send = (event: string, data: TrackData, el: HTMLElement) => void

export interface RegisterAnalyticsOptions {
  /**
   * Also fire when a `<details data-track>` opens. `toggle` doesn't bubble, so
   * it's listened for in the capture phase. Default true.
   */
  toggle?: boolean
  /** Root to attach the listener to. Default `document`. */
  root?: Document | HTMLElement
}

/** Read `data-track` (event) + all `data-track-*` (payload) off an element. */
function collect(el: HTMLElement): { event: string | undefined; data: TrackData } {
  const ds = el.dataset
  const data: TrackData = {}
  for (const k in ds) {
    if (k === 'track' || !k.startsWith('track')) continue
    const rest = k.slice('track'.length) // "trackPlace" -> "Place"
    const key = rest.charAt(0).toLowerCase() + rest.slice(1) // -> "place"
    if (ds[k] !== undefined) data[key] = ds[k] as string
  }
  return { event: ds.track, data }
}

/**
 * Install ONE delegated listener that turns declarative `data-track` attributes
 * into analytics events. Because tracking lives in the markup — not in a
 * handler — the tracked components stay pure server HTML with no per-component
 * `'use client'`. Call this once, from a single client boundary in your app
 * (e.g. a root `useEffect`), and lazy-load your analytics SDK inside `send`
 * to keep it off the critical path.
 *
 * Returns a cleanup function that removes the listener.
 *
 * @see https://oleksiimazurenko.dev/en/blog/one-listener-instead-of-client-components
 */
export function registerAnalytics(
  send: Send,
  options: RegisterAnalyticsOptions = {},
): () => void {
  const { toggle = true, root = document } = options

  const onClick = (e: Event) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]')
    if (!el) return
    const { event, data } = collect(el)
    if (event) send(event, data, el)
  }

  const onToggle = (e: Event) => {
    const el = e.target as HTMLElement | null
    if (!(el instanceof HTMLDetailsElement) || !el.open) return
    const tracked = el.closest<HTMLElement>('[data-track]')
    if (!tracked) return
    const { event, data } = collect(tracked)
    if (event) send(event, data, tracked)
  }

  root.addEventListener('click', onClick)
  if (toggle) root.addEventListener('toggle', onToggle, true) // capture: toggle doesn't bubble

  return () => {
    root.removeEventListener('click', onClick)
    if (toggle) root.removeEventListener('toggle', onToggle, true)
  }
}
