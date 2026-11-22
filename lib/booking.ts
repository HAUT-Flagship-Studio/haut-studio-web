import { STUDIO } from './data'

/**
 * Drop-off requests for /book (2026-11-22) — the studio's own booking link for
 * the Google Business Profile, replacing the third-party ARI scheduler.
 *
 * A request, not a reservation: there is no calendar behind it, so nothing here
 * knows which days are already full. The visitor picks a working day and a
 * time, the request reaches Telegram and the sheet like any lead, and the
 * studio calls to confirm. The form says so in as many words.
 *
 * The form and /api/lead both validate against these rules, so a request for a
 * Saturday or a closed day cannot arrive even if someone posts it by hand.
 */

export const STUDIO_TZ = 'America/New_York'

/** Mon–Fri, 10 AM–7 PM — the same hours as STUDIO.hours. */
export const OPEN_WEEKDAYS = [1, 2, 3, 4, 5]
/** Drop-off times offered. The last is an hour before closing. */
export const DROP_OFF_TIMES = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

/**
 * Weekdays the studio is closed. Add a line here for any other day off; the
 * form stops offering it on the next deploy.
 */
export const CLOSED_DATES: Record<string, string> = {
  '2026-11-26': 'Thanksgiving',
  '2026-12-25': 'Christmas Day',
  '2027-01-01': "New Year's Day",
}

/** How far ahead a request can be made, in working days. */
export const BOOKING_WINDOW_DAYS = 30

/** Today's date in the studio's time zone, as YYYY-MM-DD. */
export function studioToday(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: STUDIO_TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

function weekday(iso: string): number {
  return new Date(`${iso}T12:00:00Z`).getUTCDay()
}

export function isOpenDay(iso: string): boolean {
  return OPEN_WEEKDAYS.includes(weekday(iso)) && !CLOSED_DATES[iso]
}

/** The working days a visitor can pick: from tomorrow, BOOKING_WINDOW_DAYS of them. */
export function bookableDays(now = new Date()): string[] {
  const days: string[] = []
  let d = addDays(studioToday(now), 1)
  while (days.length < BOOKING_WINDOW_DAYS) {
    if (isOpenDay(d)) days.push(d)
    d = addDays(d, 1)
  }
  return days
}

/** Why a requested slot cannot be booked, or null when it can. */
export function bookingProblem(date: unknown, time: unknown, now = new Date()): string | null {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'bad_date'
  if (typeof time !== 'string' || !DROP_OFF_TIMES.includes(time)) return 'bad_time'
  if (!bookableDays(now).includes(date)) return 'day_not_bookable'
  return null
}

/** "Tue, Nov 24" */
export function formatDay(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' })
}

/** "2:00 PM" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

export const BOOKING_HOURS_LABEL = STUDIO.hours
