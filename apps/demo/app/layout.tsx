import { type Metadata } from 'next'
import { type ReactNode } from 'react'

import '@oleksiimazurenko/patterns-core/fit-text/style.css'
import '@oleksiimazurenko/patterns-core/parallax/style.css'
import '@oleksiimazurenko/patterns-core/reveal/style.css'
import '@oleksiimazurenko/patterns-core/accordion/style.css'
import '@oleksiimazurenko/patterns-core/scroll-progress/style.css'
import '@oleksiimazurenko/patterns-core/sticky-shrink/style.css'
import '@oleksiimazurenko/patterns-core/slider/style.css'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import { ScrollProgress } from "@oleksiimazurenko/react-patterns/scroll-progress";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'react-patterns — zero-JS React recipes',
  description:
    'Live demos of low-JS React best practices: fit-text, parallax, reveal, accordion, and delegated analytics.',
}

const NAV = [
  ['fit-text', '#fit-text'],
  ['parallax', '#parallax'],
  ['reveal', '#reveal'],
  ['accordion', '#accordion'],
  ['analytics', '#analytics'],
  ['sticky', '#sticky-shrink'],
  ['slider', '#slider'],
] as const

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("dark font-sans", geist.variable)}>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-emerald-400/30">
        <ScrollProgress className="text-emerald-400" height={3} />
        <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3 sm:px-6">
            <a href="#top" className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight">
              <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-5 w-5">
                <ellipse cx="24" cy="24" rx="18.5" ry="7.5" transform="rotate(-24 24 24)" stroke="#34d399" strokeWidth="3" />
                <circle cx="24" cy="24" r="4.5" fill="#6ee7b7" />
              </svg>
              react-patterns
            </a>
            <ul className="flex min-w-0 flex-1 items-center gap-x-4 gap-y-1 overflow-x-auto px-5 text-xs text-neutral-400 [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%_-_1.25rem),transparent)] [scrollbar-width:none] sm:flex-wrap sm:justify-end sm:px-0 sm:[mask-image:none] [&::-webkit-scrollbar]:hidden">
              {NAV.map(([label, href]) => (
                <li key={href} className="shrink-0">
                  <a className="whitespace-nowrap transition hover:text-emerald-300" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {children}

        <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-neutral-500">
          Every recipe on this page ships as little client JS as possible — pure
          CSS or a single delegated listener.{' '}
          <a
            className="text-emerald-300 hover:underline"
            href="https://github.com/oleksiimazurenko/react-patterns"
          >
            Source
          </a>
        </footer>

        {/* Analytics events (from instrumentation-client.ts) pop up here. */}
        <Toaster />
      </body>
    </html>
  )
}
