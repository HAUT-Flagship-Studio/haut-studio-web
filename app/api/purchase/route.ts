import { timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { sendCapiEvent } from '@/lib/metaCapi'

/**
 * A paid client, reported to Meta as a Purchase.
 *
 * Called by the Apps Script bound to the "Leads" sheet when a row's Status
 * becomes "Оплатил" with an amount (see docs/leads-sheet.gs). The sheet is the
 * studio's only client record, so this is where Meta learns which leads became
 * money — the ads report on revenue, not on form fills.
 *
 * The script authenticates with LEADS_SHEET_SECRET, so the Meta token stays in
 * Vercel and never in a script every sheet editor can read. The answer goes
 * back into the row's "Sent to Meta" cell, so it is short and readable.
 */

const MAX_AGE_DAYS = 62 // Meta's limit for physical_store events

function authorised(req: NextRequest) {
  const expected = process.env.LEADS_SHEET_SECRET
  const given = req.headers.get('x-haut-secret')
  if (!expected || !given) return false
  const a = Buffer.from(expected)
  const b = Buffer.from(given)
  return a.length === b.length && timingSafeEqual(a, b)
}

const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status })

export async function POST(req: NextRequest) {
  if (!authorised(req)) return fail('unauthorised', 401)

  const body = await req.json().catch(() => null)
  if (!body) return fail('body is not JSON')

  const value = Number(String(body.amount ?? '').replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(value) || value <= 0 || value > 200000) return fail('Paid amount is missing or not a number')

  // The paid date is a calendar day; noon Eastern stands in for the hour.
  // Today's date can put that in the future, which Meta rejects — clamp to now.
  const day = /^\d{4}-\d{2}-\d{2}$/.test(String(body.paidDate)) ? String(body.paidDate) : null
  const now = Math.floor(Date.now() / 1000)
  let eventTime = day ? Math.floor(Date.parse(`${day}T16:00:00Z`) / 1000) : now
  if (eventTime > now) eventTime = now - 60
  if (now - eventTime > MAX_AGE_DAYS * 86400) return fail(`Paid date is older than ${MAX_AGE_DAYS} days — Meta will not accept it`)

  const leadId = String(body.leadId ?? '').trim()
  if (!/^[\w-]{6,80}$/.test(leadId)) return fail('event_id of the lead is missing')

  const name = String(body.name ?? '').trim()
  const [firstName, ...rest] = name.split(/\s+/)
  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, 300) : undefined)

  const result = await sendCapiEvent({
    eventName: 'Purchase',
    // Fixed per lead, so re-marking a row "Оплатил" can never count twice.
    eventId: `purchase_${leadId}`,
    actionSource: 'physical_store',
    eventTime,
    user: { email: str(body.email), phone: str(body.phone), firstName, lastName: rest.join(' ') },
    browser: { fbc: str(body.fbc), fbp: str(body.fbp) },
    customData: {
      value,
      currency: 'USD',
      content_name: str(body.services),
      content_category: str(body.source),
    },
  })

  return NextResponse.json({ ok: result.ok, detail: result.detail }, { status: result.ok ? 200 : 502 })
}
