'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuiz } from './QuizProvider'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const HAZARDS = [
  {
    number: '01',
    title: 'Highway Debris & Rock Chips',
    teaser:
      'High-speed gravel, road debris, and swirl marks that dull and damage your factory paint.',
    fixLabel: 'Paint Protection Film',
    fixName: 'Impact Absorption & Self-Healing',
    fixDescription:
      'Paint Protection Film acts as a physical shock absorber. Elastic polymers dissipate impact energy from stones and gravel before reaching your clear coat. Built-in heat activation allows minor scratches and swirls to self-heal over time.',
    image: '/assets/service-ppf.webp',
    imageAlt: 'Paint protection film shielding a front bumper from rock chips',
    href: '/ppf',
  },
  {
    number: '02',
    title: 'Chemical Grime & UV Fade',
    teaser:
      "Bird droppings, road salt, hard water spots, and UV radiation etching into your vehicle's clear coat.",
    fixLabel: 'Ceramic Coating',
    fixName: '9H Hydrophobic Glass Matrix',
    fixDescription:
      'Ceramic coating fills microscopic pores in factory paint, forming a slick, durable shield. Water and contaminants roll off easily, preventing chemical etching and making routine washes effortless.',
    image: '/assets/service-ceramic-coating.webp',
    imageAlt: 'Ceramic coating beading water off a painted panel',
    href: '/ceramic',
  },
  {
    number: '03',
    title: 'Solar Heat & Interior Aging',
    teaser:
      'Extreme cabin heat, blinding glare, and UV rays drying out leather trim and overheating passengers.',
    fixLabel: 'Window Tinting',
    fixName: 'Nano-Ceramic Thermal Barrier',
    fixDescription:
      'Advanced Nano-Ceramic film targets infrared solar heat and blocks up to 99% of UV radiation. It maintains cabin comfort and protects leather trim without affecting mobile or GPS signal reception.',
    image: '/assets/service-window-tinting.webp',
    imageAlt: 'Ceramic window tint reducing cabin glare and heat',
    href: '/window-tint',
  },
]

function FixPreview({ hazard }: { hazard: (typeof HAZARDS)[0] }) {
  return (
    <>
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden card-folded border border-slate-800">
        <Image
          key={hazard.image}
          src={hazard.image}
          alt={hazard.imageAlt}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="mt-6">
        <p className="text-xs font-bold tracking-widest text-[#9FFE0A] uppercase mb-2">
          {hazard.fixLabel}
        </p>
        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-3">
          {hazard.fixName}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          {hazard.fixDescription}
        </p>
        <Link
          href={hazard.href}
          className="group inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#9FFE0A]"
        >
          Explore {hazard.fixLabel}
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </>
  )
}

export default function RoadHazards() {
  const [active, setActive] = useState(0)
  const { openAssessment } = useQuiz()
  const activeHazard = HAZARDS[active]

  return (
    <section
      id="specs"
      className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Technical specifications"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-left">
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">
            ✦ TAILORED PROTECTION
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Real Road Hazards.
            <br />
            <span className="text-[#9FFE0A]">Smart Protection Solutions.</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed mb-8 md:mb-12">
            From highway rock chips to UV fade and cabin heat soak, every hazard demands a
            different defense. We match the right film, coating, or tint to the threat your
            vehicle actually faces.
          </p>
        </div>

        {/* Mobile: fully expanded vertical feed (no accordions) */}
        <div className="md:hidden flex flex-col gap-10">
          {HAZARDS.map((hazard) => (
            <div key={hazard.title}>
              <span className="font-mono text-xs font-bold tracking-wider text-[#9FFE0A]">
                {hazard.number}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight mt-1">
                {hazard.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mt-2">{hazard.teaser}</p>
              <div className="mt-6">
                <FixPreview hazard={hazard} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: interactive list + sticky fix preview */}
        <div className="hidden md:grid md:grid-cols-2 gap-x-12 items-start">
          {/* Left: hazard list */}
          <div>
            {HAZARDS.map((hazard, index) => {
              const isActive = index === active
              return (
                <div key={hazard.title} className="border-b border-white/10 first:border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setActive(index)
                      if (typeof window !== 'undefined' && window.fbq) {
                        window.fbq('trackCustom', 'HazardViewed', { hazard: hazard.title })
                      }
                    }}
                    className="w-full text-left py-6 flex items-start gap-4 cursor-pointer transition-colors duration-200 hover:bg-white/[0.03] active:bg-white/[0.06]"
                    aria-pressed={isActive}
                  >
                    <span
                      className={`font-mono text-xs font-bold tracking-wider pt-1 transition-colors ${
                        isActive ? 'text-[#9FFE0A]' : 'text-[#DADADA]/40'
                      }`}
                    >
                      {hazard.number}
                    </span>
                    <div className="flex-1">
                      <h3
                        className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${
                          isActive ? 'text-white' : 'text-[#DADADA]/50'
                        }`}
                      >
                        {hazard.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed mt-2 transition-colors ${
                          isActive ? 'text-gray-400' : 'text-[#DADADA]/40'
                        }`}
                      >
                        {hazard.teaser}
                      </p>
                    </div>
                    {/* Indicator: shows which hazard drives the sticky preview */}
                    <svg
                      className={`w-4 h-4 mt-1 shrink-0 transition-transform duration-300 ${
                        isActive ? 'rotate-45 text-[#9FFE0A]' : 'text-[#DADADA]/40'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Right: sticky fix preview */}
          <div className="sticky top-24">
            <FixPreview hazard={activeHazard} />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={openAssessment}
            className="btn-green px-8 py-4 text-sm tracking-wider rounded-none inline-flex items-center gap-2"
            id="specs-quiz-btn"
          >
            <span>✦ Find Your Tailored Package (2-Min Assessment) →</span>
          </button>
        </div>
      </div>
    </section>
  )
}
