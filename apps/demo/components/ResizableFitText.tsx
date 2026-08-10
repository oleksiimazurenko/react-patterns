'use client'

import { FitText } from '@oleksiimazurenko/react-patterns/fit-text'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

/**
 * Drag the handle to resize the left panel. fit-text reads the panel's width
 * (container-query units) and rescales the headline live — no JS measuring,
 * no resize listener. The shadcn Resizable is the only client piece here.
 */
export function ResizableFitText() {
  return (
    <div className="h-40 rounded-xl border border-white/10 bg-white/5 p-2">
      <ResizablePanelGroup orientation="horizontal" className="rounded-lg">
        <ResizablePanel
          defaultSize={65}
          minSize={20}
          className="flex items-center justify-center overflow-hidden px-4"
        >
          <FitText className="w-full text-center font-semibold" min="1rem" max={56}>
            Learn anything
          </FitText>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={35}
          minSize={10}
          className="flex items-center justify-center px-4 text-center text-xs text-neutral-500"
        >
          ← drag to resize
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
