import { registerAnalytics } from '@oleksiimazurenko/react-patterns/analytics'

// The analytics recipe, live: ONE delegated listener installed once at client
// startup — no component, no useEffect. Every element with `data-track` on the
// page flows through here. For the demo we just print to the console and to the
// on-page panel (#analytics-log); a real app would lazy-import its SDK inside
// `send` to keep it off the critical path.
registerAnalytics((event, data) => {
  // eslint-disable-next-line no-console
  console.log('[track]', event, data)

  const log = document.getElementById('analytics-log')
  if (!log) return
  const line = document.createElement('div')
  line.className = 'font-mono text-xs text-emerald-300'
  line.textContent = `${event} · ${JSON.stringify(data)}`
  log.prepend(line)
})
