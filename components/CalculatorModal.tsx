'use client'

import { useEffect, useRef, useState } from 'react'
import {
  BODY_TYPES,
  CERAMIC,
  PPF,
  PPF_CYBERTRUCK_COLOR,
  resolvePPFOption,
  TINT,
  WSPF,
  type PPFChoice,
  type ServiceOption,
  type VehicleCategory,
} from '@/lib/pricing'
import { STUDIO } from '@/lib/data'
import { useDialogA11y } from '@/lib/useDialogA11y'
import { PhoneLink, SmsLink } from './TrackedLinks'
import ConsentNotice from './ConsentNotice'
import {
  serviceOfPage,
  setQuoteContext,
  track,
  trackLead,
  trackLeadFailed,
  trackLeadPixel,
  trackPriceViewed,
  trackQuoteFormViewed,
  leadEventId,
  LeadError,
} from '@/lib/analytics'
import { getAttribution } from '@/lib/attribution'

type CeramicChoice = keyof typeof CERAMIC
type TintChoice = 'none' | keyof typeof TINT
type WSPFChoice = 'none' | keyof typeof WSPF

/**
 * Which service the calculator leads with. The page the visitor came from
 * decides it: /ceramic opens on ceramic coating, /window-tint on tint, every
 * other page on PPF. The other two services move to the add-ons step, so a
 * ceramic ad never routes its visitor through a PPF step first.
 */
export type CalculatorService = 'ppf' | 'ceramic' | 'tint'

const SERVICES: CalculatorService[] = ['ppf', 'ceramic', 'tint']

/** `?service=ceramic` overrides the page; otherwise the path decides. */
export function calculatorServiceFor(pathname: string, search = ''): CalculatorService {
  const s = serviceOfPage(pathname, search)
  return s === 'none' ? 'ppf' : s
}

// The owner's reply promise, 2026-10-14. The sheet script reminds the sales
// chat at 15 minutes of studio hours, so the two agree.
const REPLY_PROMISE = "we'll text you within 15 minutes during business hours"


export interface CalculatorPrefill {
  vehicleLabel: string
  bodyType: VehicleCategory
  ppf: PPFChoice
  ceramic: CeramicChoice[]
  tint: TintChoice
  wspf: WSPFChoice
  notes?: string
}

interface FormData {
  bodyType: VehicleCategory | ''
  vehicleLabel: string
  ppf: PPFChoice
  ceramic: CeramicChoice[]
  tint: TintChoice
  wspf: WSPFChoice
  name: string
  phone: string
  email: string
  message: string
}

const INITIAL_FORM_DATA: FormData = {
  bodyType: '',
  vehicleLabel: '',
  ppf: 'none',
  ceramic: [],
  tint: 'none',
  wspf: 'none',
  name: '',
  phone: '',
  email: '',
  message: '',
}

const SERVICE_COPY: Record<CalculatorService, { title: string; subtitle: string; addon: string }> = {
  ppf: { title: 'Paint Protection Film', subtitle: 'Choose how much of your vehicle to protect.', addon: 'paint protection film' },
  ceramic: {
    title: 'Ceramic Coating',
    subtitle: 'Select any combination — Wheels, Body, and Interior can be added together.',
    addon: 'ceramic coating',
  },
  tint: { title: 'Window Tint', subtitle: 'Choose which windows to tint.', addon: 'window tint' },
}

// Owner's fact: the body coating price covers a light polish on a new car;
// swirled or scratched paint needs correction, priced only after inspection.
const CERAMIC_NOTE =
  'New car: light polish included. Paint with swirls or scratches: correction quoted after inspection, before work starts.'

function steps(service: CalculatorService) {
  const addons = SERVICES.filter((s) => s !== service).map((s) => SERVICE_COPY[s].addon)
  return [
    { title: 'What type of vehicle?', subtitle: 'Select the category that best describes your car.' },
    SERVICE_COPY[service],
    { title: 'Add-on services', subtitle: `Options include: ${addons.join(', ')}, and windshield protection.` },
    { title: 'Your contact details', subtitle: 'We will confirm your services' },
  ]
}

