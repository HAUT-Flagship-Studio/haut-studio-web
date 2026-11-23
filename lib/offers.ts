import { PPF } from './pricing'
import { studioToday } from './booking'

/**
 * Time-limited offers that have their own ad landing page.
 *
 * G-Class winter (owner's ТЗ, 2026-11-22): Full Body Armor on a G-Class for
 * $12,000 instead of the Exotic & Huge SUV price, through February 28, 2027.
 * The regular price is read from lib/pricing.ts so the crossed-out figure is
 * always the one the calculator quotes. After endsOn the landing redirects to
 * /ppf/g-class and the banner on that page disappears (both re-render hourly).
 */
export const G_CLASS_WINTER = {
  path: '/g-class-winter',
  regular: PPF.fullBody.prices.exotic,
  price: 12000,
  endsOn: '2027-02-28',
  endsLabel: 'February 28, 2027',
  returnsOn: 'March 1, 2027',
} as const

export function offerIsLive(offer: { endsOn: string }, now = new Date()): boolean {
  return studioToday(now) <= offer.endsOn
}

/** Ad landings: the site header shrinks to logo and phone, and the footer is not shown. */
export const AD_LANDINGS: string[] = [G_CLASS_WINTER.path]
