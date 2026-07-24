import type { ReactNode } from 'react'
import Link from 'next/link'

export default function ProcessBanner({
  eyebrow = 'How It Works',
  heading,
  subtitle,
}: {
  eyebrow?: string
  heading: ReactNode
  subtitle: string
}) {
  return (
    <section
      className="bg-[#1A292E] precision-grid py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      aria-label="Our process preview"
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">{eyebrow}</p>
        <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">{heading}</h2>
        <p className="font-roboto text-[#DADADA]/70 text-base leading-relaxed max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        <Link
          href="/our-process"
          className="btn-outline px-8 py-4 text-sm tracking-wider rounded-none inline-flex items-center gap-2"
        >
          <span>View Our Full Process</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
