'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import { useQuiz } from './QuizProvider'
import { STUDIO } from '@/lib/data'

const DEFAULT_HEADING = (
  <>
    <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">Rock Chips.</span>
    <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">Swirl Marks.</span>
    <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">UV Fade.</span>
    <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#9FFE0A]">Stopped Cold.</span>
  </>
)

const DEFAULT_TRUST_BADGES = [
  'Climate-Controlled Studio',
  '100% Digital Plotter Cut (Zero Blades)',
  'Custom Extended-Wrapped Edges',
  '10-Year Transferable Warranty',
]

export default function Hero({
  locationBadge = 'Hackensack, NJ • Certified Master Installers',
  heading = DEFAULT_HEADING,
  subtitle = 'Preserve your irreplaceable factory finish with self-healing optical TPU. Digitally cut with zero razor blades on paint, extended for wrapped edges, and backed by a 10-year manufacturer warranty.',
  trustBadges = DEFAULT_TRUST_BADGES,
  backgroundImage = '/assets/hero-car-photo.webp',
}: {
  locationBadge?: string
  heading?: ReactNode
  subtitle?: string
  trustBadges?: string[]
  backgroundImage?: string
}) {
  const { openQuiz } = useQuiz()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A292E]"
      aria-label="Hero section"
    >

      {/* Background photo */}
      <Image
        src={backgroundImage}
        alt="HAUT PPF Studio paint protection film installation"
        fill
        priority
        className="object-contain object-center -translate-y-[275px] md:translate-y-0 md:object-cover md:object-center"
        unoptimized
      />
      <div className="absolute inset-0 bg-[#1A292E]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_65%_at_28%_50%,rgba(0,0,0,0.4),transparent_70%)]" />

      {/* Green accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#9FFE0A] z-10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Location pill */}
          <div className="flex justify-start mb-6">
            <div className="inline-flex items-center gap-2 border border-[#9FFE0A]/40 bg-[#9FFE0A]/10 px-4 py-1.5 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-[#9FFE0A] animate-pulse" />
              <span className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase">
                {locationBadge}
              </span>
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-kanit font-black text-white leading-none mb-6 animate-slide-in">
            {heading}
          </h1>

          {/* Sub-headline */}
          <p className="font-roboto text-[#DADADA] text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-up">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
            <button
              onClick={openQuiz}
              className="btn-green px-8 py-4 text-base tracking-wider rounded-none inline-flex items-center justify-center gap-2"
              aria-label="Get my custom PPF estimate"
              id="hero-cta-quiz"
            >
              Get Custom Estimate
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a
              href={STUDIO.phoneHref}
              className="btn-outline px-8 py-4 text-base tracking-wider rounded-none inline-flex items-center justify-center gap-2"
              aria-label="Call HAUT Flagship Studio"
              id="hero-cta-call"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now: {STUDIO.phone}
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-left">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center justify-start gap-2 text-sm">
                <span className="text-[#9FFE0A] text-xs">✦</span>
                <span className="text-[#DADADA] font-roboto">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
