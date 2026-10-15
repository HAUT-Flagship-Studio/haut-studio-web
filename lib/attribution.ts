/**
 * Where a visitor came from, kept until they leave a lead.
 *
 * An ad click lands on /ppf with utm_* and fbclid in the URL. The first
 * client-side navigation drops them, and the lead is usually sent pages later —
 * or days later, from a bookmark. Without this, every lead arrives in the sheet
 * with no source, and paid and organic look the same.
 *
 * Kept in a first-party cookie for 90 days (the marketers' spec, 2026-10-14;
 * it was seven days in localStorage before). A cookie, not storage, because
 * the server reads it too: /api/meta-event builds fbc from the stored fbclid
 * for events whose browser has no _fbc cookie yet. A newer tagged landing
 * replaces the old one: the last ad clicked is the one that brought them back.
 * Safari caps cookies set from script at seven days; /api/meta-event re-sets
 * this one from the server on each page view, which it does not cap.
 */

const KEY = 'haut_attr'
const LEGACY_KEY = 'haut_attribution'
export const ATTRIBUTION_MAX_AGE_S = 90 * 24 * 60 * 60

const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'] as const

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing_page?: string
  referrer?: string
  /** When fbclid was first seen — Meta wants the click time inside fbc. */
  fbclid_at?: number
  captured_at?: number
}

export function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return m ? m[1] : undefined
}

function writeCookie(name: string, value: string, maxAgeS?: number) {
  const age = maxAgeS === undefined ? '' : `;max-age=${maxAgeS}`
  const secure = location.protocol === 'https:' ? ';secure' : ''
  document.cookie = `${name}=${value};path=/${age};samesite=lax${secure}`
}

export function captureAttribution() {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  captureTestMode(url)

  const found: Attribution = {}
  for (const p of PARAMS) {
    const v = url.searchParams.get(p)
    if (v) found[p] = v.slice(0, 300)
  }
  if (Object.keys(found).length === 0) {
    migrateLegacy()
    return
  }

  const now = Date.now()
  const previous = getAttribution()
  const record: Attribution = {
    ...found,
    landing_page: url.pathname,
    referrer: document.referrer ? document.referrer.slice(0, 200) : undefined,
    // The same fbclid reloaded keeps its original click time.
    fbclid_at: found.fbclid && found.fbclid === previous.fbclid ? previous.fbclid_at : found.fbclid ? now : undefined,
    captured_at: now,
  }
  save(record)
}

function save(record: Attribution) {
  try {
    writeCookie(KEY, encodeURIComponent(JSON.stringify(record)), ATTRIBUTION_MAX_AGE_S)
  } catch {
    // Cookies blocked — the lead goes out without a source.
  }
}

/** Visitors tagged before the cookie existed keep their source. */
function migrateLegacy() {
  try {
    const raw = localStorage.getItem(LEGACY_KEY)
    if (!raw) return
    localStorage.removeItem(LEGACY_KEY)
    if (readCookie(KEY)) return
    const record = JSON.parse(raw) as Attribution
    if (record.captured_at && Date.now() - record.captured_at < ATTRIBUTION_MAX_AGE_S * 1000) save(record)
  } catch {
    // Nothing to carry over.
  }
}

export function parseAttribution(raw: string | undefined): Attribution {
  if (!raw) return {}
  try {
    // Encoded as the browser stores it; already decoded when Next read it from a request.
    const json = raw.startsWith('%7B') ? decodeURIComponent(raw) : raw
    const record = JSON.parse(json) as Attribution
    if (!record.captured_at || Date.now() - record.captured_at > ATTRIBUTION_MAX_AGE_S * 1000) return {}
    return record
  } catch {
    return {}
  }
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  return parseAttribution(readCookie(KEY))
}

/**
 * Test mode, for checking the funnel without bothering the studio.
 *
 * Open any page with `?test_event_code=TEST12345` (the code from Events
 * Manager → Test Events) or `?test=1`. For the rest of that browser session a
 * quote form lands in the leads sheet marked Test, with no Telegram message.
 * With a code, server events go to Meta's Test Events tab instead of the
 * statistics; with `?test=1`, no event goes to Meta at all, browser or server.
 * Closing the browser ends it; `?test=0` ends it sooner.
 */
const TEST_KEY = 'haut_test'
const TEST_CODE = /^TEST\w{1,24}$/

function captureTestMode(url: URL) {
  const code = url.searchParams.get('test_event_code')
  const flag = url.searchParams.get('test')
  try {
    if (code && TEST_CODE.test(code)) writeCookie(TEST_KEY, code)
    else if (flag === '1') writeCookie(TEST_KEY, '1')
    else if (flag === '0') writeCookie(TEST_KEY, '', 0)
  } catch {
    // Cookies blocked — no test mode.
  }
}

/**
 * The cookie's value as the server sees it: a Test Events code, '1', or
 * nothing. `quiet` is ?test=1 — no code, so nothing may reach Meta at all:
 * a test Lead in the live statistics would teach the ads a fake conversion.
 */
export function testModeFrom(value: string | undefined): { test: boolean; testEventCode?: string; quiet: boolean } {
  if (!value) return { test: false, quiet: false }
  const testEventCode = TEST_CODE.test(value) ? value : undefined
  return { test: true, testEventCode, quiet: !testEventCode }
}

/** In the browser: is this session a quiet test (?test=1)? */
export function isQuietTest() {
  return testModeFrom(readCookie(TEST_KEY)).quiet
}

export const TEST_COOKIE = TEST_KEY
export const ATTRIBUTION_COOKIE = KEY
