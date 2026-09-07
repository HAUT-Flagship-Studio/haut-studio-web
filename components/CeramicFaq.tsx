'use client'

import { useState } from 'react'

import { CERAMIC_FAQ_ITEMS } from '@/lib/data'

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
