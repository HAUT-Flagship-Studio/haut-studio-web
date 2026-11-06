/**
 * Bot checks for /api/lead (2026-11-05). A lead that fails one is still
 * delivered — to Telegram with a warning and to the sheet as "Suspect" — so a
 * person who trips a check by accident is never lost. What it does not get is
 * counted: no Lead to Meta, browser or server, and no generate_lead in GA4,
 * because Meta optimises the ads toward whoever it is told converted.
 *
 * These catch automated submissions only. The spam of 2026-11-01 was typed
 * into the calculator by a person in an ordinary Chrome over three minutes,
 * and none of this would have flagged it.
 */

/** A form sent sooner than this after it appeared was not typed by a person. */
export const MIN_FORM_MS = 3000

/** More leads than this from one connection inside the window are flagged. */
const RATE_MAX = 3
const RATE_WINDOW_MS = 10 * 60 * 1000

export type Suspicion = 'honeypot' | 'too_fast' | 'no_timing' | 'rate'

// Per server instance, so a burst spread across instances can slip through.
// Good enough for a form that gets a handful of leads a week.
const recent = new Map<string, number[]>()

function overRate(ip: string, now: number): boolean {
  const times = (recent.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  times.push(now)
  recent.set(ip, times)
  if (recent.size > 1000) {
    for (const [key, list] of recent) if (now - list[list.length - 1] >= RATE_WINDOW_MS) recent.delete(key)
  }
  return times.length > RATE_MAX
}

/**
 * The first check a lead fails, or null. `hp` is the hidden `fax` field;
 * `formMs` is how long the form was on screen. A request without `formMs` did
 * not come from the site's own form (or from a tab opened before this shipped).
 */
export function leadSuspicion(body: { hp?: unknown; formMs?: unknown }, ip: string, now = Date.now()): Suspicion | null {
  const rate = ip ? overRate(ip, now) : false
  if (typeof body.hp === 'string' && body.hp.trim()) return 'honeypot'
  const ms = Number(body.formMs)
  if (body.formMs === undefined || !Number.isFinite(ms)) return 'no_timing'
  if (ms < MIN_FORM_MS) return 'too_fast'
  return rate ? 'rate' : null
}

export function clientIp(headers: Headers): string {
  return (headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || headers.get('x-real-ip') || ''
}
