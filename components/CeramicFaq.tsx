'use client'

import { useState } from 'react'

const CERAMIC_FAQ_ITEMS = [
  {
    question: 'How long does HAUT Ceramic last?',
    answer:
      "HAUT Ceramic is a single application that holds its hydrophobic gloss for years, not months — unlike a spray sealant or wax that washes out after a handful of cleanings. Actual lifespan depends on parking conditions and wash habits, which we'll walk through at your consultation.",
  },
  {
    question: 'Do I need paint correction before coating?',
    answer:
      "Yes, if your paint has swirl marks, light scratches, or oxidation. HAUT Ceramic bonds directly to whatever is on the surface when it cures, so any defects underneath get sealed in permanently along with the gloss. Every application starts with a multi-stage machine correction to remove them first.",
  },
  {
    question: 'Can I use an automatic car wash after ceramic coating?',
    answer:
      'Touchless automatic washes are safe. We recommend avoiding automatic brush washes — the stiff bristles will dull the hydrophobic finish faster than hand washing or a touchless wash with pH-neutral soap.',
  },
  {
    question: 'Can HAUT Ceramic be applied over PPF or a vinyl wrap?',
    answer:
      "Yes. HAUT Ceramic bonds to clear coat, paint protection film, and vinyl wrap alike, adding a sacrificial hydrophobic layer on top — it takes the UV and chemical exposure that would otherwise stain or prematurely yellow the film underneath.",
  },
]

export default function CeramicFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Ceramic coating frequently asked questions"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12 text-left">
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">
            ✦ Common Questions
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            HAUT Ceramic,
            <br />
            <span className="text-[#9FFE0A]">Answered.</span>
          </h2>
        </div>

        <div className="max-w-3xl border-t border-white/10">
          {CERAMIC_FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.question} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left py-6 flex items-start justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                    {item.question}
                  </span>
                  <span
                    className={`font-kanit font-bold text-lg mt-0.5 shrink-0 transition-colors ${
                      isOpen ? 'text-[#9FFE0A]' : 'text-[#DADADA]/40'
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? '✕' : '+'}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[320px] pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
