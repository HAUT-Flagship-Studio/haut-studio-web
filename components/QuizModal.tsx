'use client'

import { useEffect, useMemo, useState } from 'react'
import { BODY_TYPES, CERAMIC, PPF, PPF_CYBERTRUCK_COLOR, TINT, WSPF, type ServiceOption, type VehicleCategory } from '@/lib/pricing'
import { STUDIO } from '@/lib/data'
import type { CalculatorPrefill } from './CalculatorModal'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const OWNERSHIP_OPTIONS = [
  { id: 'leased', label: 'Leased' },
  { id: 'owned', label: 'Owned or Financed' },
  { id: 'collector', label: 'Exotic or Collector' },
] as const

const ROUTE_OPTIONS = [
  { id: 'highway', label: 'Heavy Highway & Interstates' },
  { id: 'city', label: 'City & Local' },
  { id: 'mixed', label: 'Mixed' },
] as const

const PARKING_OPTIONS = [
  { id: 'outdoor', label: 'Outdoor + Auto Washes' },
  { id: 'garage-diy', label: 'Garage + DIY Wash' },
  { id: 'garage-pro', label: 'Garage + Pro Detailing' },
] as const

const CABIN_OPTIONS = [
  { id: 'kids-pets', label: 'Kids, Pets or Passengers' },
  { id: 'solo', label: 'Solo Driving' },
] as const

type Ownership = (typeof OWNERSHIP_OPTIONS)[number]['id']
type Route = (typeof ROUTE_OPTIONS)[number]['id']
type Parking = (typeof PARKING_OPTIONS)[number]['id']
type Cabin = (typeof CABIN_OPTIONS)[number]['id']

interface Answers {
  year: string
  make: string
  model: string
  bodyType: VehicleCategory | ''
  ownership: Ownership | ''
  route: Route | ''
  parking: Parking | ''
  cabin: Cabin | ''
}

const INITIAL_ANSWERS: Answers = {
  year: '',
  make: '',
  model: '',
  bodyType: '',
  ownership: '',
  route: '',
  parking: '',
  cabin: '',
}

interface Recommendation {
  id: string
  name: string
  price: number
  reasons: string[]
  optional?: boolean
}

const STEPS = [
  { title: 'Tell us about your vehicle', subtitle: 'Select your body type.' },
  { title: 'How do you own it?', subtitle: 'This changes how we protect resale and lease-return value.' },
  { title: 'Where do you drive most?', subtitle: 'Route exposure drives our film coverage recommendation.' },
  { title: 'How is it parked & cared for?', subtitle: 'Parking and wash habits drive our ceramic recommendation.' },
  { title: "Who's usually in the cabin?", subtitle: 'Passengers change our window tint recommendation.' },
]

function isGWagon(model: string) {
  return /g[\s-]?(class|wagon|63|550|500)/i.test(model)
}

