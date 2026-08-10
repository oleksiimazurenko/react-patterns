import { FitText } from '@oleksiimazurenko/react-patterns/fit-text'
import { Parallax } from '@oleksiimazurenko/react-patterns/parallax'
import { Reveal } from '@oleksiimazurenko/react-patterns/reveal'
import { Accordion, AccordionItem } from '@oleksiimazurenko/react-patterns/accordion'
import { trackProps } from '@oleksiimazurenko/react-patterns/analytics'
import { StickyShrink } from '@oleksiimazurenko/react-patterns/sticky-shrink'

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

// Cache Components in action: this async server component is cached (`use cache`)
// and prerendered into the static shell — it never re-runs per request.
async function BuiltWith() {
  'use cache'
  return (
    <p className="mt-4 font-mono text-xs text-neutral-500">
      Next.js 16 · React Compiler · Cache Components (PPR) · Turbopack · proxy.ts
    </p>
  )
}

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
        <BuiltWith />
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
    </main>
  )
}
