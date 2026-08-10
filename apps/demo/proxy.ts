import { NextResponse, type NextRequest } from 'next/server'

// Next 16 renamed `middleware.ts` → `proxy.ts`. Same edge entry point, clearer
// name. This one just stamps a header so you can see it run; a real app would
// do auth, redirects, A/B bucketing, etc.
export function proxy(_request: NextRequest) {
  const res = NextResponse.next()
  res.headers.set('x-powered-by-recipe', 'react-patterns')
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
