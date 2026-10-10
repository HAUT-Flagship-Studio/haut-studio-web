import { NextRequest, NextResponse, after } from 'next/server'
import { randomUUID } from 'node:crypto'
import { browserFromRequest, sendCapiEvent } from '@/lib/metaCapi'

// Three channels with a timeout and one retry each can outlast the default.
export const maxDuration = 30

const CHANNEL_TIMEOUT_MS = 6000

type Delivery = { channel: string; ok: boolean; error?: string; ms: number }

/**
 * One channel, checked properly. `fetch` resolves on any HTTP status, so until
 * 2026-10-09 a channel answering 401 or 500 was recorded as delivered — the
 * lead was gone and the visitor saw a thank-you. Now a non-2xx is a failure,
 * and every failure gets one retry before it counts.
 *
 * Leads go to Telegram (the people who answer) and Google Sheets (the log).
 * There is no CRM: a GoHighLevel webhook was scaffolded here, never configured,
 * and removed on 2026-10-09 — the studio does not use GoHighLevel.
 */
async function deliver(channel: string, send: () => Promise<Response>): Promise<Delivery> {
  const started = Date.now()
  let lastError = ''
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await send()
      if (res.ok) return { channel, ok: true, ms: Date.now() - started }
      lastError = `HTTP ${res.status}: ${(await res.text().catch(() => '')).slice(0, 300)}`
    } catch (error) {
      lastError = String(error)
    }
    if (attempt === 1) await new Promise((r) => setTimeout(r, 700))
  }
  console.error(`[/api/lead] ${channel} delivery failed after retry: ${lastError}`)
  return { channel, ok: false, error: lastError, ms: Date.now() - started }
}

const post = (url: string, payload: unknown) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(CHANNEL_TIMEOUT_MS),
  })

const isSet = (v: string | undefined, placeholder: string): v is string => !!v && v !== placeholder

