'use client'

import { useState } from 'react'

const PPF_FAQ_ITEMS = [
  {
    question: 'Will razor blades touch my paint during installation?',
    answer:
      "No. Every panel pattern is 100% digitally cut with HAUT Precision Scan technology before it ever reaches your vehicle. Installers hand-tuck and heat-form each edge on the car — a blade never makes contact with your clear coat.",
  },
  {
    question: 'Can I wash my car normally with PPF installed?',
    answer:
      'Yes — hand washing and touchless car washes are completely safe once the film has cured. We recommend avoiding automatic brush washes permanently, since stiff bristles can trap grit against film edges and cause premature lifting.',
  },
  {
    question: 'What happens if a rock damages the film?',
    answer:
      'Minor impacts are absorbed by the film and often self-heal with sunlight or heat. If a deeper chip or gouge does get through, only that panel section needs to be replaced — your factory paint underneath stays untouched and fully protected.',
  },
  {
    question: 'Is the 10-year warranty transferable if I sell the car?',
    answer:
      'Yes. The manufacturer warranty is fully transferable to the next owner at no cost — a meaningful resale talking point for buyers who care about factory paint condition.',
  },
]

export default function PPFFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Detailed PPF questions for meticulous owners"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12 text-left">
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">
            ✦ For Meticulous Owners
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            The Technical Questions
            <br />
            <span className="text-[#9FFE0A]">Detail-Oriented Owners Ask.</span>
          </h2>
        </div>

        <div className="max-w-3xl border-t border-white/10">
          {PPF_FAQ_ITEMS.map((item, index) => {
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
