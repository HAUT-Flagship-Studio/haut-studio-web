'use client'

import { useEffect, useRef, useState } from 'react'
import { PPF } from '@/lib/pricing'
import { G_CLASS_WINTER } from '@/lib/offers'
import { STUDIO } from '@/lib/data'
import { getAttribution } from '@/lib/attribution'
import { LeadError, leadEventId, track, trackLead, trackLeadFailed, trackLeadPixel } from '@/lib/analytics'
import ConsentNotice from './ConsentNotice'
import LeadHoneypot, { honeypotValue } from './LeadHoneypot'

const COVERAGE = [
  { id: 'full', label: 'Full Body', name: 'Full Body Armor (G-Class winter price)', price: G_CLASS_WINTER.price },
  { id: 'front', label: 'Front End', name: 'Front End Protection', price: PPF.frontEnd.prices.exotic },
  { id: 'highway', label: 'Highway & Track', name: 'Highway & Track Package', price: PPF.highway.prices.exotic },
  { id: 'unsure', label: 'Not sure', name: 'Not sure yet', price: 0 },
] as const

/** From this month to the month the offer ends, then "Later". */
function monthOptions(now = new Date()): string[] {
  const end = new Date(`${G_CLASS_WINTER.endsOn}T12:00:00Z`)
  const out: string[] = []
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 15))
  while (d <= end && out.length < 6) {
    out.push(d.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }))
    d.setUTCMonth(d.getUTCMonth() + 1)
  }
  out.push('Later')
  return out
}

const field =
  'w-full bg-white/5 border border-[#DADADA]/20 focus:border-[#9FFE0A] outline-none px-3 py-3 text-white font-roboto text-base rounded-none'
const label = 'block font-roboto text-[#DADADA] text-xs tracking-wide uppercase mb-1.5'

export default function GClassWinterForm() {
  const [months, setMonths] = useState<string[]>([])
  useEffect(() => setMonths(monthOptions()), [])
  const [coverage, setCoverage] = useState<(typeof COVERAGE)[number]['id']>('full')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const shownAt = useRef(0)
  const started = useRef(false)
  useEffect(() => {
    shownAt.current = Date.now()
  }, [])

  const choice = COVERAGE.find((c) => c.id === coverage) ?? COVERAGE[0]

  const onFirstInput = () => {
    if (started.current) return
    started.current = true
    track('OfferFormStarted', { offer: 'gclass_winter' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setSubmitting(true)
    setError('')
    const eventId = leadEventId()
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email'),
          source: 'gclass_winter',
          service: 'ppf',
          bodyType: 'exotic',
          vehicleLabel: String(data.get('model') || 'G-Class'),
          selectedServices: [choice.name],
          estimatedPrice: choice.price,
          preferredMonth: data.get('month'),
          eventId,
          eventSourceUrl: window.location.href,
          attribution: getAttribution(),
          hp: honeypotValue(form),
          formMs: shownAt.current ? Date.now() - shownAt.current : undefined,
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new LeadError(body?.error === 'not_configured' ? 'not_configured' : 'delivery_failed')
      if (body?.counted !== false) {
        trackLeadPixel(
          { source: 'gclass_winter', service: 'ppf', vehicle: 'exotic', packageName: choice.name, value: choice.price },
          eventId
        )
        trackLead({ value: choice.price })
      }
      setDone(true)
    } catch (err) {
      trackLeadFailed(err instanceof LeadError ? err.reason : 'network', false)
      setError(`Something went wrong. Please call us at ${STUDIO.phone}.`)
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="card-folded border border-[#9FFE0A]/40 bg-white/5 p-8 text-center" role="status">
        <p className="font-kanit font-bold text-white text-2xl">Thanks. We&apos;ll call you within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} onInput={onFirstInput} data-clarity-mask="true" className="relative space-y-5">
      <LeadHoneypot />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="gw-name" className={label}>Name <span className="text-[#9FFE0A]">*</span></label>
          <input id="gw-name" name="name" required autoComplete="name" maxLength={120} className={field} />
        </div>
        <div>
          <label htmlFor="gw-phone" className={label}>Phone <span className="text-[#9FFE0A]">*</span></label>
          <input id="gw-phone" name="phone" type="tel" required autoComplete="tel" maxLength={40} className={field} />
        </div>
        <div>
          <label htmlFor="gw-email" className={label}>Email</label>
          <input id="gw-email" name="email" type="email" autoComplete="email" maxLength={200} className={field} />
        </div>
        <div>
          <label htmlFor="gw-model" className={label}>Year and model</label>
          <input id="gw-model" name="model" maxLength={80} placeholder="2025 G63" className={field} />
        </div>
      </div>

      <fieldset>
        <legend className={label}>What to protect</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="radiogroup">
          {COVERAGE.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={coverage === c.id}
              onClick={() => setCoverage(c.id)}
              className={`border px-2 py-3 font-roboto text-sm rounded-none transition-colors ${
                coverage === c.id ? 'border-[#9FFE0A] bg-[#9FFE0A]/10 text-white' : 'border-[#DADADA]/20 text-[#DADADA] hover:border-[#9FFE0A]/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="gw-month" className={label}>Month that suits you</label>
        <select id="gw-month" name="month" className={field} defaultValue="">
          <option value="" className="bg-[#1A292E]">Choose a month</option>
          {months.map((m) => (
            <option key={m} value={m} className="bg-[#1A292E]">{m}</option>
          ))}
        </select>
      </div>

      {error && <p className="font-roboto text-red-400 text-sm" role="alert">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-green w-full py-4 text-base tracking-wider rounded-none disabled:opacity-60">
        {submitting ? 'Sending...' : 'Book an inspection'}
      </button>
      <ConsentNotice />
    </form>
  )
}
