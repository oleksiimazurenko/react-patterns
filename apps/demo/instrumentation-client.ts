import { registerAnalytics } from '@oleksiimazurenko/react-patterns/analytics'

import { toast } from '@/components/ui/toast'

// The analytics recipe, live: ONE delegated listener installed once at client
// startup — no component, no useEffect. Every element with `data-track` on the
// page flows through here. For the demo we surface each event as a toast; a real
// app would lazy-import its SDK inside `send` to keep it off the critical path.
registerAnalytics((event, data) => {
  const detail = Object.entries(data)
    .map(([k, v]) => `${k}: ${v}`)
    .join(' · ')

  toast.add({
    title: event,
    description: detail || 'no payload',
  })
})
