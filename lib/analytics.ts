declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function trackPhoneClick(location: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'phone_click', { link_location: location })
  window.fbq?.('trackCustom', 'PhoneClick', { location })
}

export function trackAddressClick(location: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'address_click', { link_location: location })
  window.fbq?.('trackCustom', 'AddressClick', { location })
}