const PPF_ROWS: { id: PPFChoice; label: string; option: ServiceOption | null }[] = [
  { id: 'bikini', label: 'Bikini PPF', option: PPF.bikini },
  { id: 'frontEnd', label: 'Front End PPF', option: PPF.frontEnd },
  { id: 'highway', label: 'Highway PPF', option: PPF.highway },
  { id: 'fullBody', label: 'Full Body PPF', option: PPF.fullBody },
]

const CERAMIC_ROWS: { id: CeramicChoice; label: string; option: ServiceOption }[] = [
  { id: 'wheels', label: 'Wheels', option: CERAMIC.wheels },
  { id: 'body', label: 'Body', option: CERAMIC.body },
  { id: 'interior', label: 'Interior', option: CERAMIC.interior },
]

const TINT_ROWS: { id: TintChoice; label: string; option: ServiceOption | null }[] = [
  { id: 'twoFront', label: '2 Front', option: TINT.twoFront },
  { id: 'windshieldOnly', label: 'Windshield', option: TINT.windshieldOnly },
  { id: 'rearHalf', label: 'Rear Half', option: TINT.rearHalf },
  { id: 'fullCabin', label: 'Full Cabin', option: TINT.fullCabin },
]

const WSPF_ROWS: { id: WSPFChoice; label: string; option: ServiceOption | null }[] = [
  { id: 'windshieldArmor', label: 'Windshield Armor', option: WSPF.windshieldArmor },
]

function OptionRow<T extends string>({
  id,
  label,
  option,
  category,
  active,
  onSelect,
}: {
  id: T
  label: string
  option: ServiceOption | null
  category: VehicleCategory
  active: boolean
  onSelect: (id: T) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`w-full p-3 border text-left transition-all duration-200 rounded-none flex items-center justify-between ${
        active ? 'border-[#A3E635] bg-[#A3E635]/10' : 'border-[#DADADA]/20 hover:border-[#A3E635]/40'
      }`}
      aria-pressed={active}
    >
      <span className="font-kanit font-semibold text-white text-sm">{label}</span>
      <span className="font-kanit font-bold text-[#9FFE0A] text-sm whitespace-nowrap">
        {option ? `$${option.prices[category].toLocaleString()}+` : '$0'}
      </span>
    </button>
  )
}

