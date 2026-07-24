import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      name,
      phone,
      email,
      message,
      vehicle,
      vehicleLabel,
      coverage,
      coverageLabel,
      addons,
      estimatedPrice,
    } = body

    // ── 1. Forward to GoHighLevel CRM ────────────────────────────────────────
    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL
    if (ghlWebhookUrl && ghlWebhookUrl !== 'your_ghl_webhook_url_here') {
      await fetch(ghlWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: name?.split(' ')[0] || name,
          lastName: name?.split(' ').slice(1).join(' ') || '',
          phone,
          email,
          source: 'HAUT Website Quiz',
          tags: ['haut-quiz', `vehicle-${vehicle}`, `coverage-${coverage}`],
          customField: {
            vehicleType: vehicleLabel,
            coverageLevel: coverageLabel,
            addons: addons?.join(', ') || 'None',
            estimatedPrice: estimatedPrice ? `$${estimatedPrice.toLocaleString()}` : 'N/A',
            notes: message || '',
          },
        }),
      })
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
      const telegramMessage = [
        '🚗 *New HAUT Lead*',
        `👤 Name: ${name}`,
        `📞 Phone: ${phone}`,
        `📧 Email: ${email}`,
        `🚘 Vehicle: ${vehicleLabel}`,
        `🛡️ Coverage: ${coverageLabel}`,
        `➕ Add-ons: ${addons?.join(', ') || 'None'}`,
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
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[/api/lead] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
