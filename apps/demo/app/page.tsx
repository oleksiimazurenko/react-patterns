import { FitText } from '@oleksiimazurenko/react-patterns/fit-text'
import { Parallax } from '@oleksiimazurenko/react-patterns/parallax'
import { Reveal } from '@oleksiimazurenko/react-patterns/reveal'
import { Accordion, AccordionItem } from '@oleksiimazurenko/react-patterns/accordion'
import { trackProps } from '@oleksiimazurenko/react-patterns/analytics'

import { ResizableFitText } from '@/components/ResizableFitText'

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

const SCENES = [
  { kicker: 'depth', title: 'Layered scroll', grad: 'from-emerald-400/50 via-teal-600/40 to-sky-800/60' },
  { kicker: 'motion', title: 'On the compositor', grad: 'from-sky-400/50 via-indigo-600/40 to-violet-900/60' },
  { kicker: 'zero js', title: 'No scroll listener', grad: 'from-amber-300/40 via-rose-500/40 to-fuchsia-900/60' },
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

        {/* Framed scenes: the gradient layer is taller than its frame and drifts
            inside it, so you see depth rather than a whole tile sliding. */}
        <div className="grid gap-6 sm:grid-cols-3">
          {SCENES.map((s, i) => (
            <article
              key={s.title}
              className="relative h-72 overflow-hidden rounded-2xl border border-white/10"
            >
              <Parallax amplitude={i % 2 === 0 ? 50 : 70} className="absolute inset-x-0 -inset-y-16">
                <div className={`h-full w-full bg-gradient-to-br ${s.grad}`} />
              </Parallax>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/60">
                  {s.kicker}
                </p>
                <p className="text-xl font-semibold">{s.title}</p>
              </div>
            </article>
          ))}
        </div>

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
    </main>
  )
}
