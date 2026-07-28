'use client'

import { useState } from 'react'
import { useQuiz } from './QuizProvider'

const HAZARDS = [
  {
    icon: '◈',
    title: '01. Highway Debris & Rock Chips',
    teaser:
      'High-speed gravel, road debris, and swirl marks that dull and damage your factory paint.',
    popupTitle: 'Impact Absorption & Self-Healing',
    popupContent:
      'Paint Protection Film acts as a physical shock absorber. Elastic polymers dissipate impact energy from stones and gravel before reaching your clear coat. Built-in heat activation allows minor scratches and swirls to self-heal over time.',
  },
  {
    icon: '◉',
    title: '02. Chemical Grime & UV Fade',
    teaser:
      "Bird droppings, road salt, hard water spots, and UV radiation etching into your vehicle's clear coat.",
    popupTitle: '9H Hydrophobic Glass Matrix',
    popupContent:
      'Ceramic coating fills microscopic pores in factory paint, forming a slick, durable shield. Water and contaminants roll off easily, preventing chemical etching and making routine washes effortless.',
  },
  {
    icon: '◐',
    title: '03. Solar Heat & Interior Aging',
    teaser:
      'Extreme cabin heat, blinding glare, and UV rays drying out leather trim and overheating passengers.',
    popupTitle: 'Nano-Ceramic Thermal Barrier',
    popupContent:
      'Advanced Nano-Ceramic film targets infrared solar heat and blocks up to 99% of UV radiation. It maintains cabin comfort and protects leather trim without affecting mobile or GPS signal reception.',
  },
]

export default function RoadHazards() {
  const [activeHazard, setActiveHazard] = useState<(typeof HAZARDS)[0] | null>(null)
  const { openQuiz } = useQuiz()

  return (
    <section
      id="specs"
      className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Technical specifications"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
            ✦ TAILORED PROTECTION
          </p>
          <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
            Real Road Hazards.
            <br />
            <span className="text-[#9FFE0A]">Smart Protection Solutions.</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#9FFE0A]" />
        </div>

        {/* Hazard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {HAZARDS.map((hazard) => (
            <button
              key={hazard.title}
              type="button"
              onClick={() => setActiveHazard(hazard)}
              className="card-folded text-left bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-6 hover:border-[#9FFE0A]/40 transition-all duration-300 group"
              aria-label={`Learn more about ${hazard.title}`}
            >
              <span className="text-[#9FFE0A] text-2xl mb-4 block group-hover:scale-110 transition-transform duration-200">
                {hazard.icon}
              </span>
              <h3 className="font-kanit font-semibold text-white text-lg mb-2 group-hover:text-[#9FFE0A] transition-colors">
                {hazard.title}
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
                {hazard.teaser}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[#9FFE0A] text-xs font-roboto opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={openQuiz}
            className="btn-outline px-8 py-4 text-sm tracking-wider rounded-none inline-flex items-center gap-2"
            id="specs-quiz-btn"
          >
            <span>✦ Find Your Custom Protection Package (1-Min Quiz)</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hazard Modal */}
      {activeHazard && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Hazard protection details"
          onClick={(e) => { if (e.target === e.currentTarget) setActiveHazard(null) }}
        >
          <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#DADADA]/15">
              <h3 className="font-kanit font-bold text-white text-xl">{activeHazard.popupTitle}</h3>
              <button
                type="button"
                onClick={() => setActiveHazard(null)}
                className="text-[#DADADA] hover:text-[#9FFE0A] transition-colors p-1"
                aria-label="Close hazard modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <span className="text-[#9FFE0A] text-4xl block mb-4">{activeHazard.icon}</span>
              <p className="font-roboto text-[#DADADA] leading-relaxed">{activeHazard.popupContent}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
