// Barrel: re-exports every recipe. Prefer subpath imports
// (e.g. '@oleksiimazurenko/react-patterns/fit-text') when you only need one.
export { FitText, type FitTextProps } from './fit-text'
export { Parallax, type ParallaxProps } from './parallax'
export { Reveal, type RevealProps } from './reveal'
export { Accordion, type AccordionProps } from './accordion'
export { AccordionItem, type AccordionItemProps } from './accordion'
export {
  registerAnalytics,
  trackProps,
  type Send,
  type TrackData,
  type RegisterAnalyticsOptions,
} from './analytics'
