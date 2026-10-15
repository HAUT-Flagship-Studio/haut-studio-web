import { getAttribution, isQuietTest } from './attribution'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

// ── Page context ────────────────────────────────────────────────────────────

export type Service = 'ppf' | 'ceramic' | 'tint'
const SERVICES: Service[] = ['ppf', 'ceramic', 'tint']

/**
 * The service a page is about: /ceramic → ceramic, /window-tint → tint,
 * /ppf → ppf. `?service=` overrides the path, which is how an ad link opens
 * the calculator on a given service from any page.
 */
export function serviceOfPage(pathname: string, search = ''): Service | 'none' {
  const param = new URLSearchParams(search).get('service')
  if (param && (SERVICES as string[]).includes(param)) return param as Service
  if (pathname.startsWith('/ceramic')) return 'ceramic'
  if (pathname.startsWith('/window-tint')) return 'tint'
  if (pathname.startsWith('/ppf')) return 'ppf'
  return 'none'
}

export type PageType = 'home' | 'ppf' | 'ceramic' | 'tint' | 'process' | 'location' | 'other'

export function pageTypeOf(pathname: string): PageType {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/ppf')) return 'ppf'
  if (pathname.startsWith('/ceramic')) return 'ceramic'
  if (pathname.startsWith('/window-tint')) return 'tint'
  if (pathname.startsWith('/our-process')) return 'process'
  if (pathname.startsWith('/service-area')) return 'location'
  return 'other'
}

/** What every event carries: where it happened and which ad brought the visitor. */
function pageParams() {
  const { pathname, search } = window.location
  const a = getAttribution()
  return {
    page_type: pageTypeOf(pathname),
    service: serviceOfPage(pathname, search),
    page_path: pathname,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_content: a.utm_content,
  }
}

/**
 * While the calculator is open, what the visitor has chosen so far. A phone
 * or text tap from inside it then says which quote it was about.
 */
let quoteContext: Record<string, unknown> | null = null
export function setQuoteContext(ctx: Record<string, unknown> | null) {
  quoteContext = ctx
}

// ── Sending ─────────────────────────────────────────────────────────────────

/** No empty values, nothing long: Meta's parameters are for counting, not storage. */
function compact(params: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue
    out[k] = typeof v === 'string' ? v.slice(0, 200) : v
  }
  if (typeof out.value === 'number') out.currency = 'USD'
  return out
}

type ServerEvent = { eventName: string; eventId: string; eventSourceUrl: string; customData: Record<string, unknown> }
let serverQueue: ServerEvent[] = []
let flushTimer: ReturnType<typeof setTimeout> | undefined

/**
 * Server copies leave in batches, a moment after the browser event, so a
 * page view and the view-content beside it share one request. keepalive lets
 * the last batch finish when the visitor leaves.
 */
export function flushServerEvents() {
  clearTimeout(flushTimer)
  if (serverQueue.length === 0) return
  const events = serverQueue
  serverQueue = []
  fetch('/api/meta-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({ events }),
  }).catch(() => {})
}

function queueServerEvent(event: ServerEvent) {
  serverQueue.push(event)
  clearTimeout(flushTimer)
  flushTimer = setTimeout(flushServerEvents, 300)
}

const firedThisPage = new Set<string>()

/** A new page (client-side navigation included): one-off events may fire again. */
export function resetPageOnce() {
  firedThisPage.clear()
}

export interface TrackOptions {
  /** A standard Meta event (PageView, Lead, Contact…) rather than a custom one. */
  standard?: boolean
  /** Also send a Conversions API copy with the same event_id. */
  capi?: boolean
  /** Fire at most once per page under this key. */
  once?: string
  /** An id already used elsewhere — the Lead's, which the server sends itself. */
  eventId?: string
}

/**
 * One Meta Pixel event, with the page context added and an event_id, and —
 * for the key events — its server twin. Never carries a name, phone or email:
 * those reach Meta only hashed, inside the Lead's Conversions API copy.
 */
export function track(name: string, params: Record<string, unknown> = {}, opts: TrackOptions = {}) {
  if (typeof window === 'undefined') return undefined
  if (opts.once !== undefined) {
    const key = `${name}:${opts.once}`
    if (firedThisPage.has(key)) return undefined
    firedThisPage.add(key)
  }
  const eventId = opts.eventId ?? newEventId()
  const data = compact({ ...pageParams(), ...params })
  if (isQuietTest()) {
    console.info('[test] not sent to Meta:', name, data)
    return eventId
  }
  window.fbq?.(opts.standard ? 'track' : 'trackCustom', name, data, { eventID: eventId })
  if (opts.capi) queueServerEvent({ eventName: name, eventId, eventSourceUrl: window.location.href, customData: data })
  return eventId
}

// ── Contacts ────────────────────────────────────────────────────────────────

const CONTACT_EVENT = { phone: 'PhoneClick', sms: 'SmsClick', email: 'EmailClick' } as const

/**
 * A tap on the phone number, a text link or an email address: the specific
 * event, plus Meta's standard `Contact` — the one ads can optimise for, and
 * the name phone taps have used since 2026-10-09.
 */
export function trackContact(kind: keyof typeof CONTACT_EVENT, location: string) {
  if (typeof window === 'undefined') return
  const params = { location, contact_method: kind, ...(quoteContext ?? {}) }
  window.gtag?.('event', `${kind}_click`, { link_location: location })
  track(CONTACT_EVENT[kind], params, { capi: true })
  track('Contact', { content_name: kind, ...params }, { standard: true, capi: true })
}

export function trackAddressClick(location: string, directions = false) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', directions ? 'directions_click' : 'address_click', { link_location: location })
  track(directions ? 'DirectionsClick' : 'AddressClick', { location })
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
  /** The service the flow led with — ppf, ceramic or tint — so Meta can count each separately. */
  service: Service
  /** Body type: sedan, suv, truck, exotic, cybertruck. */
  vehicle: string
  /** The services shown or chosen, joined — Meta's content_name. */
  packageName: string
  value: number
}

/** `vehicle` and `content_name` are the names used since 2026-10-09; the other two, the spec's of 2026-10-14. */
export function quoteParams(d: QuoteDetails) {
  return {
    content_name: d.packageName || 'none selected',
    content_category: d.source,
    source: d.source,
    service: d.service,
    vehicle: d.vehicle,
    vehicle_category: d.vehicle,
    package: d.packageName || 'none selected',
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

  track('PriceViewed', quoteParams(d), { capi: true })
  window.gtag?.('event', 'price_viewed', { source: d.source, value: d.value, currency: 'USD' })
}

/** The calculator's contact step came on screen. Once per page; a server copy too. */
export function trackQuoteFormViewed(d: QuoteDetails) {
  track('QuoteFormViewed', quoteParams(d), { capi: true, once: 'form' })
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
  track('Lead', quoteParams(d), { standard: true, eventId })
}