// Every category below is a single else-if chain — each recommendation set
// can only ever contain ONE PPF tier, ONE ceramic tier, and ONE tint tier,
// so the engine can never surface overlapping/duplicate coverage.
function buildRecommendations(answers: Answers): Recommendation[] {
  if (!answers.bodyType) return []
  const cat = answers.bodyType
  const rec = new Map<string, Recommendation>()

  const add = (service: ServiceOption, reason: string, optional = false) => {
    const existing = rec.get(service.id)
    if (existing) {
      if (!existing.reasons.includes(reason)) existing.reasons.push(reason)
      return
    }
    rec.set(service.id, { id: service.id, name: service.name, price: service.prices[cat], reasons: [reason], optional })
  }

  // PPF — single tier. Leased vehicles are capped below Highway/Full Body —
  // those tiers overprotect a car you're returning, so leased always resolves
  // to Bikini (light city use) or Front End (everything else) instead.
  if (answers.ownership === 'leased') {
    if (answers.route === 'city') {
      add(PPF.bikini, "Leased vehicles don't need investment-grade coverage — Bikini PPF protects the highest-impact panels for light city driving without over-spending on a car you're returning.")
    } else {
      add(PPF.frontEnd, 'Leased vehicles are capped at Front End PPF — solid protection for your lease-return condition without the cost of Highway or Full Body coverage.')
    }
  } else if (answers.ownership === 'collector') {
    add(PPF.fullBody, 'Full-body coverage protects the entire investment value of an exotic or collector vehicle.')
  } else if (answers.route === 'highway') {
    add(PPF.highway, 'Extended front, rocker & mirror coverage matches your heavy highway mileage exposure.')
  } else {
    add(PPF.frontEnd, 'Core front-end coverage protects the highest-impact panels for your daily driving.')
  }

  if (isGWagon(answers.model) || answers.bodyType === 'cybertruck' || answers.route === 'highway') {
    add(WSPF.windshieldArmor, 'High-speed highway travel and rugged body styles face constant windshield pitting — this shields against chips and cracks.')
  }

  // Ceramic and tint are only ever added for an explicit trigger — never
  // as a blanket add-on for ownership type — to keep lean vehicles lean.
  if (answers.route === 'highway') {
    add(CERAMIC.body, 'Heavy highway mileage exposes paint to salt, grime, and swirl-inducing automatic washes — ceramic coating adds a durable, easy-clean barrier.')
  }
  if (answers.parking === 'outdoor') {
    add(CERAMIC.body, 'Outdoor parking and automatic washes expose paint to UV, water spots, and swirl marks — ceramic coating adds a durable, easy-clean barrier.')
  }

  if (answers.cabin === 'kids-pets') {
    add(TINT.fullCabin, 'Passengers, kids, and pets benefit from full-cabin UV/heat rejection and added privacy.')
  }

  // Cybertruck-exclusive upsell — surfaced as an optional add-on, not
  // auto-selected, since it's a premium upgrade rather than a fit-driven need.
  if (answers.bodyType === 'cybertruck') {
    add(
      PPF_CYBERTRUCK_COLOR,
      'A Cybertruck-exclusive full vehicle color-change film — an optional upgrade over standard Clear PPF.',
      true
    )
  }

  return Array.from(rec.values())
}

function resolveChoices(items: Recommendation[]) {
  let ppf: CalculatorPrefill['ppf'] = 'none'
  const ceramic: CalculatorPrefill['ceramic'] = []
  let tint: CalculatorPrefill['tint'] = 'none'
  let wspf: CalculatorPrefill['wspf'] = 'none'

  for (const item of items) {
    if (item.id === PPF.bikini.id) ppf = 'bikini'
    else if (item.id === PPF.frontEnd.id) ppf = 'frontEnd'
    else if (item.id === PPF.highway.id) ppf = 'highway'
    else if (item.id === PPF.fullBody.id) ppf = 'fullBody'
    else if (item.id === CERAMIC.body.id) ceramic.push('body')
    else if (item.id === TINT.fullCabin.id) tint = 'fullCabin'
    else if (item.id === WSPF.windshieldArmor.id) wspf = 'windshieldArmor'
    else if (item.id === PPF_CYBERTRUCK_COLOR.id) ppf = 'colorPPF'
  }

  return { ppf, ceramic, tint, wspf }
}

