import { NextRequest, NextResponse, after } from 'next/server'
import { browserFromRequest, sendCapiEvent } from '@/lib/metaCapi'

/**
 * Server copy of browser events that carry no contact details — today only
 * PriceViewed. Lead is not accepted here: it is sent by /api/lead itself, after
 * the enquiry was actually delivered, so nobody can post a Lead into the Pixel
 * without leaving one.
 */
const ALLOWED = new Set(['PriceViewed'])

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const eventName = body?.eventName
  const eventId = body?.eventId

  if (!ALLOWED.has(eventName) || typeof eventId !== 'string' || !/^[\w-]{8,64}$/.test(eventId)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const c = body.customData ?? {}
  const value = Number(c.value)
  const customData = {
    content_name: String(c.content_name ?? '').slice(0, 200),
    content_category: String(c.content_category ?? '').slice(0, 40),
    source: String(c.source ?? '').slice(0, 40),
    vehicle: String(c.vehicle ?? '').slice(0, 40),
    value: Number.isFinite(value) && value > 0 && value < 100000 ? value : undefined,
    currency: 'USD',
  }
  const eventSourceUrl = typeof body.eventSourceUrl === 'string' ? body.eventSourceUrl.slice(0, 1000) : undefined

  const browser = browserFromRequest(req)
  after(() => sendCapiEvent({ eventName: 'PriceViewed', eventId, eventSourceUrl, browser, customData }))
  return new NextResponse(null, { status: 204 })
}
