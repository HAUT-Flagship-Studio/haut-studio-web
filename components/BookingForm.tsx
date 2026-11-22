'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { BODY_TYPES, CERAMIC, PPF, TINT, WSPF, type ServiceOption, type VehicleCategory } from '@/lib/pricing'
import { bookableDays, DROP_OFF_TIMES, formatDay, formatTime } from '@/lib/booking'
import { STUDIO } from '@/lib/data'
import { getAttribution } from '@/lib/attribution'
import { LeadError, leadEventId, track, trackLead, trackLeadFailed, trackLeadPixel } from '@/lib/analytics'
import LeadHoneypot, { honeypotValue } from './LeadHoneypot'
import { PhoneLink } from './TrackedLinks'

type Service = 'ppf' | 'ceramic' | 'tint'

/** Every priced line the calculator sells, grouped the way the form shows them. */
const GROUPS: { service: Service; label: string; options: ServiceOption[] }[] = [
  { service: 'ppf', label: 'Paint Protection Film', options: [PPF.frontEnd, PPF.highway, PPF.fullBody, PPF.bikini] },
  { service: 'ceramic', label: 'Ceramic Coating', options: [CERAMIC.body, CERAMIC.interior, CERAMIC.wheels] },
  { service: 'tint', label: 'Window Tint', options: [TINT.twoFront, TINT.windshieldOnly, TINT.rearHalf, TINT.fullCabin, WSPF.windshieldArmor] },
]
const ALL_OPTIONS = GROUPS.flatMap((g) => g.options.map((o) => ({ ...o, service: g.service })))
const NOT_SURE = 'not-sure'

const field = 'w-full bg-white/5 border border-[#DADADA]/20 focus:border-[#9FFE0A] outline-none px-3 py-2.5 text-white font-roboto text-sm rounded-none'
const label = 'block font-roboto text-[#DADADA] text-xs tracking-wide uppercase mb-1.5'

