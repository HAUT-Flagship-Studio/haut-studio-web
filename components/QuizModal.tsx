'use client'

import { useState } from 'react'
import { PPF_PACKAGES, CERAMIC_PACKAGE, WINDOW_TINT_PACKAGES, STUDIO } from '@/lib/data'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const STEPS = [
  {
    id: 1,
    title: 'What type of vehicle?',
    subtitle: 'Select the category that best describes your car.',
  },
  {
    id: 2,
    title: 'Select coverage level',
    subtitle: 'Choose how much of your vehicle to protect.',
  },
  {
    id: 3,
    title: 'Add-on services',
    subtitle: 'Combine with ceramic or tint for full protection.',
  },
  {
    id: 4,
    title: 'Your contact details',
    subtitle: 'We\'ll send your personalised quote within 2 hours.',
  },
]

const VEHICLE_TYPES = [
  { id: 'sedan', label: 'Sedan / Coupe', icon: '🚗', multiplier: 1 },
  { id: 'suv', label: 'SUV / Crossover', icon: '🚙', multiplier: 1.15 },
  { id: 'truck', label: 'Truck / Van', icon: '🛻', multiplier: 1.2 },
  { id: 'exotic', label: 'Exotic / Supercar', icon: '🏎️', multiplier: 1.35 },
]

const COVERAGE_LEVELS = PPF_PACKAGES.map((pkg) => ({
  id: pkg.id,
  label: pkg.name,
  basePrice: pkg.price,
  description: pkg.tagline,
}))

const ADDONS = [
  {
    id: 'ceramic',
    label: CERAMIC_PACKAGE.name,
    price: CERAMIC_PACKAGE.price,
    description: CERAMIC_PACKAGE.tagline,
  },
  {
    id: 'window-tint',
    label: 'Window Tinting',
    price: WINDOW_TINT_PACKAGES[1].price,
    description: WINDOW_TINT_PACKAGES[1].tagline,
  },
]

interface FormData {
  vehicle: string
  coverage: string
  addons: string[]
  name: string
  phone: string
  email: string
  message: string
}

const INITIAL_FORM_DATA: FormData = {
  vehicle: '',
  coverage: '',
  addons: [],
  name: '',
  phone: '',
  email: '',
  message: '',
}

