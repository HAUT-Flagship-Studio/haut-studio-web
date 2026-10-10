declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * A tap on the phone number. Sent to Meta as the standard `Contact` event —
 * a custom `PhoneClick` could be counted but never optimised for, and for a
 * studio a call is as good as a form.
 */
export function trackPhoneClick(location: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'phone_click', { link_location: location })
  window.fbq?.('track', 'Contact', { content_name: 'phone', location }, { eventID: newEventId() })
}

export function trackAddressClick(location: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'address_click', { link_location: location })
  window.fbq?.('trackCustom', 'AddressClick', { location })
}

/**
 * The quote form's outcome, to GA4 as well as the Pixel.
 *
 * Until 2026-09-28 a submitted quote fired `fbq('track', 'Lead')` and nothing
 * else, so GA4 — the only analytics anyone here actually reads — recorded four
 * `form_start` events in six weeks and not one submission. Whether a lead ever
 * arrived was unanswerable from the data; the channel that produced it, more so.
 *
 * `generate_lead` is GA4's own recommended event name, so it lands in the
 * standard reports rather than needing a custom one.
 */
export function trackLead(params: { value?: number; partial?: boolean }) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'generate_lead', {
    currency: 'USD',
    value: params.value ?? 0,
    lead_type: params.partial ? 'partial' : 'full',
  })
}

/**
 * A quote that did not reach anyone. Recorded because the alternative is what
 * the site did before: fail silently and leave the visitor believing they were
 * heard. `reason` carries the API's own code — `not_configured` when no channel
 * exists, `delivery_failed` when every one of them refused.
 */
export function trackLeadFailed(reason: string, partial?: boolean) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'lead_failed', {
    reason,
    lead_type: partial ? 'partial' : 'full',
  })
}

/**
 * A refusal from /api/lead, carrying the API's own reason code so the failure
 * event records why rather than just that. A network error never becomes one of
 * these — it is reported as `network`, because "we could not reach the server"
 * and "the server could not reach anyone" need different fixes.
 */
export class LeadError extends Error {
  constructor(public reason: 'not_configured' | 'delivery_failed') {
    super(reason)
    this.name = 'LeadError'
  }
}

/**
 * One id per conversion, shared by the browser Pixel event and its server-side
 * Conversions API twin, so Meta counts the pair once.
 */
export function newEventId(): string {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`
  }
}

export type QuoteSource = 'calculator' | 'quiz'

export interface QuoteDetails {
  source: QuoteSource
  /** Body type: sedan, suv, truck, exotic, cybertruck. */
  vehicle: string
  /** The services shown or chosen, joined — Meta's content_name. */
  packageName: string
  value: number
}

function quoteParams(d: QuoteDetails) {
  return {
    content_name: d.packageName || 'none selected',
    content_category: d.source,
    source: d.source,
    vehicle: d.vehicle,
    value: d.value,
    currency: 'USD',
  }
}

const PRICE_VIEWED_KEY = 'haut_price_viewed'
let priceViewedThisLoad = false

/**
 * The visitor reached their estimate: the quiz's "Your Tailored Package"
 * screen, or the calculator's final step with a price on it. This is the event
 * the ads optimise for — it happens several times as often as a lead, which is
 * what a small daily budget needs to leave Meta's learning phase.
 *
 * Once per visit. The quiz hands off to the calculator, and stepping back and
 * forth re-renders the price; counting each of those would teach Meta that one
 * person is several.
 */
export function trackPriceViewed(d: QuoteDetails) {
  if (typeof window === 'undefined' || d.value <= 0) return
  if (priceViewedThisLoad) return
  try {
    if (sessionStorage.getItem(PRICE_VIEWED_KEY)) return
    sessionStorage.setItem(PRICE_VIEWED_KEY, '1')
  } catch {
    // Storage blocked — fall back to once per page load.
  }
  priceViewedThisLoad = true

  const eventId = newEventId()
  const params = quoteParams(d)
  window.fbq?.('trackCustom', 'PriceViewed', params, { eventID: eventId })
  window.gtag?.('event', 'price_viewed', { source: d.source, value: d.value, currency: 'USD' })

  // The server twin. keepalive lets it finish if the visitor closes the tab.
  fetch('/api/meta-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      eventName: 'PriceViewed',
      eventId,
      eventSourceUrl: window.location.href,
      customData: params,
    }),
  }).catch(() => {})
}

const LEAD_KEY = 'haut_lead_counted'
let leadThisLoad = false

function leadCounted() {
  if (leadThisLoad) return true
  try {
    return !!sessionStorage.getItem(LEAD_KEY)
  } catch {
    return false
  }
}

/**
 * The event id for a Lead, or undefined when this visit already produced one.
 *
 * The quiz's "Text Me This" and the calculator form are often the same person
 * twice: phone first, then the full form. Both go to the CRM — the second has
 * the name and email — but Meta should learn one person converted, not two.
 * Without an id the server sends no Conversions API copy either.
 */
export function leadEventId(): string | undefined {
  if (typeof window === 'undefined' || leadCounted()) return undefined
  return newEventId()
}

/**
 * The browser half of a Lead. Called only after /api/lead answered ok, with the
 * event id the server already used for its own copy.
 */
export function trackLeadPixel(d: QuoteDetails, eventId: string | undefined) {
  if (typeof window === 'undefined' || !eventId) return
  leadThisLoad = true
  try {
    sessionStorage.setItem(LEAD_KEY, '1')
  } catch {
    // Storage blocked — once per page load instead.
  }
  window.fbq?.('track', 'Lead', quoteParams(d), { eventID: eventId })
}
