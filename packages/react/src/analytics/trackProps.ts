const kebab = (s: string): string =>
  s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

/**
 * Build the `data-track` attributes for an element, the declarative half of the
 * analytics recipe. Spread the result onto any element (including a Server
 * Component) — the single listener from `registerAnalytics` reads them back.
 *
 * ```tsx
 * <a href={href} {...trackProps('cta_clicked', { place: 'hero', label })}>Buy</a>
 * ```
 * → `data-track="cta_clicked" data-track-place="hero" data-track-label="…"`,
 * which `send` receives as `("cta_clicked", { place: "hero", label: "…" })`.
 */
export function trackProps(
  event: string,
  data?: Record<string, string | number | boolean | undefined>,
): Record<string, string> {
  const props: Record<string, string> = { 'data-track': event }
  if (data) {
    for (const k in data) {
      const v = data[k]
      if (v !== undefined) props[`data-track-${kebab(k)}`] = String(v)
    }
  }
  return props
}
