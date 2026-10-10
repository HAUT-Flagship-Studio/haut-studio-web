import { createHash } from 'node:crypto'
import type { NextRequest } from 'next/server'

/**
 * Meta Conversions API — the server-side copy of a Pixel event.
 *
 * The browser Pixel misses a large share of visitors: Safari and iOS limit its
 * cookies, ad blockers drop it, and the Instagram in-app browser is where these
 * ads land. The server copy carries what the browser cannot — hashed email,
 * phone and name — which is what lets Meta tie a lead back to the person who
 * saw the ad, and then find more people like them.
 *
 * Both copies share an event_id, and Meta keeps one. A missing token turns
 * this off silently: the site works the same, only the server copy is absent.
 *
 * Env: META_CAPI_TOKEN (required to send), META_TEST_EVENT_CODE (only while
 * testing in Events Manager → Test Events; remove it after), META_GRAPH_VERSION.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '2372259143543220'
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v24.0'

const sha256 = (v: string) => createHash('sha256').update(v).digest('hex')

/** Meta's normalisation rules: trimmed, lowercase; phone as digits with country code. */
function normEmail(v?: string) {
  const s = v?.trim().toLowerCase()
  return s && s.includes('@') ? s : undefined
}

function normPhone(v?: string) {
  let d = v?.replace(/\D/g, '') ?? ''
  if (d.length === 10) d = '1' + d // a US number typed without the country code
  return d.length >= 11 ? d : undefined
}

function normName(v?: string) {
  const s = v?.trim().toLowerCase().replace(/[^\p{L}\p{M}\s'-]/gu, '').trim()
  return s || undefined
}

export interface CapiUser {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
}

/**
 * What identifies the browser to Meta: its Pixel cookies, IP and user agent.
 * Read from the visitor's own request, or — for a Purchase sent days later from
 * the leads sheet — from the values that request left in the sheet.
 */
export interface CapiBrowser {
  fbp?: string
  fbc?: string
  ip?: string
  ua?: string
}

/** The visitor's browser context, from the request that carried their lead. */
export function browserFromRequest(req: NextRequest, fbclid?: string, fbclidAt?: number): CapiBrowser {
  // Pixel-set cookies travel with the request: same domain.
  const fbp = req.cookies.get('_fbp')?.value
  let fbc = req.cookies.get('_fbc')?.value
  if (!fbc && fbclid) fbc = `fb.1.${fbclidAt ?? Date.now()}.${fbclid}`
  return {
    fbp,
    fbc,
    ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || undefined,
    ua: req.headers.get('user-agent') || undefined,
  }
}

export interface CapiEvent {
  eventName: 'Lead' | 'PriceViewed' | 'Purchase'
  eventId: string
  /**
   * `website` for what happened on the site. `physical_store` for a payment at
   * the studio: Meta accepts website events up to 7 days old, store events up
   * to 62, and a payment often comes later than a week after the lead.
   */
  actionSource?: 'website' | 'physical_store'
  /** Unix seconds; defaults to now. */
  eventTime?: number
  eventSourceUrl?: string
  user?: CapiUser
  browser?: CapiBrowser
  customData?: Record<string, unknown>
}

export interface CapiResult {
  ok: boolean
  /** Meta's answer, or why nothing was sent — short enough for a sheet cell. */
  detail: string
}

export async function sendCapiEvent(event: CapiEvent): Promise<CapiResult> {
  const token = process.env.META_CAPI_TOKEN
  if (!token) return { ok: false, detail: 'META_CAPI_TOKEN is not set' }

  const u = event.user ?? {}
  const b = event.browser ?? {}
  const email = normEmail(u.email)
  const phone = normPhone(u.phone)
  const fn = normName(u.firstName)
  const ln = normName(u.lastName)

  const user_data: Record<string, unknown> = {
    client_ip_address: b.ip,
    client_user_agent: b.ua,
    fbp: b.fbp || undefined,
    fbc: b.fbc || undefined,
    em: email ? [sha256(email)] : undefined,
    ph: phone ? [sha256(phone)] : undefined,
    fn: fn ? [sha256(fn)] : undefined,
    ln: ln ? [sha256(ln)] : undefined,
    // Leads only ever come through the US site of a NJ studio.
    country: [sha256('us')],
  }

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: event.actionSource ?? 'website',
        user_data,
        custom_data: event.customData,
      },
    ],
  }
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(5000),
      }
    )
    const text = (await res.text()).slice(0, 500)
    if (!res.ok) {
      console.error(`[capi] ${event.eventName} rejected: ${res.status} ${text}`)
      return { ok: false, detail: `Meta ${res.status}: ${text}` }
    }
    // The only proof in the logs that Meta took it: events_received and the trace id.
    const test = process.env.META_TEST_EVENT_CODE ? ' (test)' : ''
    console.log(`[capi] ${event.eventName} ${event.eventId} accepted${test}: ${text}`)
    return { ok: true, detail: `accepted${test}: ${text}` }
  } catch (error) {
    console.error(`[capi] ${event.eventName} failed:`, error)
    return { ok: false, detail: String(error) }
  }
}
