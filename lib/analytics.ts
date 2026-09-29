declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function trackPhoneClick(location: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'phone_click', { link_location: location })
  window.fbq?.('trackCustom', 'PhoneClick', { location })
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
