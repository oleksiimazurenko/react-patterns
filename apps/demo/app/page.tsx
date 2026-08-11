import { FitText } from '@oleksiimazurenko/react-patterns/fit-text'
import { Parallax } from '@oleksiimazurenko/react-patterns/parallax'
import { Reveal } from '@oleksiimazurenko/react-patterns/reveal'
import { Accordion, AccordionItem } from '@oleksiimazurenko/react-patterns/accordion'
import { trackProps } from '@oleksiimazurenko/react-patterns/analytics'
import { StickyShrink } from '@oleksiimazurenko/react-patterns/sticky-shrink'
import { Slider } from '@oleksiimazurenko/react-patterns/slider'
import { Dialog, DialogTrigger, DialogClose } from '@oleksiimazurenko/react-patterns/dialog'
import { Popover, PopoverTrigger } from '@oleksiimazurenko/react-patterns/popover'

import { ResizableFitText } from '@/components/ResizableFitText'
import { ParallaxScene } from '@/components/ParallaxScene'

function SectionHeading({ id, kicker, title }: { id: string; kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-emerald-400">{kicker}</p>
      <h2 id={id} className="scroll-mt-20 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}

const CARDS = [
  ['Zero client JS', 'Recipes lean on CSS and the platform, not hooks.'],
  ['Correct on first paint', 'No measure-then-resize, no post-mount jump.'],
  ['RSC-safe', 'Components stay server HTML — no "use client".'],
  ['Graceful fallback', 'Unsupported browsers just render at rest.'],
  ['Reduced-motion aware', 'Animations bow out when the user asks.'],
  ['Tiny', 'Each recipe is a few lines of CSS + a thin wrapper.'],
]

const FAQ = [
  ['Does this ship JavaScript?', 'Almost none. fit-text, parallax, reveal and accordion are pure CSS; analytics is a single delegated listener for the whole app.'],
  ['Do the components need "use client"?', 'No. They only render markup and set CSS variables / data attributes, so they work as Server Components.'],
  ['What about old browsers?', 'Every recipe is gated behind @supports or native fallbacks — unsupported engines render the content at rest, never broken.'],
  ['Can I use one recipe only?', 'Yes — each is its own subpath import, so you ship only what you use.'],
]

const THUMBS = [
  'from-emerald-400/40 to-teal-700/40',
  'from-sky-400/40 to-indigo-700/40',
  'from-violet-400/40 to-fuchsia-700/40',
  'from-amber-300/40 to-rose-600/40',
  'from-teal-400/40 to-emerald-700/40',
  'from-indigo-400/40 to-sky-700/40',
]

const SLIDES = [
  { title: 'One', grad: 'from-emerald-500/60 to-teal-800/60' },
  { title: 'Two', grad: 'from-sky-500/60 to-indigo-800/60' },
  { title: 'Three', grad: 'from-violet-500/60 to-fuchsia-800/60' },
  { title: 'Four', grad: 'from-amber-400/50 to-rose-700/60' },
  { title: 'Five', grad: 'from-cyan-400/50 to-blue-800/60' },
]

export default function Home() {
  return (
    <main id="top">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
        <FitText className="mx-auto max-w-4xl font-bold tracking-tight" min="2.5rem" max={96}>
          React best practices, with barely any JavaScript
        </FitText>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-neutral-400">
          A growing collection of recipes done with pure CSS or a single delegated
          listener. Scroll down — everything you see below runs on the platform.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a
            href="#fit-text"
            className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-emerald-300"
            {...trackProps('cta_clicked', { place: 'hero', label: 'explore' })}
          >
            Explore recipes
          </a>
          <a
            href="https://github.com/oleksiimazurenko/react-patterns"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition hover:border-white/40"
            {...trackProps('cta_clicked', { place: 'hero', label: 'github' })}
          >
            GitHub
          </a>
        </div>
      </section>

      {/* fit-text */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading id="fit-text" kicker="recipe 01" title="fit-text" />
        <p className="mb-8 max-w-2xl text-neutral-400">
          The font scales to its container with container-query units — no
          measuring, no layout shift. Drag the handle and watch it rescale live
          (shadcn <code className="text-emerald-300">Resizable</code>).
        </p>
        <ResizableFitText />
      </section>

      {/* parallax */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading id="parallax" kicker="recipe 02" title="parallax" />
        <p className="mb-8 max-w-2xl text-neutral-400">
          Each frame holds a layer that drifts at its own rate as you scroll —
          depth rendered on the compositor (<code className="text-emerald-300">animation-timeline: view()</code>),
          no scroll listener.
        </p>

        <ParallaxScene />

        {/* stagger: children ride their own timelines, entrances cascading */}
        <p className="mt-12 mb-4 text-sm text-neutral-500">
          <code className="text-emerald-300">stagger</code> — the same recipe over
          a group; each child&apos;s entrance is offset from the last.
        </p>
        <Parallax stagger={8} from={36} to={0} className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {THUMBS.map((grad) => (
            <div key={grad} className={`h-20 rounded-xl bg-gradient-to-br ${grad}`} />
          ))}
        </Parallax>
      </section>

      {/* reveal */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading id="reveal" kicker="recipe 03" title="reveal" />
        <p className="mb-8 max-w-2xl text-neutral-400">
          Each card fades and rises into place as it enters the viewport — a
          <code className="text-emerald-300"> view()</code> timeline, no IntersectionObserver.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(([title, body]) => (
            <Reveal
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="mb-2 font-semibold">{title}</h3>
              <p className="text-sm text-neutral-400">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* accordion */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading id="accordion" kicker="recipe 04" title="accordion" />
        <p className="mb-8 max-w-2xl text-neutral-400">
          Native <code className="text-emerald-300">&lt;details&gt;</code> with a smooth
          <code className="text-emerald-300"> interpolate-size</code> open/close.
          Exclusive (only one open) via a shared name — no state.
        </p>
        <Accordion name="faq" className="rounded-xl border border-white/10 bg-white/5 px-5">
          {FAQ.map(([q, a], i) => (
            <AccordionItem
              key={q}
              title={<span className="py-4 text-left font-medium">{q}</span>}
              defaultOpen={i === 0}
              className="border-b border-white/10 last:border-0 [&_.accordion-summary]:py-4"
            >
              <p className="pb-4 text-sm text-neutral-400">{a}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* analytics */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading id="analytics" kicker="recipe 05" title="analytics" />
        <p className="mb-8 max-w-2xl text-neutral-400">
          These buttons are plain server HTML with <code className="text-emerald-300">data-track</code> attributes.
          One delegated listener (in <code className="text-emerald-300">instrumentation-client.ts</code>) catches
          every click — a toast pops up for each event.
        </p>
        <div className="flex flex-wrap gap-3">
          {['sign_up', 'buy', 'contact', 'share'].map((intent) => (
            <button
              key={intent}
              type="button"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm transition hover:border-emerald-300 hover:text-emerald-300"
              {...trackProps('button_clicked', { intent, place: 'analytics_demo' })}
            >
              {intent}
            </button>
          ))}
        </div>
      </section>

      {/* scroll-progress (the bar is pinned at the very top of the page) */}
      <section className="mx-auto max-w-5xl px-6 pt-8 pb-4">
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">recipe 06</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">scroll-progress</h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          The emerald bar pinned to the very top of this page is the
          scroll-progress recipe — one fixed element whose <code className="text-emerald-300">scaleX</code> rides
          the document&apos;s <code className="text-emerald-300">scroll()</code> timeline. Scroll and watch it fill; no listener.
        </p>
      </section>

      {/* sticky-shrink */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading id="sticky-shrink" kicker="recipe 07" title="sticky-shrink" />
        <p className="mb-8 max-w-2xl text-neutral-400">
          Scroll <em>inside</em> the box — the header shrinks from 96 to 56px over
          the first 180px, driven by one registered progress var. The logo reads
          that same var and scales in step. Zero JS.
        </p>
        <div className="h-80 overflow-y-scroll rounded-2xl border border-white/10 bg-neutral-900/40">
          <StickyShrink
            from={96}
            to={56}
            distance={180}
            className="z-10 flex items-center gap-3 border-b border-white/10 bg-neutral-900/95 px-6 backdrop-blur"
          >
            <div
              className="rounded-lg bg-emerald-400"
              style={{
                width: '2rem',
                height: '2rem',
                scale: 'calc(1 - 0.25 * var(--sticky-shrink-progress))',
              }}
            />
            <span className="font-semibold">Acme</span>
          </StickyShrink>
          <div className="space-y-4 p-6 text-sm text-neutral-400">
            {Array.from({ length: 14 }, (_, i) => (
              <p key={i}>Row {i + 1} — keep scrolling to shrink the header above.</p>
            ))}
          </div>
        </div>
      </section>

      {/* slider */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading id="slider" kicker="recipe 08" title="slider" />
        <p className="mb-8 max-w-2xl text-neutral-400">
          A CSS scroll-snap track — swipe or trackpad works everywhere. Dots and
          prev/next buttons are CSS Carousel pseudo-elements, so they need no JS.
          One slide at a time with a peek of the next; the arrow advances exactly
          one. (For a multi-slide row, use a smaller <code className="text-emerald-300">itemSize</code> —
          the arrows then page the group, which is how scroll-buttons work.
          Controls want Chrome 135+.)
        </p>
        <div className="relative">
          <Slider
            itemSize="84%"
            snapAlign="center"
            gap="1rem"
            dotColor="#6ee7b7"
            className="px-8 scroll-px-8"
          >
            {SLIDES.map((s) => (
              <li
                key={s.title}
                className={`grid h-56 place-items-center rounded-2xl bg-gradient-to-br ${s.grad}`}
              >
                <span className="text-2xl font-semibold text-white">{s.title}</span>
              </li>
            ))}
          </Slider>
          {/* edge orientation — sits under the arrows (which are fixed, z-2) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-neutral-950 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-neutral-950 to-transparent"
          />
        </div>
      </section>

      {/* dialog */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading id="dialog" kicker="recipe 09" title="dialog" />
        <p className="mb-8 max-w-2xl text-neutral-400">
          A native <code className="text-emerald-300">&lt;dialog&gt;</code> opened by the HTML invoker commands
          (<code className="text-emerald-300">command=&quot;show-modal&quot;</code>) — modal, backdrop, Esc, and
          <strong> backdrop-click to close</strong> (<code className="text-emerald-300">closedby=&quot;any&quot;</code>) all native.
          Zero JS, no <code className="text-emerald-300">onClick</code>. Needs Chrome 135+.
        </p>
        <DialogTrigger
          target="demo-dialog"
          className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-emerald-300"
        >
          Open dialog
        </DialogTrigger>
        <Dialog
          id="demo-dialog"
          className="[--dialog-bg:#0f1110] [--dialog-border:rgba(255,255,255,0.1)] [--dialog-fg:#f4f6f5]"
        >
          <h3 className="text-lg font-semibold">Native dialog</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Opened and closed with zero JavaScript — the browser handles the modal,
            backdrop, Esc and focus. The animation is pure CSS (@starting-style).
          </p>
          <div className="mt-6 flex justify-end">
            <DialogClose
              target="demo-dialog"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm transition hover:border-white/40"
            >
              Close
            </DialogClose>
          </div>
        </Dialog>
      </section>

      {/* popover */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading id="popover" kicker="recipe 10" title="popover" />
        <p className="mb-8 max-w-2xl text-neutral-400">
          A native popover (menu / dropdown) via the Popover API — toggle,
          click-outside dismiss and the top layer are native, and it auto-anchors
          to the button with CSS anchor positioning. Zero JS. Needs Chrome 125+.
        </p>
        <PopoverTrigger
          target="demo-popover"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm transition hover:border-emerald-300 hover:text-emerald-300"
        >
          Open menu ▾
        </PopoverTrigger>
        <Popover
          id="demo-popover"
          className="flex flex-col [--popover-bg:#0f1110] [--popover-border:rgba(255,255,255,0.1)] [--popover-fg:#f4f6f5]"
        >
          {['Profile', 'Settings', 'Sign out'].map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-md px-3 py-2 text-left text-sm text-neutral-300 transition hover:bg-white/5"
            >
              {item}
            </button>
          ))}
        </Popover>
      </section>
    </main>
  )
}
