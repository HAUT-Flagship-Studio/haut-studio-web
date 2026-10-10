import { NextRequest, NextResponse } from 'next/server'
import { fromLeadsSheet } from '@/lib/sheetAuth'

/**
 * A message to the sales chat in Telegram, on behalf of the "Leads" sheet.
 *
 * The sheet's Apps Script (docs/leads-sheet.gs) knows when a lead has waited
 * too long or a booked client has no payment recorded; the bot token lives
 * here. Routing through the site keeps the token in Vercel instead of in a
 * script every sheet editor can read. Same secret as /api/purchase.
 */

export async function POST(req: NextRequest) {
  if (!fromLeadsSheet(req)) return NextResponse.json({ ok: false, error: 'unauthorised' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const text = typeof body?.text === 'string' ? body.text.trim().slice(0, 3500) : ''
  if (!text) return NextResponse.json({ ok: false, error: 'text is empty' }, { status: 400 })

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return NextResponse.json({ ok: false, error: 'telegram not configured' }, { status: 503 })

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Plain text: names and emails break Telegram's Markdown parser.
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    signal: AbortSignal.timeout(6000),
  }).catch((error) => {
    console.error('[/api/notify] telegram failed:', error)
    return null
  })

  if (!res?.ok) {
    const detail = res ? `HTTP ${res.status}: ${(await res.text()).slice(0, 200)}` : 'network'
    console.error('[/api/notify] telegram rejected:', detail)
    return NextResponse.json({ ok: false, error: detail }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
