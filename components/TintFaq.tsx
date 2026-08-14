'use client'

import { useState } from 'react'

const TINT_FAQ_ITEMS = [
  {
    question: 'What tint darkness (VLT) can I get in New Jersey?',
    answer:
      "New Jersey law requires front side windows and the windshield to let in more than 70% of light, so both can only take the lightest legal shade. Rear side windows and the rear windshield can go as dark as 5% VLT. We'll confirm the legal option for each window at your consultation, so what you drive off with is street-legal from day one.",
  },
  {
    question: 'Will ceramic tint interfere with my phone or GPS signal?',
    answer:
      'No. HAUT uses ceramic IR film with non-metallic particles, so it blocks heat without interfering with radio, GPS, or phone signal — unlike older dyed or metallic films.',
  },
  {
    question: 'How long before I can roll down my windows?',
    answer:
      "Give the adhesive several days to fully cure before rolling a freshly tinted window down — exact timing depends on the film and the weather. We'll walk you through the timeline for your vehicle at pickup.",
  },
  {
    question: 'Can I combine window tint with PPF or ceramic coating?',
    answer:
      "Yes. Window tint is applied to the glass, so it doesn't interact with PPF or ceramic coating on the painted panels — most clients combine all three in one visit.",
  },
]

export default function TintFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Window tint frequently asked questions"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12 text-left">
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">
            ✦ Common Questions
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Window Tint,
            <br />
            <span className="text-[#9FFE0A]">Answered.</span>
          </h2>
        </div>

        <div className="max-w-3xl border-t border-white/10">
          {TINT_FAQ_ITEMS.map((item, index) => {
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
