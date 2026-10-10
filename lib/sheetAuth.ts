import { timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'

/**
 * Calls from the "Leads" sheet's Apps Script carry LEADS_SHEET_SECRET (the
 * script's SITE_SECRET property) in x-haut-secret.
 */
export function fromLeadsSheet(req: NextRequest) {
  const expected = process.env.LEADS_SHEET_SECRET
  const given = req.headers.get('x-haut-secret')
  if (!expected || !given) return false
  const a = Buffer.from(expected)
  const b = Buffer.from(given)
  return a.length === b.length && timingSafeEqual(a, b)
}
