import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      name,
      phone,
      email,
      message,
      bodyType,
      vehicleLabel,
      selectedServices,
      estimatedPrice,
      partial,
    } = body

    const vehicle = bodyType || vehicleLabel || 'unknown'
    const coverageLabel: string = Array.isArray(selectedServices) && selectedServices.length
      ? selectedServices.join(', ')
      : 'Not selected yet'

    const deliveries: { channel: string; ok: boolean; error?: string }[] = []

    // ── 1. Forward to GoHighLevel CRM ────────────────────────────────────────
    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL
    if (ghlWebhookUrl && ghlWebhookUrl !== 'your_ghl_webhook_url_here') {
      try {
        await fetch(ghlWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: name?.split(' ')[0] || name || '',
            lastName: name?.split(' ').slice(1).join(' ') || '',
            phone,
            email,
            source: partial ? 'HAUT Website Quiz (Partial)' : 'HAUT Website Quiz',
            tags: ['haut-quiz', `vehicle-${vehicle}`, partial ? 'partial-lead' : 'full-lead'],
            customField: {
              vehicleType: vehicleLabel || bodyType || 'N/A',
              coverageLevel: coverageLabel,
              estimatedPrice: estimatedPrice ? `$${estimatedPrice.toLocaleString()}` : 'N/A',
              notes: message || '',
            },
          }),
        })
        deliveries.push({ channel: 'ghl', ok: true })
      } catch (error) {
        console.error('[/api/lead] GHL delivery failed:', error)
        deliveries.push({ channel: 'ghl', ok: false, error: String(error) })
      }
    }

    // ── 2. Forward to Telegram ───────────────────────────────────────────────
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID
    if (
      telegramToken &&
      telegramChatId &&
      telegramToken !== 'your_bot_token_here' &&
      telegramChatId !== 'your_chat_id_here'
    ) {
      try {
        const telegramMessage = [
          partial ? '🟡 *Partial HAUT Lead (Quiz Result)*' : '🚗 *New HAUT Lead*',
          `👤 Name: ${name || 'Not provided yet'}`,
          `📞 Phone: ${phone || 'N/A'}`,
          `📧 Email: ${email || 'Not provided yet'}`,
          `🚘 Vehicle: ${vehicleLabel || bodyType || 'N/A'}`,
          `🛡️ Coverage: ${coverageLabel}`,
          `💰 Estimate: $${estimatedPrice?.toLocaleString() || 'N/A'}`,
          message ? `📝 Notes: ${message}` : null,
        ]
          .filter(Boolean)
          .join('\n')

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage,
            parse_mode: 'Markdown',
          }),
        })
        deliveries.push({ channel: 'telegram', ok: true })
      } catch (error) {
        console.error('[/api/lead] Telegram delivery failed:', error)
        deliveries.push({ channel: 'telegram', ok: false, error: String(error) })
      }
    }

    // ── 3. Append to Google Sheets (via Apps Script Web App) ─────────────────
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsWebhookUrl && sheetsWebhookUrl !== 'your_apps_script_web_app_url_here') {
      try {
        await fetch(sheetsWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name: name || '',
            phone: phone || '',
            email: email || '',
            vehicle: vehicleLabel || bodyType || '',
            services: coverageLabel,
            estimate: estimatedPrice ? `$${estimatedPrice.toLocaleString()}` : '',
            type: partial ? 'Partial' : 'Full',
            notes: message || '',
          }),
        })
        deliveries.push({ channel: 'sheets', ok: true })
      } catch (error) {
        console.error('[/api/lead] Google Sheets delivery failed:', error)
        deliveries.push({ channel: 'sheets', ok: false, error: String(error) })
      }
    }

    // A lead is captured when at least one channel took it. Until 2026-09-28
    // this returned `success: true` with HTTP 200 no matter what — including
    // when every channel failed, and when none was configured at all. The
    // visitor got a thank-you screen, the Pixel recorded a Lead, and the
    // enquiry existed nowhere. Nothing in analytics could show it, because the
    // only record was a console line in a serverless log nobody reads.
    //
    // Now the status says what happened, so the form can tell the visitor to
    // call instead of thanking them for something that was dropped.
    const delivered = deliveries.filter((d) => d.ok)

    if (deliveries.length === 0) {
      console.error('[/api/lead] No delivery channel is configured — lead dropped:', {
        name,
        phone,
        email,
      })
      return NextResponse.json(
        { success: false, error: 'not_configured', deliveries },
        { status: 503 }
      )
    }

    if (delivered.length === 0) {
      console.error('[/api/lead] All configured delivery channels failed:', deliveries)
      return NextResponse.json(
        { success: false, error: 'delivery_failed', deliveries },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, deliveries }, { status: 200 })
  } catch (error) {
    console.error('[/api/lead] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
