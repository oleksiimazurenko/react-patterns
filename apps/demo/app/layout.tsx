import { type Metadata } from 'next'
import { type ReactNode } from 'react'

import '@oleksiimazurenko/patterns-core/fit-text/style.css'
import '@oleksiimazurenko/patterns-core/parallax/style.css'
import '@oleksiimazurenko/patterns-core/reveal/style.css'
import '@oleksiimazurenko/patterns-core/accordion/style.css'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

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
] as const

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("dark font-sans", geist.variable)}>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-emerald-400/30">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
            <a href="#top" className="text-sm font-semibold tracking-tight">
              react-patterns
            </a>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <a className="transition hover:text-emerald-300" href={href}>
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
