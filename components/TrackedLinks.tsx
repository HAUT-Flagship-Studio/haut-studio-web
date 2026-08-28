'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { STUDIO } from '@/lib/data'
import { trackPhoneClick, trackAddressClick } from '@/lib/analytics'

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  location: string
  children: ReactNode
}

export function PhoneLink({ location, onClick, children, ...rest }: TrackedLinkProps) {
  return (
    <a
      href={STUDIO.phoneHref}
      onClick={(e) => {
        trackPhoneClick(location)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

export function AddressLink({ location, onClick, children, ...rest }: TrackedLinkProps) {
  return (
    <a
      href={STUDIO.mapsHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackAddressClick(location)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
