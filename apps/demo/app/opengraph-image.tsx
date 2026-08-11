import { ImageResponse } from 'next/og'

export const alt = 'react-patterns — zero-JS React recipes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 88,
          background: 'radial-gradient(120% 90% at 12% 8%, #0f2a20, #060807 60%)',
          color: '#f4f6f5',
          fontFamily: 'sans-serif',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48" fill="none">
          <ellipse
            cx="24"
            cy="24"
            rx="18.5"
            ry="7.5"
            transform="rotate(-24 24 24)"
            stroke="#34d399"
            strokeWidth="3"
          />
          <circle cx="24" cy="24" r="4.5" fill="#6ee7b7" />
        </svg>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, marginTop: 36, letterSpacing: -2 }}>
          react-patterns
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: '#9aa39e', marginTop: 20, maxWidth: 900 }}>
          React best practices that ship far less JavaScript — built CSS-first and server-first.
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#34d399', marginTop: 40, fontFamily: 'monospace' }}>
          10 recipes · zero-JS · npm
        </div>
      </div>
    ),
    { ...size },
  )
}
