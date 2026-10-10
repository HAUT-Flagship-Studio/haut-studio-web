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
  /** From the visitor's stored fbclid, used when the _fbc cookie is missing. */
  fbclid?: string
  fbclidAt?: number
}

export interface CapiEvent {
  eventName: 'Lead' | 'PriceViewed'
  eventId: string
  eventSourceUrl?: string
  user?: CapiUser
  customData?: Record<string, unknown>
}

export async function sendCapiEvent(req: NextRequest, event: CapiEvent): Promise<void> {
  const token = process.env.META_CAPI_TOKEN
  if (!token) return

  const u = event.user ?? {}
  const email = normEmail(u.email)
  const phone = normPhone(u.phone)
  const fn = normName(u.firstName)
  const ln = normName(u.lastName)

  // Pixel-set cookies travel with the request: same domain.
  const fbp = req.cookies.get('_fbp')?.value
  let fbc = req.cookies.get('_fbc')?.value
  if (!fbc && u.fbclid) fbc = `fb.1.${u.fbclidAt ?? Date.now()}.${u.fbclid}`

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || undefined
  const ua = req.headers.get('user-agent') || undefined

  const user_data: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: ua,
    fbp,
    fbc,
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
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: 'website',
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
    if (!res.ok) {
      console.error(`[capi] ${event.eventName} rejected: ${res.status} ${(await res.text()).slice(0, 500)}`)
    }
  } catch (error) {
    console.error(`[capi] ${event.eventName} failed:`, error)
  }
}