export default function QuizModal({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean
  onClose: () => void
  onApply: (prefill: CalculatorPrefill) => void
}) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [capturePhone, setCapturePhone] = useState('')
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const recommendations = useMemo(() => buildRecommendations(answers), [answers])

  useEffect(() => {
    if (step === 6) setSelectedIds(recommendations.filter((r) => !r.optional).map((r) => r.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'AssessmentStarted')
    }
  }, [isOpen])

  if (!isOpen) return null

  const isResults = step === 6
  const totalSteps = 5
  const progressPct = isResults ? 100 : ((step - 1) / totalSteps) * 100

  const canAdvance =
    (step === 1 && !!answers.bodyType && !!answers.year.trim() && !!answers.make.trim() && !!answers.model.trim()) ||
    (step === 2 && !!answers.ownership) ||
    (step === 3 && !!answers.route) ||
    (step === 4 && !!answers.parking) ||
    (step === 5 && !!answers.cabin)

  const handleNext = () => {
    if (!canAdvance) return
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'AssessmentStep', { step: step + 1 })
    }
    setStep((s) => Math.min(s + 1, 6))
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleReset = () => {
    setStep(1)
    setAnswers(INITIAL_ANSWERS)
    setSelectedIds([])
    setCapturePhone('')
    setCaptureStatus('idle')
  }

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const selectedItems = recommendations.filter((r) => selectedIds.includes(r.id))
  const total = selectedItems.reduce((sum, r) => sum + r.price, 0)
  const comboEligible = selectedItems.length >= 2

  const vehicleLabel = [answers.year, answers.make, answers.model].filter(Boolean).join(' ').toUpperCase() || 'VEHICLE'

  const handleApply = () => {
    const choices = resolveChoices(selectedItems)
    onApply({
      vehicleLabel,
      bodyType: answers.bodyType as VehicleCategory,
      ...choices,
      notes: selectedItems.length
        ? `Imported from Tailored Package Assessment — recommended: ${selectedItems.map((i) => i.name).join(', ')}.`
        : undefined,
    })
    onClose()
  }

  const handleSendEstimate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!capturePhone.trim()) return
    setCaptureStatus('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: capturePhone,
          vehicleLabel,
          selectedServices: selectedItems.map((i) => i.name),
          estimatedPrice: total,
          partial: true,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'PartialLead', { value: total, currency: 'USD' })
      }
      setCaptureStatus('sent')
    } catch {
      setCaptureStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Tailored Package Assessment"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#DADADA]/15 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase">
                {isResults ? 'Your Results' : `Step ${step} of ${totalSteps}`}
              </p>
              {!isResults && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[#DADADA]/50 hover:text-[#9FFE0A] font-roboto text-xs underline underline-offset-2 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
            <h2 className="font-kanit font-bold text-white text-xl">
              {isResults ? 'Your Tailored Package' : STEPS[step - 1].title}
            </h2>
            <p className="font-roboto text-[#DADADA]/60 text-sm mt-0.5">
              {isResults ? 'Built from your answers — adjust selections before applying.' : STEPS[step - 1].subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#DADADA] hover:text-[#9FFE0A] transition-colors flex-shrink-0"
            aria-label="Close assessment"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="quiz-progress mx-6 mt-4 flex-shrink-0">
          <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1 — Body Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="border border-[#DADADA]/10 bg-white/5 p-4 rounded-none">
                <p className="font-kanit font-semibold text-white text-sm uppercase tracking-wide mb-3">
                  1. Select Body Type <span className="text-[#DADADA]/50 normal-case font-roboto font-normal tracking-normal">(required for pricing)</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {BODY_TYPES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setAnswers((p) => ({ ...p, bodyType: b.id }))}
                      className={`p-3 border text-left transition-all duration-200 rounded-none font-kanit font-semibold text-white text-sm ${
                        answers.bodyType === b.id ? 'border-[#9FFE0A] bg-[#9FFE0A]/10' : 'border-[#DADADA]/20 hover:border-[#9FFE0A]/40'
                      }`}
                      aria-pressed={answers.bodyType === b.id}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-[#DADADA]/10 bg-white/5 p-4 rounded-none">
                <p className="font-kanit font-semibold text-white text-sm uppercase tracking-wide mb-3">
                  2. Vehicle Details <span className="text-[#9FFE0A]/80 normal-case font-roboto font-normal tracking-normal">(required)</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-roboto text-[#DADADA]/60 text-xs uppercase tracking-widest mb-2">Year</p>
                    <input
                      type="text"
                      placeholder="e.g. 2024"
                      value={answers.year}
                      onChange={(e) => setAnswers((p) => ({ ...p, year: e.target.value }))}
                      className="w-full bg-transparent border border-[#DADADA]/25 text-white font-roboto text-sm px-4 py-2.5 focus:outline-none focus:border-[#9FFE0A] transition-colors placeholder:text-[#DADADA]/30 rounded-none"
                    />
                  </div>
                  <div>
                    <p className="font-roboto text-[#DADADA]/60 text-xs uppercase tracking-widest mb-2">Make</p>
                    <input
                      type="text"
                      placeholder="e.g. Porsche"
                      value={answers.make}
                      onChange={(e) => setAnswers((p) => ({ ...p, make: e.target.value }))}
                      className="w-full bg-transparent border border-[#DADADA]/25 text-white font-roboto text-sm px-4 py-2.5 focus:outline-none focus:border-[#9FFE0A] transition-colors placeholder:text-[#DADADA]/30 rounded-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="font-roboto text-[#DADADA]/60 text-xs uppercase tracking-widest mb-2">Model</p>
                    <input
                      type="text"
                      placeholder="e.g. GT3 RS / G63"
                      value={answers.model}
                      onChange={(e) => setAnswers((p) => ({ ...p, model: e.target.value }))}
                      className="w-full bg-transparent border border-[#DADADA]/25 text-white font-roboto text-sm px-4 py-2.5 focus:outline-none focus:border-[#9FFE0A] transition-colors placeholder:text-[#DADADA]/30 rounded-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Ownership */}
          {step === 2 && (
            <div className="space-y-3">
              {OWNERSHIP_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setAnswers((p) => ({ ...p, ownership: o.id }))}
                  className={`w-full p-4 border text-left transition-all duration-200 rounded-none font-kanit font-semibold text-white text-sm ${
                    answers.ownership === o.id ? 'border-[#9FFE0A] bg-[#9FFE0A]/10' : 'border-[#DADADA]/20 hover:border-[#9FFE0A]/40'
                  }`}
                  aria-pressed={answers.ownership === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 3 — Route */}
          {step === 3 && (
            <div className="space-y-3">
              {ROUTE_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setAnswers((p) => ({ ...p, route: o.id }))}
                  className={`w-full p-4 border text-left transition-all duration-200 rounded-none font-kanit font-semibold text-white text-sm ${
                    answers.route === o.id ? 'border-[#9FFE0A] bg-[#9FFE0A]/10' : 'border-[#DADADA]/20 hover:border-[#9FFE0A]/40'
                  }`}
                  aria-pressed={answers.route === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 4 — Parking & Care */}
          {step === 4 && (
            <div className="space-y-3">
              {PARKING_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setAnswers((p) => ({ ...p, parking: o.id }))}
                  className={`w-full p-4 border text-left transition-all duration-200 rounded-none font-kanit font-semibold text-white text-sm ${
                    answers.parking === o.id ? 'border-[#9FFE0A] bg-[#9FFE0A]/10' : 'border-[#DADADA]/20 hover:border-[#9FFE0A]/40'
                  }`}
                  aria-pressed={answers.parking === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 5 — Cabin */}
          {step === 5 && (
            <div className="space-y-3">
              {CABIN_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setAnswers((p) => ({ ...p, cabin: o.id }))}
                  className={`w-full p-4 border text-left transition-all duration-200 rounded-none font-kanit font-semibold text-white text-sm ${
                    answers.cabin === o.id ? 'border-[#9FFE0A] bg-[#9FFE0A]/10' : 'border-[#DADADA]/20 hover:border-[#9FFE0A]/40'
                  }`}
                  aria-pressed={answers.cabin === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          {isResults && (
            <div className="space-y-4">
              <h3 className="font-kanit font-bold text-[#9FFE0A] text-sm tracking-wide uppercase">
                Recommended Setup For Your {vehicleLabel}
              </h3>

              <div className="space-y-3">
                {recommendations.map((r) => {
                  const checked = selectedIds.includes(r.id)
                  return (
                    <div
                      key={r.id}
                      className={`p-4 border transition-all duration-200 rounded-none ${
                        checked ? 'border-[#9FFE0A] bg-[#9FFE0A]/10' : 'border-[#DADADA]/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => toggleSelected(r.id)}
                          className="flex items-start gap-3 text-left flex-1"
                          aria-pressed={checked}
                        >
                          <div className={`w-5 h-5 mt-0.5 border flex items-center justify-center flex-shrink-0 ${
                            checked ? 'border-[#9FFE0A] bg-[#9FFE0A]' : 'border-[#DADADA]/40'
                          }`}>
                            {checked && (
                              <svg className="w-3 h-3 text-[#1A292E]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-kanit font-semibold text-white text-sm">{r.name}</p>
                              {r.optional && (
                                <span className="font-roboto text-[#9FFE0A] text-[10px] tracking-widest uppercase border border-[#9FFE0A]/40 px-1.5 py-0.5">
                                  Optional Upgrade
                                </span>
                              )}
                            </div>
                            <ul className="mt-1 space-y-1">
                              {r.reasons.map((reason) => (
                                <li key={reason} className="font-roboto text-[#DADADA]/60 text-xs leading-relaxed flex gap-1.5">
                                  <span className="text-[#9FFE0A] flex-shrink-0">·</span>
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </button>
                        <span className="font-kanit font-bold text-[#9FFE0A] text-lg whitespace-nowrap">
                          ${r.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-[#9FFE0A]/10 border border-[#9FFE0A]/30 p-4 flex items-center justify-between">
                <span className="font-roboto text-[#DADADA] text-sm">Total Package Price:</span>
                <span className="font-kanit font-black text-[#9FFE0A] text-2xl">${total.toLocaleString()}</span>
              </div>

              <div className="border border-[#DADADA]/20 bg-white/5 p-4 space-y-3">
                {captureStatus === 'sent' ? (
                  <p className="font-roboto text-[#9FFE0A] text-sm">
                    Got it — we&apos;ll text this estimate to {capturePhone} shortly.
                  </p>
                ) : (
                  <>
                    <p className="font-roboto text-[#DADADA]/70 text-xs">
                      Not ready to finish the estimator? Leave your number and we&apos;ll text you this exact estimate.
                    </p>
                    <form onSubmit={handleSendEstimate} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="tel"
                        required
                        placeholder="Phone number"
                        value={capturePhone}
                        onChange={(e) => setCapturePhone(e.target.value)}
                        className="flex-1 bg-transparent border border-[#DADADA]/25 text-white font-roboto text-sm px-4 py-2.5 focus:outline-none focus:border-[#9FFE0A] transition-colors placeholder:text-[#DADADA]/30 rounded-none"
                      />
                      <button
                        type="submit"
                        disabled={captureStatus === 'sending'}
                        className="btn-outline px-5 py-2.5 text-sm rounded-none disabled:opacity-50 whitespace-nowrap"
                      >
                        {captureStatus === 'sending' ? 'Sending…' : 'Text Me This →'}
                      </button>
                    </form>
                    {captureStatus === 'error' && (
                      <p className="font-roboto text-red-400 text-xs">
                        Something went wrong — call us directly at {STUDIO.phone}.
                      </p>
                    )}
                  </>
                )}
              </div>

              {comboEligible && (
                <div className="border border-[#9FFE0A] bg-[#9FFE0A]/10 p-4 space-y-1.5">
                  <span className="inline-block font-kanit font-bold text-[#1A292E] bg-[#9FFE0A] text-xs tracking-wide px-2 py-1">
                    🎁 COMBO BUNDLE DISCOUNT ELIGIBLE
                  </span>
                  <p className="font-roboto text-[#DADADA] text-sm leading-relaxed">
                    You&apos;ve selected a multi-service protection bundle. Leave your contact details below, and our
                    Studio Manager will apply your exclusive Combo Bundle Discount to send your final locked-in quote
                    within 2 hours.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed bottom nav bar — always visible, never clipped */}
        <div className="p-4 bg-[#111] border-t border-white/10 flex justify-between items-center z-10 flex-shrink-0 gap-3">
          {isResults ? (
            <>
              <button
                type="button"
                onClick={handleBack}
                className="btn-outline px-5 py-4 text-sm rounded-none flex-shrink-0"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={selectedItems.length === 0}
                className="btn-green flex-1 py-4 text-sm tracking-wider rounded-none disabled:opacity-60 disabled:cursor-not-allowed"
                id="tailored-quiz-apply-btn"
              >
                Apply Package to Price Estimator →
              </button>
            </>
          ) : (
            <>
              {step > 1 ? (
                <button type="button" onClick={handleBack} className="btn-outline px-5 py-2.5 text-sm rounded-none flex-shrink-0">
                  ← Back
                </button>
              ) : (
                <div />
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!canAdvance}
                className="btn-green flex-1 py-3 text-sm tracking-wider rounded-none disabled:opacity-40 disabled:cursor-not-allowed"
                id={`tailored-quiz-next-step-${step}`}
              >
                {step === 5 ? 'See My Package →' : 'Next Step →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