export default function CalculatorModal({
  isOpen,
  onClose,
  initialStep = 1,
  prefill = null,
  service = 'ppf',
}: {
  isOpen: boolean
  onClose: () => void
  initialStep?: number
  prefill?: CalculatorPrefill | null
  service?: CalculatorService
}) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const focusedFields = useRef(new Set<string>())
  const stepRef = useRef(step)
  stepRef.current = step
  const submittedRef = useRef(submitted)
  submittedRef.current = submitted

  /** Closed without sending a request: which step they left on. */
  const handleClose = () => {
    if (!submittedRef.current) track('CalculatorClosed', { last_step: stepRef.current, service })
    onClose()
  }

  useDialogA11y(isOpen, dialogRef, handleClose)

  useEffect(() => {
    if (!isOpen) return
    if (prefill) {
      setFormData({
        ...INITIAL_FORM_DATA,
        bodyType: prefill.bodyType,
        vehicleLabel: prefill.vehicleLabel,
        ppf: prefill.ppf,
        ceramic: prefill.ceramic,
        tint: prefill.tint,
        wspf: prefill.wspf,
        message: prefill.notes ?? '',
      })
      setStep(initialStep)
    } else {
      setFormData(INITIAL_FORM_DATA)
      setStep(1)
    }
    setSubmitted(false)
    setError('')
    focusedFields.current = new Set()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const totalSteps = 4
  const isResults = false
  const category = (formData.bodyType || 'sedan') as VehicleCategory

  const ppfOption = resolvePPFOption(formData.ppf)
  const ceramicOptions = formData.ceramic.map((id) => CERAMIC[id])
  const tintOption = formData.tint !== 'none' ? TINT[formData.tint] : null
  const wspfOption = formData.wspf !== 'none' ? WSPF[formData.wspf] : null
  const selectedOptions = [ppfOption, ...ceramicOptions, tintOption, wspfOption].filter(
    (o): o is ServiceOption => o !== null
  )
  const total = selectedOptions.reduce((sum, o) => sum + o.prices[category], 0)
  const comboEligible = selectedOptions.length >= 2

  // The final step is the estimate screen — the price summary sits above the
  // contact form. Reaching it with something selected is a PriceViewed.
  const packageName = selectedOptions.map((o) => o.name).join(', ')
  const quote = { source: 'calculator' as const, service, vehicle: category, packageName, value: total }
  useEffect(() => {
    if (!isOpen || submitted) return
    track('CalculatorStepViewed', { step, service })
    if (step === 4) trackQuoteFormViewed(quote)
    if (step === 4 && total > 0) trackPriceViewed(quote)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, step])

  // A call or text tapped inside the calculator says what the quote was for.
  useEffect(() => {
    setQuoteContext(
      isOpen
        ? { service, vehicle_category: formData.bodyType || undefined, package: packageName || undefined, value: total || undefined }
        : null
    )
  }, [isOpen, service, formData.bodyType, packageName, total])

  if (!isOpen) return null

  const canAdvance = step === 1 ? !!formData.bodyType : true

  const toggleCeramic = (id: CeramicChoice) => {
    trackChoice('ceramic', CERAMIC[id], !formData.ceramic.includes(id))
    setFormData((p) => ({
      ...p,
      ceramic: p.ceramic.includes(id) ? p.ceramic.filter((c) => c !== id) : [...p.ceramic, id],
    }))
  }

  /** One-of-a-kind rows: picking another one undoes the previous choice. */
  const swap = (s: CalculatorService | 'wspf', prev: ServiceOption | null, next: ServiceOption | null, same: boolean) => {
    if (prev) trackChoice(s, prev, false)
    if (!same) trackChoice(s, next, true)
  }
  const selectPPF = (id: PPFChoice) => {
    swap('ppf', resolvePPFOption(formData.ppf), resolvePPFOption(id), formData.ppf === id)
    setFormData((p) => ({ ...p, ppf: p.ppf === id ? 'none' : id }))
  }
  const selectTint = (id: TintChoice) => {
    swap('tint', tintOption, id !== 'none' ? TINT[id] : null, formData.tint === id)
    setFormData((p) => ({ ...p, tint: p.tint === id ? 'none' : id }))
  }
  const selectWSPF = (id: WSPFChoice) => {
    swap('wspf', wspfOption, id !== 'none' ? WSPF[id] : null, formData.wspf === id)
    setFormData((p) => ({ ...p, wspf: p.wspf === id ? 'none' : id }))
  }

  /**
   * A choice made or undone. On the lead service's own step it is the
   * package; anything chosen on the add-ons step is an add-on.
   */
  const trackChoice = (s: CalculatorService | 'wspf', option: ServiceOption | null, selected: boolean) => {
    if (!option) return
    const value = option.prices[category]
    if (s === service) {
      if (selected) track('PackageSelected', { service, package: option.name, value, vehicle_category: category })
    } else {
      track(selected ? 'AddonSelected' : 'AddonRemoved', { service, addon: option.name, value, vehicle_category: category })
    }
  }

  const handleNext = () => {
    if (!canAdvance) return
    // QuizStarted belongs to the 2-Min Assessment; the calculator has its own.
    if (step === 1) track('CalculatorStarted', { vehicle: formData.bodyType, vehicle_category: formData.bodyType, service })
    setStep((s) => Math.min(s + 1, totalSteps))
  }

  /** Straight from the prices to the form; the add-ons stay one Back away. */
  const handleRequestQuote = () => {
    track('CTAClick', { cta_id: 'calculator_request_quote', location: 'calculator', service })
    setStep(4)
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleReset = () => {
    setStep(1)
    setFormData(INITIAL_FORM_DATA)
    setError('')
    setSubmitted(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const eventId = leadEventId()
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service,
          estimatedPrice: total,
          vehicleLabel: formData.vehicleLabel || formData.bodyType,
          selectedServices: selectedOptions.map((o) => o.name),
          source: 'calculator',
          eventId,
          eventSourceUrl: window.location.href,
          attribution: getAttribution(),
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new LeadError(body?.error === 'not_configured' ? 'not_configured' : 'delivery_failed')
      }
      trackLeadPixel({ source: 'calculator', service, vehicle: category, packageName, value: total }, eventId)
      trackLead({ value: total })
      setSubmitted(true)
    } catch (err) {
      trackLeadFailed(err instanceof LeadError ? err.reason : 'network', false)
      track('FormError', { field: 'delivery', service })
      setError(`Something went wrong. Please call us directly at ${STUDIO.phone}.`)
    } finally {
      setSubmitting(false)
    }
  }

  const progressPct = ((step - 1) / (totalSteps - 1)) * 100
  const STEPS = steps(service)

  // The rows for one service. The lead service gets step 2 to itself; the
  // other two render as boxed add-on sections on step 3.
  const serviceRows = (s: CalculatorService) => {
    if (s === 'ppf') {
      return (
        <div className="space-y-2">
          {PPF_ROWS.map((row) => (
            <OptionRow
              key={row.id}
              id={row.id}
              label={row.label}
              option={row.option}
              category={category}
              active={formData.ppf === row.id}
              onSelect={selectPPF}
            />
          ))}
          {category === 'cybertruck' && (
            <OptionRow
              id="colorPPF"
              label={PPF_CYBERTRUCK_COLOR.name}
              option={PPF_CYBERTRUCK_COLOR}
              category={category}
              active={formData.ppf === 'colorPPF'}
              onSelect={selectPPF}
            />
          )}
        </div>
      )
    }
    if (s === 'ceramic') {
      return (
        <div className="space-y-2">
          {CERAMIC_ROWS.map((row) => (
            <OptionRow
              key={row.id}
              id={row.id}
              label={row.label}
              option={row.option}
              category={category}
              active={formData.ceramic.includes(row.id)}
              onSelect={toggleCeramic}
            />
          ))}
          <p className="font-roboto text-[#DADADA]/60 text-xs leading-relaxed pt-1">{CERAMIC_NOTE}</p>
        </div>
      )
    }
    return (
      <div className="space-y-2">
        {TINT_ROWS.map((row) => (
          <OptionRow
            key={row.id}
            id={row.id}
            label={row.label}
            option={row.option}
            category={category}
            active={formData.tint === row.id}
            onSelect={selectTint}
          />
        ))}
      </div>
    )
  }

  // Prefilled text for the studio: the package chosen and the car it is for.
  const vehicleText =
    formData.vehicleLabel || BODY_TYPES.find((b) => b.id === formData.bodyType)?.label || 'car'
  const smsBody = `Hi, I'd like a quote for ${packageName || SERVICE_COPY[service].addon} on my ${vehicleText}`

  const contactRow = (location: string) => (
    <div className="grid grid-cols-2 gap-2">
      <PhoneLink location={location} className="btn-outline py-2.5 text-sm text-center rounded-none">
        Call now
      </PhoneLink>
      <SmsLink location={location} body={smsBody} className="btn-outline py-2.5 text-sm text-center rounded-none">
        Text us
      </SmsLink>
    </div>
  )

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Quote Calculator"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#DADADA]/15 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase">
                Step {step} of {totalSteps}
              </p>
              <button
                type="button"
                onClick={handleReset}
                disabled={submitting}
                className="text-[#DADADA]/50 hover:text-[#9FFE0A] font-roboto text-xs underline underline-offset-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>
            <h2 className="font-kanit font-bold text-white text-xl">{STEPS[step - 1].title}</h2>
            <p className="font-roboto text-[#DADADA]/60 text-sm mt-0.5">{STEPS[step - 1].subtitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-[#DADADA] hover:text-[#9FFE0A] transition-colors flex-shrink-0"
            aria-label="Close calculator"
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
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-[#9FFE0A] text-5xl mb-4">✓</div>
              <h3 className="font-kanit font-bold text-white text-2xl mb-2">
                Thanks, {REPLY_PROMISE}.
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mb-4">
                Business hours: {STUDIO.hours}. For immediate assistance, call us directly.
              </p>
              {total > 0 && (
                <div className="bg-[#9FFE0A]/10 border border-[#9FFE0A]/30 p-4 mb-6">
                  <p className="text-[#DADADA] text-xs font-roboto mb-1">Estimated Starting Price</p>
                  <p className="font-kanit font-black text-[#9FFE0A] text-4xl">${total.toLocaleString()}</p>
                </div>
              )}
              <PhoneLink location="quote_modal_success" className="btn-green px-6 py-3 text-sm inline-block rounded-none">
                Call {STUDIO.phone}
              </PhoneLink>
            </div>
          ) : (
            <>
              {/* Step 1 — Vehicle Type */}
              {step === 1 && (
                <div className="grid grid-cols-2 gap-2">
                  {BODY_TYPES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        if (formData.bodyType !== b.id) track('VehicleSelected', { vehicle_category: b.id, service })
                        setFormData((p) => ({ ...p, bodyType: b.id }))
                      }}
                      className={`p-4 border text-left transition-all duration-200 rounded-none ${
                        formData.bodyType === b.id ? 'border-[#9FFE0A] bg-[#9FFE0A]/10' : 'border-[#DADADA]/20 hover:border-[#9FFE0A]/40'
                      }`}
                      aria-pressed={formData.bodyType === b.id}
                    >
                      <span className="font-kanit font-semibold text-white text-sm">{b.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2 — the lead service for this page */}
              {step === 2 && (
                <div className="space-y-5">
                  {serviceRows(service)}
                  {contactRow('calculator_prices')}
                </div>
              )}

              {/* Step 3 — Add-ons: the other two services and windshield film */}
              {step === 3 && (
                <div className="space-y-4">
                  {SERVICES.filter((s) => s !== service).map((s) => (
                    <div key={s} className="border border-[#DADADA]/10 bg-white/5 p-4 rounded-none">
                      <p className="font-kanit font-semibold text-white text-sm uppercase tracking-wide mb-1">{SERVICE_COPY[s].title}</p>
                      <p className="font-roboto text-[#DADADA]/50 text-xs mb-3">{SERVICE_COPY[s].subtitle}</p>
                      {serviceRows(s)}
                    </div>
                  ))}

                  <div className="border border-[#DADADA]/10 bg-white/5 p-4 rounded-none">
                    <p className="font-kanit font-semibold text-white text-sm uppercase tracking-wide mb-3">Windshield Protection Film</p>
                    <div className="space-y-2">
                      {WSPF_ROWS.map((row) => (
                        <OptionRow
                          key={row.id}
                          id={row.id}
                          label={row.label}
                          option={row.option}
                          category={category}
                          active={formData.wspf === row.id}
                          onSelect={selectWSPF}
                        />
                      ))}
                    </div>
                  </div>

                  {total > 0 && (
                    <div className="bg-[#9FFE0A]/10 border border-[#9FFE0A]/30 p-3 flex items-center justify-between">
                      <span className="font-roboto text-[#DADADA] text-sm">Estimated Total:</span>
                      <span className="font-kanit font-black text-[#9FFE0A] text-xl">${total.toLocaleString()}+</span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4 — Contact Form */}
              {step === 4 && (
                <form
                  ref={formRef}
                  data-clarity-mask="true"
                  onSubmit={handleSubmit}
                  onFocus={(e) => {
                    const name = (e.target as unknown as HTMLInputElement).name
                    const field = name === 'message' ? 'notes' : name
                    if (!field || focusedFields.current.has(field)) return
                    focusedFields.current.add(field)
                    track('FormFieldFocus', { field, service })
                  }}
                  onInvalidCapture={(e) => {
                    track('FormError', { field: (e.target as HTMLInputElement).name || 'unknown', service })
                  }}
                  className="space-y-4"
                >
                  {selectedOptions.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {selectedOptions.map((o) => (
                        <div key={o.id} className="flex items-center justify-between text-sm font-roboto">
                          <span className="text-[#DADADA]">{o.name}</span>
                          <span className="text-[#9FFE0A] font-kanit font-bold">${o.prices[category].toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="bg-[#9FFE0A]/10 border border-[#9FFE0A]/30 p-3 flex items-center justify-between mt-2">
                        <span className="font-roboto text-[#DADADA] text-sm">Your Estimate:</span>
                        <span className="font-kanit font-black text-[#9FFE0A] text-xl">${total.toLocaleString()}+</span>
                      </div>
                    </div>
                  )}

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

                  {[
                    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith', required: true },
                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (201) 555-0100', required: true },
                    { name: 'email', label: 'Email Address (optional)', type: 'email', placeholder: 'john@email.com', required: false },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block font-roboto text-[#DADADA] text-xs tracking-wide uppercase mb-1.5">
                        {field.label} {field.required && <span className="text-[#9FFE0A]">*</span>}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.name as keyof FormData] as string}
                        onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
                        className="w-full bg-transparent border border-[#DADADA]/25 text-white font-roboto text-sm px-4 py-3 focus:outline-none focus:border-[#9FFE0A] transition-colors placeholder:text-[#DADADA]/30 rounded-none"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-roboto text-[#DADADA] text-xs tracking-wide uppercase mb-1.5">
                      Notes (optional)
                    </label>
                    <textarea
                      name="message"
                      placeholder="Vehicle year, make, model, paint color, or any special instructions..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      className="w-full bg-transparent border border-[#DADADA]/25 text-white font-roboto text-sm px-4 py-3 focus:outline-none focus:border-[#9FFE0A] transition-colors placeholder:text-[#DADADA]/30 rounded-none resize-none"
                    />
                  </div>
                  {error && <p className="text-red-400 font-roboto text-sm">{error}</p>}
                  <ConsentNotice />
                  <p className="font-roboto text-[#DADADA]/40 text-xs text-center">
                    No spam. No pressure. We text back within 15 minutes during business hours.
                  </p>
                  {contactRow('calculator_form')}
                </form>
              )}
            </>
          )}
        </div>

        {/* Fixed bottom nav bar — always visible, never clipped */}
        {!submitted && (
          <div className="p-4 bg-[#111] border-t border-white/10 z-10 flex-shrink-0 space-y-2">
          <div className="flex justify-between items-center gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                className="btn-outline px-5 py-3 text-sm rounded-none flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canAdvance}
                className="btn-green flex-1 py-3 text-sm tracking-wider rounded-none disabled:opacity-40 disabled:cursor-not-allowed"
                id={`quiz-next-step-${step}`}
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
                disabled={submitting}
                className="btn-green flex-1 py-3 text-sm tracking-wider rounded-none disabled:opacity-60"
                id="quiz-submit-btn"
              >
                {submitting ? 'Sending...' : 'Submit My Request →'}
              </button>
            )}
          </div>
          {step === 2 && (
            <button
              type="button"
              onClick={handleRequestQuote}
              className="btn-outline w-full py-3 text-sm tracking-wider rounded-none"
              id="quiz-request-quote"
            >
              Request my quote
            </button>
          )}
          </div>
        )}
      </div>
    </div>
  )
}
