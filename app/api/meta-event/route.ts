import { NextRequest, NextResponse, after } from 'next/server'
import { browserFromRequest, sendCapiEvents, type CapiEvent } from '@/lib/metaCapi'
import { ATTRIBUTION_COOKIE, ATTRIBUTION_MAX_AGE_S } from '@/lib/attribution'

/**
 * Server copies of the key browser events, which carry no contact details.
 * The rest of the site's events (scroll, sections, clicks) stay browser-only,
 * as the marketers' spec of 2026-10-14 asks.
 *
 * Lead is not accepted here: it is sent by /api/lead itself, after the enquiry
 * was actually delivered, so nobody can post a Lead into the Pixel without
 * leaving one.
 */
const ALLOWED = new Set([
  'PageView',
  'ViewContent',
  'PriceViewed',
  'QuoteFormViewed',
  'Contact',
  'PhoneClick',
  'SmsClick',
  'EmailClick',
])

/** The parameters the site sends — anything else is dropped. */
const TEXT_PARAMS = [
  'content_name', 'content_category', 'source', 'service', 'vehicle', 'vehicle_category', 'package',
  'page_type', 'page_path', 'location', 'contact_method', 'town',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content',
]

const MAX_EVENTS = 10
const YEAR_S = 365 * 24 * 60 * 60

function customDataOf(c: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const k of TEXT_PARAMS) if (typeof c[k] === 'string' && c[k]) out[k] = (c[k] as string).slice(0, 200)
  const value = Number(c.value)
  if (Number.isFinite(value) && value > 0 && value < 100000) {
    out.value = value
    out.currency = 'USD'
  }
  return out
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  // `events` since 2026-10-14; a single event is what an old open tab still sends.
  const raw: unknown[] = Array.isArray(body?.events) ? body.events : body ? [body] : []

  const browser = browserFromRequest(req)
  const events: CapiEvent[] = []
  for (const e of raw.slice(0, MAX_EVENTS)) {
    const ev = e as Record<string, unknown>
    if (!ALLOWED.has(ev?.eventName as string)) continue
    if (typeof ev.eventId !== 'string' || !/^[\w-]{8,64}$/.test(ev.eventId)) continue
    events.push({
      eventName: ev.eventName as string,
      eventId: ev.eventId,
      eventSourceUrl: typeof ev.eventSourceUrl === 'string' ? ev.eventSourceUrl.slice(0, 1000) : undefined,
      browser,
      customData: customDataOf((ev.customData as Record<string, unknown>) ?? {}),
    })
  }
  if (events.length === 0) return NextResponse.json({ ok: false }, { status: 400 })

  after(() => sendCapiEvents(events))

  // Re-set the visitor id and the ad source from the server: Safari keeps a
  // cookie written by script for seven days, one written by the site's own
  // server for as long as it asks.
  const res = new NextResponse(null, { status: 204 })
  const secure = req.nextUrl.protocol === 'https:'
  if (browser.externalId) {
    res.cookies.set('haut_eid', browser.externalId, { path: '/', maxAge: YEAR_S, sameSite: 'lax', secure })
  }
  const attribution = req.cookies.get(ATTRIBUTION_COOKIE)?.value
  if (attribution && events.some((e) => e.eventName === 'PageView')) {
    // Next hands the value over decoded and encodes it again on the way out.
    res.cookies.set(ATTRIBUTION_COOKIE, attribution, { path: '/', maxAge: ATTRIBUTION_MAX_AGE_S, sameSite: 'lax', secure })
  }
  return res
}
