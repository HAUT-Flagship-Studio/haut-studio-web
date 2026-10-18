'use client'

import { useEffect } from 'react'
import { getAttribution, isQuietTest } from '@/lib/attribution'

/**
 * Microsoft Clarity: session recordings and click/scroll heatmaps, so a visit
 * can be watched rather than inferred from event counts. Added 2026-10-18.
 *
 * Loaded only when NEXT_PUBLIC_CLARITY_ID is set, only on the real domain
 * (preview and localhost visits would sit beside real ones), and never in a
 * ?test=1 session. The quote forms carry data-clarity-mask, so a name, phone
 * or email never appears in a recording whatever the project's masking mode.
 * The privacy policy names Clarity — keep the two in step.
 *
 * Mounted after SiteTracking: its effect runs first and stores the test flag
 * and the ad attribution this reads.
 */
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID
const CANONICAL_HOST = 'hautppfstudio.com'

export default function Clarity() {
  useEffect(() => {
    if (!CLARITY_ID || window.clarity) return
    if (window.location.hostname.replace(/^www\./, '') !== CANONICAL_HOST || isQuietTest()) return

    const queue: unknown[][] = []
    const clarity = (...args: unknown[]) => {
      queue.push(args)
    }
    clarity.q = queue
    window.clarity = clarity
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
    document.head.appendChild(script)

    // Which ad brought the visit, so recordings filter by campaign and creative.
    const a = getAttribution()
    for (const key of ['utm_source', 'utm_campaign', 'utm_content'] as const) {
      if (a[key]) clarity('set', key, a[key])
    }
    clarity('set', 'landing_page', a.landing_page || window.location.pathname)
  }, [])

  return null
}
