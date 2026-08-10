import { Parallax } from '@oleksiimazurenko/react-patterns/parallax'

/**
 * A tall, full-bleed scene: nine layers — ambient blobs, outlined rings and
 * dots — each riding its own view() timeline at a different speed and direction.
 * The block is deliberately tall so the depth reads clearly and lasts the whole
 * scroll through it. Nothing here listens to scroll; it's all pure CSS.
 * (Negative amplitude reverses direction; some dots drift on the X axis.)
 */
export function ParallaxScene() {
  return (
    <div className="relative h-[560px] overflow-clip rounded-3xl border border-white/10 bg-[radial-gradient(130%_120%_at_50%_-10%,#0d1526_0%,#05070d_60%,#000_100%)]">
      {/* far — ambient blobs, slow */}
      <Parallax amplitude={36} className="absolute -top-6 -left-24 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
      <Parallax amplitude={-44} className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-violet-500/25 blur-3xl" />
      <Parallax amplitude={30} className="absolute -top-10 right-1/3 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

      {/* mid — outlined rings, medium */}
      <Parallax amplitude={78} className="absolute top-20 left-[22%] h-40 w-40 rounded-full border border-white/10" />
      <Parallax amplitude={-96} className="absolute right-[24%] bottom-16 h-56 w-56 rounded-full border border-white/10" />

      {/* near — dots, fast, mixed axes */}
      <Parallax amplitude={140} className="absolute top-1/2 left-[16%] h-3.5 w-3.5 rounded-full bg-emerald-300" />
      <Parallax amplitude={-160} className="absolute top-1/3 right-[20%] h-3 w-3 rounded-full bg-sky-300" />
      <Parallax axis="x" amplitude={120} className="absolute top-[62%] left-[62%] h-3 w-3 rounded-full bg-fuchsia-300" />
      <Parallax axis="x" amplitude={-100} className="absolute top-[26%] left-[38%] h-2.5 w-2.5 rounded-full bg-amber-300" />

      {/* pinned foreground — does NOT move */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-xs tracking-[0.35em] text-emerald-300/90 uppercase">
          depth from scroll
        </p>
        <p className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Nine layers, nine speeds
        </p>
        <p className="mt-4 max-w-md text-sm text-neutral-400">
          Every blob, ring and dot rides its own{' '}
          <span className="text-neutral-200">view()</span> timeline. Nothing here
          listens to scroll.
        </p>
      </div>
    </div>
  )
}