const clean = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const name = clean(body.name, 120)
    const phone = clean(body.phone, 40)
    const email = clean(body.email, 200)
    const message = clean(body.message, 2000)
    const partial = !!body.partial
    const source = body.source === 'quiz' ? 'quiz' : 'calculator'
    const bodyType = clean(body.bodyType, 40)
    const vehicleLabel = clean(body.vehicleLabel, 120)
    const vehicle = vehicleLabel || bodyType || 'N/A'
    const estimatedPrice = Number.isFinite(Number(body.estimatedPrice)) ? Number(body.estimatedPrice) : 0
    const services: string[] = Array.isArray(body.selectedServices)
      ? body.selectedServices.filter((s: unknown) => typeof s === 'string').slice(0, 12)
      : []
    const coverageLabel = services.length ? services.join(', ') : 'Not selected yet'
    const priceLabel = estimatedPrice > 0 ? `$${estimatedPrice.toLocaleString('en-US')}` : 'N/A'
    const eventId = typeof body.eventId === 'string' && /^[\w-]{8,64}$/.test(body.eventId) ? body.eventId : undefined
    const eventSourceUrl = clean(body.eventSourceUrl, 1000) || undefined

    const a = typeof body.attribution === 'object' && body.attribution ? body.attribution : {}
    const utm = {
      utm_source: clean(a.utm_source, 200),
      utm_medium: clean(a.utm_medium, 200),
      utm_campaign: clean(a.utm_campaign, 200),
      utm_content: clean(a.utm_content, 200),
      utm_term: clean(a.utm_term, 200),
      fbclid: clean(a.fbclid, 500),
      gclid: clean(a.gclid, 500),
      landing_page: clean(a.landing_page, 300),
      referrer: clean(a.referrer, 300),
    }
    const fromAd = utm.utm_source || utm.fbclid || utm.gclid
    const sourceLabel = source === 'quiz' ? 'Quiz (2-Min Assessment)' : 'Price Calculator'
    const channelLabel = fromAd
      ? [utm.utm_source || (utm.fbclid ? 'meta' : 'google'), utm.utm_medium, utm.utm_campaign].filter(Boolean).join(' / ')
      : 'organic / direct'

    // The Pixel cookies of the browser that sent this lead. Meta gets them with
    // the Lead now, and the sheet keeps them so a Purchase weeks later can be
    // tied to the same ad click.
    const browser = browserFromRequest(req, utm.fbclid || undefined, Number(a.fbclid_at) || undefined)
    // Every row gets an id, including a second lead in one visit that Meta is
    // not told about — a payment on either row must still be sendable.
    const leadId = eventId ?? `lead_${randomUUID()}`

    const [firstName, ...rest] = name.split(/\s+/)
    const lastName = rest.join(' ')

    const jobs: Promise<Delivery>[] = []

    // ── 1. Telegram ─────────────────────────────────────────────────────────
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID
    const telegramOn =
      isSet(telegramToken, 'your_bot_token_here') && isSet(telegramChatId, 'your_chat_id_here')
    const telegram = (text: string) =>
      // Plain text on purpose. This used parse_mode Markdown, and Telegram
      // rejects the whole message when a name or an email contains an
      // unmatched _ or * — john_smith@gmail.com was enough to lose the lead.
      post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        chat_id: telegramChatId,
        text,
        disable_web_page_preview: true,
      })

    if (telegramOn) {
      const lines = [
        partial ? '🟡 Partial HAUT Lead (phone only, from quiz result)' : '🚗 New HAUT Lead',
        `👤 Name: ${name || 'Not provided yet'}`,
        `📞 Phone: ${phone || 'N/A'}`,
        `📧 Email: ${email || 'Not provided yet'}`,
        `🚘 Vehicle: ${vehicle}`,
        `🛡️ Coverage: ${coverageLabel}`,
        `💰 Price shown: ${priceLabel}`,
        `🧭 Form: ${sourceLabel}`,
        `📣 Channel: ${channelLabel}`,
        utm.utm_content ? `🎯 Ad: ${utm.utm_content}` : null,
        utm.landing_page ? `🛬 Landed on: ${utm.landing_page}` : null,
        message ? `📝 Notes: ${message}` : null,
      ]
      jobs.push(deliver('telegram', () => telegram(lines.filter(Boolean).join('\n'))))
    }

    // ── 2. Google Sheets (Apps Script Web App) ──────────────────────────────
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (isSet(sheetsWebhookUrl, 'your_apps_script_web_app_url_here')) {
      jobs.push(
        deliver('sheets', () =>
          post(sheetsWebhookUrl, {
            timestamp: new Date().toISOString(),
            name,
            phone,
            email,
            vehicle,
            services: coverageLabel,
            estimate: estimatedPrice > 0 ? priceLabel : '',
            type: partial ? 'Partial' : 'Full',
            notes: message,
            form: sourceLabel,
            channel: channelLabel,
            ...utm,
            source,
            fbc: browser.fbc || '',
            fbp: browser.fbp || '',
            event_id: leadId,
          })
        )
      )
    }

    // In parallel: the slowest channel no longer delays the others.
    const deliveries = await Promise.all(jobs)
    const delivered = deliveries.filter((d) => d.ok)
    const failed = deliveries.filter((d) => !d.ok)

    // Channel names only — the errors can carry webhook responses.
    const summary = deliveries.map(({ channel, ok }) => ({ channel, ok }))
    const record = { name, phone, email, vehicle, services: coverageLabel, price: priceLabel, source, partial, ...utm }

    if (deliveries.length === 0) {
      console.error('[/api/lead] LEAD_LOST no delivery channel is configured:', JSON.stringify(record))
      return NextResponse.json({ success: false, error: 'not_configured', deliveries: summary }, { status: 503 })
    }

    if (delivered.length === 0) {
      // Last resort: the full lead in the function log, searchable by the tag.
      console.error('[/api/lead] LEAD_LOST all channels failed:', JSON.stringify(record), JSON.stringify(deliveries))
      return NextResponse.json({ success: false, error: 'delivery_failed', deliveries: summary }, { status: 502 })
    }

    console.log(
      `[/api/lead] delivered via ${delivered.map((d) => `${d.channel} ${d.ms}ms`).join(', ')}` +
        (failed.length ? `; FAILED ${failed.map((d) => d.channel).join(', ')}` : '')
    )

    after(async () => {
      // A channel that failed while another took the lead: say so where a
      // person will see it, with the lead attached, so it can be re-entered.
      if (failed.length && telegramOn && delivered.some((d) => d.channel === 'telegram')) {
        await telegram(
          `⚠️ This lead did NOT reach: ${failed.map((d) => d.channel).join(', ')}. ` +
            `Add it by hand: ${name || '—'} · ${phone || '—'} · ${email || '—'}\n` +
            failed.map((d) => `${d.channel}: ${d.error}`).join('\n')
        ).catch(() => {})
      }

      if (eventId) {
        await sendCapiEvent({
          eventName: 'Lead',
          eventId,
          eventSourceUrl,
          user: { email, phone, firstName, lastName },
          browser,
          customData: {
            content_name: coverageLabel,
            content_category: source,
            source,
            vehicle: bodyType || vehicle,
            value: estimatedPrice > 0 ? estimatedPrice : undefined,
            currency: 'USD',
            lead_type: partial ? 'partial' : 'full',
          },
        })
      }
    })

    return NextResponse.json({ success: true, deliveries: summary }, { status: 200 })
  } catch (error) {
    console.error('[/api/lead] Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
