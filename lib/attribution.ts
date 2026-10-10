/**
 * Where a visitor came from, kept until they leave a lead.
 *
 * An ad click lands on /ppf with utm_* and fbclid in the URL. The first
 * client-side navigation drops them, and the lead is usually sent pages later —
 * or days later, from a bookmark. Without this, every lead arrives in the CRM
 * with no source, and paid and organic look the same.
 *
 * Kept in localStorage for seven days, matching Meta's default click window. A
 * newer tagged landing replaces the old one: the last ad clicked is the one
 * that brought them back. Storage can be unavailable (private mode, in-app
 * browsers with storage disabled), so every access is guarded and a failure
 * simply means the lead goes out without attribution.
 */

const KEY = 'haut_attribution'
const TTL_MS = 7 * 24 * 60 * 60 * 1000

const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'] as const

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing_page?: string
  referrer?: string
  /** When fbclid was first seen — Meta wants the click time inside fbc. */
  fbclid_at?: number
  captured_at?: number
}

export function captureAttribution() {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const found: Attribution = {}
  for (const p of PARAMS) {
    const v = url.searchParams.get(p)
    if (v) found[p] = v.slice(0, 500)
  }
  if (Object.keys(found).length === 0) return

  const now = Date.now()
  const previous = getAttribution()
  const record: Attribution = {
    ...found,
    landing_page: url.pathname,
    referrer: document.referrer ? document.referrer.slice(0, 500) : undefined,
    // The same fbclid reloaded keeps its original click time.
    fbclid_at: found.fbclid && found.fbclid === previous.fbclid ? previous.fbclid_at : found.fbclid ? now : undefined,
    captured_at: now,
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(record))
  } catch {
    // Storage blocked — the lead goes out without a source.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const record = JSON.parse(raw) as Attribution
    if (!record.captured_at || Date.now() - record.captured_at > TTL_MS) {
      localStorage.removeItem(KEY)
      return {}
    }
    return record
  } catch {
    return {}
  }
}