export default function BookingForm() {
  // Computed on the client so "tomorrow" is today's tomorrow, not the build's.
  const [days, setDays] = useState<string[]>([])
  useEffect(() => setDays(bookableDays()), [])

  const [vehicle, setVehicle] = useState<VehicleCategory>('sedan')
  const [optionId, setOptionId] = useState<string>(PPF.frontEnd.id)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const shownAt = useRef(0)
  const started = useRef(false)

  useEffect(() => {
    shownAt.current = Date.now()
  }, [])

  const option = useMemo(() => ALL_OPTIONS.find((o) => o.id === optionId), [optionId])
  const price = option ? option.prices[vehicle] : 0
  const vehicleLabel = BODY_TYPES.find((b) => b.id === vehicle)?.label ?? vehicle

  const onFirstInput = () => {
    if (started.current) return
    started.current = true
    track('BookingStarted', { service: option?.service ?? 'unknown' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!date || !time) {
      setError('Pick a day and a drop-off time.')
      return
    }
    const form = e.currentTarget
    const data = new FormData(form)
    setSubmitting(true)
    setError('')
    const eventId = leadEventId()
    const packageName = option?.name ?? 'Not sure yet'
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email'),
          message: data.get('message'),
          source: 'booking',
          booking: { date, time },
          service: option?.service ?? '',
          bodyType: vehicle,
          vehicleLabel: [data.get('car'), vehicleLabel].filter(Boolean).join(' — '),
          selectedServices: [packageName],
          estimatedPrice: price,
          eventId,
          eventSourceUrl: window.location.href,
          attribution: getAttribution(),
          hp: honeypotValue(form),
          formMs: shownAt.current ? Date.now() - shownAt.current : undefined,
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (res.status === 400) {
        // The day stopped being bookable while the page was open (midnight, a new closed day).
        setDays(bookableDays())
        setDate('')
        throw new Error('slot')
      }
      if (!res.ok) throw new LeadError(body?.error === 'not_configured' ? 'not_configured' : 'delivery_failed')
      if (body?.counted !== false) {
        trackLeadPixel({ source: 'booking', service: option?.service ?? 'ppf', vehicle, packageName, value: price }, eventId)
        trackLead({ value: price, booking: true })
      }
      setDone(true)
    } catch (err) {
      if (err instanceof Error && err.message === 'slot') {
        setError('That day is no longer available. Please pick another one.')
      } else {
        trackLeadFailed(err instanceof LeadError ? err.reason : 'network', false)
        setError(`Something went wrong. Please call us at ${STUDIO.phone}.`)
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="card-folded bg-white/5 border border-[#9FFE0A]/40 p-8 text-center" role="status">
        <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase mb-3">Request received</p>
        <h2 className="font-kanit font-bold text-white text-2xl mb-3">
          {formatDay(date)}, {formatTime(time)}
        </h2>
        <p className="font-roboto text-[#DADADA] text-sm leading-relaxed max-w-md mx-auto">
          The studio will call you during business hours to confirm the day or offer the nearest open one. Need it
          sooner? Call <PhoneLink location="booking_done" className="text-[#9FFE0A] underline">{STUDIO.phone}</PhoneLink>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} onInput={onFirstInput} data-clarity-mask="true" className="relative space-y-8">
      <LeadHoneypot />

      <fieldset className="space-y-4">
        <legend className="font-kanit font-bold text-white text-lg mb-3">1. Car and service</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bk-vehicle" className={label}>Vehicle type</label>
            <select id="bk-vehicle" className={field} value={vehicle} onChange={(e) => setVehicle(e.target.value as VehicleCategory)}>
              {BODY_TYPES.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#1A292E]">{b.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bk-car" className={label}>Year, make, model</label>
            <input id="bk-car" name="car" className={field} placeholder="2025 Porsche 911" maxLength={80} />
          </div>
        </div>
        <div>
          <label htmlFor="bk-service" className={label}>Service</label>
          <select id="bk-service" className={field} value={optionId} onChange={(e) => setOptionId(e.target.value)}>
            {GROUPS.map((g) => (
              <optgroup key={g.service} label={g.label} className="bg-[#1A292E]">
                {g.options.map((o) => (
                  <option key={o.id} value={o.id} className="bg-[#1A292E]">
                    {o.name} — from ${o.prices[vehicle].toLocaleString('en-US')}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value={NOT_SURE} className="bg-[#1A292E]">Not sure yet — I&apos;d like advice</option>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-kanit font-bold text-white text-lg mb-1">2. Drop-off day</legend>
        <p className="font-roboto text-[#DADADA]/60 text-xs mb-3">Monday to Friday. The studio is closed on weekends and holidays.</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="Drop-off day">
          {days.map((d) => (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={date === d}
              onClick={() => setDate(d)}
              className={`border px-2 py-2.5 font-roboto text-sm rounded-none transition-colors ${
                date === d ? 'border-[#9FFE0A] bg-[#9FFE0A]/10 text-white' : 'border-[#DADADA]/20 text-[#DADADA] hover:border-[#9FFE0A]/40'
              }`}
            >
              {formatDay(d)}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-kanit font-bold text-white text-lg mb-3">3. Drop-off time</legend>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="Drop-off time">
          {DROP_OFF_TIMES.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={time === t}
              onClick={() => setTime(t)}
              className={`border px-2 py-2.5 font-roboto text-sm rounded-none transition-colors ${
                time === t ? 'border-[#9FFE0A] bg-[#9FFE0A]/10 text-white' : 'border-[#DADADA]/20 text-[#DADADA] hover:border-[#9FFE0A]/40'
              }`}
            >
              {formatTime(t)}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-kanit font-bold text-white text-lg mb-3">4. Your details</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bk-name" className={label}>Full name <span className="text-[#9FFE0A]">*</span></label>
            <input id="bk-name" name="name" required autoComplete="name" className={field} maxLength={120} />
          </div>
          <div>
            <label htmlFor="bk-phone" className={label}>Phone <span className="text-[#9FFE0A]">*</span></label>
            <input id="bk-phone" name="phone" type="tel" required autoComplete="tel" className={field} maxLength={40} />
          </div>
        </div>
        <div>
          <label htmlFor="bk-email" className={label}>Email (optional)</label>
          <input id="bk-email" name="email" type="email" autoComplete="email" className={field} maxLength={200} />
        </div>
        <div>
          <label htmlFor="bk-message" className={label}>Notes (optional)</label>
          <textarea id="bk-message" name="message" rows={3} className={field} maxLength={2000} placeholder="Paint color, existing film, anything we should know" />
        </div>
      </fieldset>

      {(date || time) && (
        <p className="font-roboto text-[#DADADA] text-sm">
          Requested: <span className="text-white">{date ? formatDay(date) : 'pick a day'}</span>
          {', '}
          <span className="text-white">{time ? formatTime(time) : 'pick a time'}</span>
          {option && price > 0 && (
            <> · {option.name} from <span className="text-[#9FFE0A] font-kanit font-bold">${price.toLocaleString('en-US')}</span></>
          )}
        </p>
      )}

      {error && <p className="font-roboto text-red-400 text-sm" role="alert">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-green w-full py-4 text-base tracking-wider rounded-none disabled:opacity-60">
        {submitting ? 'Sending...' : 'Request This Drop-off →'}
      </button>
      <p className="font-roboto text-[#DADADA]/60 text-xs leading-relaxed">
        This is a request, not a confirmed slot: the studio calls you to confirm the day. A full-body PPF job keeps the
        car three to five business days; the day you pick is when you bring it in.
      </p>
    </form>
  )
}
