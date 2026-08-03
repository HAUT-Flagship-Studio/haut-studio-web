import type { ReactNode } from 'react'
import Link from 'next/link'

export type ProcessBannerCard = {
  badge: string
  title: string
  description: string
}

export default function ProcessBanner({
  eyebrow = 'How It Works',
  heading,
  subtitle,
  cards,
  buttonText = 'View Our Full Process',
}: {
  eyebrow?: string
  heading: ReactNode
  subtitle: string
  cards?: ProcessBannerCard[]
  buttonText?: string
}) {
  return (
    <section
      className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Our process preview"
    >
      <div className={cards ? 'max-w-7xl mx-auto' : 'max-w-7xl mx-auto text-center'}>
        <div className={cards ? 'text-left' : ''}>
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">{eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">{heading}</h2>
          <p
            className={
              cards
                ? 'text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed mb-8 md:mb-12'
                : 'text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12'
            }
          >
            {subtitle}
          </p>
        </div>

        {cards && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
            {cards.map((card) => (
              <div
                key={card.badge}
                className="card-folded group flex flex-col bg-[#1A292E]/90 backdrop-blur border border-slate-800 hover:border-[#9FFE0A]/40 transition-all duration-300 hover:-translate-y-1 p-6"
              >
                <p className="text-[#9FFE0A] font-roboto text-xs tracking-[0.2em] uppercase mb-3">
                  {card.badge}
                </p>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className={cards ? 'text-center' : ''}>
          <Link
            href="/our-process"
            className="btn-outline px-8 py-4 text-sm tracking-wider rounded-none inline-flex items-center gap-2"
          >
            <span>{buttonText}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
