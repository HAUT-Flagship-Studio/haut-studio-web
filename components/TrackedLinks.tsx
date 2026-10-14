'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { STUDIO } from '@/lib/data'

/**
 * Contact links. The clicks are reported by components/SiteTracking.tsx, which
 * sees every tel:, sms: and maps link on the site; `location` names where this
 * one sits, and travels with the event.
 */
type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  location: string
  children: ReactNode
}

export function PhoneLink({ location, children, ...rest }: TrackedLinkProps) {
  return (
    <a href={STUDIO.phoneHref} data-track-location={location} {...rest}>
      {children}
    </a>
  )
}

/**
 * A text message to the studio's number with the first line written for the
 * visitor. `?&body=` is the form both iOS and Android read.
 */
export function smsHref(body?: string) {
  const number = STUDIO.phoneHref.replace(/^tel:/, '')
  return body ? `sms:${number}?&body=${encodeURIComponent(body)}` : `sms:${number}`
}

export function SmsLink({ location, body, children, ...rest }: TrackedLinkProps & { body?: string }) {
  return (
    <a href={smsHref(body)} data-track-location={location} {...rest}>
      {children}
    </a>
  )
}

export function AddressLink({ location, children, ...rest }: TrackedLinkProps) {
  return (
    <a href={STUDIO.mapsHref} target="_blank" rel="noopener noreferrer" data-track-location={location} {...rest}>
      {children}
    </a>
  )
}