export default function QuizModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const vehicleType = VEHICLE_TYPES.find((v) => v.id === formData.vehicle)
  const coverageLevel = COVERAGE_LEVELS.find((c) => c.id === formData.coverage)
  const addonsTotal = ADDONS.filter((a) => formData.addons.includes(a.id)).reduce(
    (sum, a) => sum + a.price,
    0
  )
  const estimatedPrice = coverageLevel
    ? Math.round(coverageLevel.basePrice * (vehicleType?.multiplier || 1)) + addonsTotal
    : null

  const handleNext = () => {
    if (step === 1 && !formData.vehicle) return
    if (step === 2 && !formData.coverage) return

    if (step === 1) {
      // Fire QuizStarted pixel event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'QuizStarted', { vehicle: formData.vehicle })
      }
    }
    setStep((s) => Math.min(s + 1, 4))
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleReset = () => {
    setStep(1)
    setFormData(INITIAL_FORM_DATA)
    setError('')
    setSubmitted(false)
  }

  const toggleAddon = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      addons: prev.addons.includes(id)
        ? prev.addons.filter((a) => a !== id)
        : [...prev.addons, id],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimatedPrice,
          vehicleLabel: vehicleType?.label,
          coverageLabel: coverageLevel?.label,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      // Fire Lead pixel event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          value: estimatedPrice,
          currency: 'USD',
          content_name: coverageLevel?.label,
        })
      }
      setSubmitted(true)
    } catch {
      setError(`Something went wrong. Please call us directly at ${STUDIO.phone}.`)
    } finally {
      setSubmitting(false)
    }
  }

  const progressPct = ((step - 1) / 3) * 100

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="PPF Quote Calculator"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 w-full max-w-lg">
        {/* Header */}
        <div className="p-6 border-b border-[#DADADA]/15 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase">
                Step {step} of 4
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
            <h2 className="font-kanit font-bold text-white text-xl">
              {STEPS[step - 1].title}
            </h2>
            <p className="font-roboto text-[#DADADA]/60 text-sm mt-0.5">
              {STEPS[step - 1].subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#DADADA] hover:text-[#9FFE0A] transition-colors flex-shrink-0"
            aria-label="Close calculator"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="quiz-progress mx-6 mt-4">
          <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-[#9FFE0A] text-5xl mb-4">✓</div>
              <h3 className="font-kanit font-bold text-white text-2xl mb-2">Quote Received!</h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mb-4">
                We&apos;ll review your vehicle details and send a precise quote within 2 hours.
                For immediate assistance, call us directly.
              </p>
              {estimatedPrice && (
                <div className="bg-[#9FFE0A]/10 border border-[#9FFE0A]/30 p-4 mb-6">
                  <p className="text-[#DADADA] text-xs font-roboto mb-1">Estimated Starting Price</p>
                  <p className="font-kanit font-black text-[#9FFE0A] text-4xl">
                    ${estimatedPrice.toLocaleString()}
                  </p>
                </div>
              )}
              <a href={STUDIO.phoneHref} className="btn-green px-6 py-3 text-sm inline-block rounded-none">
                Call {STUDIO.phone}
              </a>
            </div>
          ) : (
            <>
              {/* Step 1 — Vehicle Type */}
              {step === 1 && (
                <div className="grid grid-cols-2 gap-3">
                  {VEHICLE_TYPES.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setFormData((p) => ({ ...p, vehicle: v.id }))}
                      className={`p-4 border text-left transition-all duration-200 rounded-none ${
                        formData.vehicle === v.id
                          ? 'border-[#9FFE0A] bg-[#9FFE0A]/10'
                          : 'border-[#DADADA]/20 hover:border-[#9FFE0A]/40'
                      }`}
                      aria-pressed={formData.vehicle === v.id}
                    >
                      <span className="text-2xl block mb-2">{v.icon}</span>
                      <span className="font-kanit font-semibold text-white text-sm">{v.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2 — Coverage Level */}
              {step === 2 && (
                <div className="space-y-3">
                  {COVERAGE_LEVELS.map((c) => {
                    const price = Math.round(c.basePrice * (vehicleType?.multiplier || 1))
                    return (
                      <button
                        key={c.id}
                        onClick={() => setFormData((p) => ({ ...p, coverage: c.id }))}
                        className={`w-full p-4 border text-left transition-all duration-200 rounded-none flex items-center justify-between ${
                          formData.coverage === c.id
                            ? 'border-[#9FFE0A] bg-[#9FFE0A]/10'
                            : 'border-[#DADADA]/20 hover:border-[#9FFE0A]/40'
                        }`}
                        aria-pressed={formData.coverage === c.id}
                      >
                        <div>
                          <p className="font-kanit font-semibold text-white text-sm">{c.label}</p>
                          <p className="font-roboto text-[#DADADA]/60 text-xs mt-0.5">{c.description}</p>
                        </div>
                        <span className="font-kanit font-bold text-[#9FFE0A] text-lg whitespace-nowrap ml-4">
                          ${price.toLocaleString()}+
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Step 3 — Add-ons */}
              {step === 3 && (
                <div className="space-y-3">
                  <p className="font-roboto text-[#DADADA]/60 text-xs mb-4">
                    Optional — select any add-on services to include in your quote.
                  </p>
                  {ADDONS.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full p-4 border text-left transition-all duration-200 rounded-none flex items-center justify-between ${
                        formData.addons.includes(addon.id)
                          ? 'border-[#9FFE0A] bg-[#9FFE0A]/10'
                          : 'border-[#DADADA]/20 hover:border-[#9FFE0A]/40'
                      }`}
                      aria-pressed={formData.addons.includes(addon.id)}
                    >
                      <div>
                        <p className="font-kanit font-semibold text-white text-sm">{addon.label}</p>
                        <p className="font-roboto text-[#DADADA]/60 text-xs mt-0.5">{addon.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-kanit font-bold text-[#9FFE0A] text-sm whitespace-nowrap">
                          +${addon.price}
                        </span>
                        <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 ${
                          formData.addons.includes(addon.id)
                            ? 'border-[#9FFE0A] bg-[#9FFE0A]'
                            : 'border-[#DADADA]/40'
                        }`}>
                          {formData.addons.includes(addon.id) && (
                            <svg className="w-3 h-3 text-[#1A292E]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}

                  {estimatedPrice && (
                    <div className="mt-4 bg-[#9FFE0A]/10 border border-[#9FFE0A]/30 p-3 flex items-center justify-between">
                      <span className="font-roboto text-[#DADADA] text-sm">Estimated Total:</span>
                      <span className="font-kanit font-black text-[#9FFE0A] text-xl">
                        ${estimatedPrice.toLocaleString()}+
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4 — Contact Form */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {estimatedPrice && (
                    <div className="bg-[#9FFE0A]/10 border border-[#9FFE0A]/30 p-3 flex items-center justify-between mb-4">
                      <span className="font-roboto text-[#DADADA] text-sm">Your Estimate:</span>
                      <span className="font-kanit font-black text-[#9FFE0A] text-xl">
                        ${estimatedPrice.toLocaleString()}+
                      </span>
                    </div>
                  )}
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith', required: true },
                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (201) 555-0100', required: true },
                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@email.com', required: true },
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
                  {error && (
                    <p className="text-red-400 font-roboto text-sm">{error}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={submitting}
                      className="btn-outline px-5 py-4 text-sm rounded-none flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-green flex-1 py-4 text-sm tracking-wider rounded-none disabled:opacity-60"
                      id="quiz-submit-btn"
                    >
                      {submitting ? 'Sending...' : 'Send My Quote Request →'}
                    </button>
                  </div>
                  <p className="font-roboto text-[#DADADA]/40 text-xs text-center">
                    No spam. No pressure. We reply within 2 hours.
                  </p>
                </form>
              )}

              {/* Navigation */}
              {step < 4 && (
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#DADADA]/15">
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="btn-outline px-5 py-2.5 text-sm rounded-none"
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={handleNext}
                    disabled={(step === 1 && !formData.vehicle) || (step === 2 && !formData.coverage)}
                    className="btn-green px-6 py-2.5 text-sm rounded-none disabled:opacity-40 disabled:cursor-not-allowed"
                    id={`quiz-next-step-${step}`}
                  >
                    {step === 3 ? 'Continue →' : 'Next →'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
