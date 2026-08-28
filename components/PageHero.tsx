'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import { useQuiz } from './QuizProvider'
import { STUDIO } from '@/lib/data'
import { PhoneLink } from './TrackedLinks'

export default function PageHero({
  eyebrow,
  heading,
  subtitle,
  ctaLabel = 'Get Custom Estimate',
  backgroundImage,
}: {
  eyebrow: string
  heading: ReactNode
  subtitle: string
  ctaLabel?: string
  backgroundImage?: string
}) {
  const { openQuiz } = useQuiz()

  return (
    <section
      className="relative precision-grid pt-40 pb-20 md:pt-48 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Page introduction"
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#1A292E]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_50%,rgba(0,0,0,0.5),transparent_75%)]" />
        </>
      )}

      <div className="absolute top-0 left-0 right-0 h-1 bg-[#9FFE0A] z-10" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 border border-[#9FFE0A]/40 bg-[#9FFE0A]/10 px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#9FFE0A] animate-pulse" />
          <span className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase">{eyebrow}</span>
        </div>

        <h1 className="font-kanit font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
          {heading}
        </h1>

        <p className="font-roboto text-[#DADADA] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={openQuiz}
            className="btn-green px-8 py-4 text-base tracking-wider rounded-none"
          >
            {ctaLabel}
          </button>
          <PhoneLink location="page_hero" className="btn-outline px-8 py-4 text-base tracking-wider rounded-none">
            Call Now: {STUDIO.phone}
          </PhoneLink>
        </div>
      </div>
    </section>
  )
}
