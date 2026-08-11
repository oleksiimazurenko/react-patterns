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
export { ScrollProgress, type ScrollProgressProps } from './scroll-progress'
export { StickyShrink, type StickyShrinkProps } from './sticky-shrink'
export { Slider, type SliderProps } from './slider'
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  type DialogProps,
  type DialogTriggerProps,
  type DialogCloseProps,
} from './dialog'
export {
  Popover,
  PopoverTrigger,
  type PopoverProps,
  type PopoverTriggerProps,
} from './popover'
