'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'

/** Records utm_* and fbclid from the landing URL before navigation drops them. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])
  return null
}
