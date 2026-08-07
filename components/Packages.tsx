'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import { useQuiz } from './QuizProvider'
import type { PackageItem } from '@/lib/data'

const DEFAULT_TITLE = (
  <>
    Choose Your
    <br />
    <span className="text-[#9FFE0A]">Coverage Level</span>
  </>
)

export default function Packages({
  packages,
  eyebrow = 'Pricing & Packages',
  title = DEFAULT_TITLE,
  note = 'All packages use the same self-healing optical TPU film with a 10-year manufacturer warranty. The difference is surface area — not quality.',
}: {
  packages: PackageItem[]
  eyebrow?: string
  title?: ReactNode
  note?: string
}) {
  const { openQuiz } = useQuiz()

  return (
    <section
      id="packages"
      className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Service packages"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
            {eyebrow}
          </p>
          <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          <p className="font-roboto text-[#DADADA]/70 mt-4 max-w-xl">{note}</p>
        </div>

        {/* Bento Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
            packages.length >= 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'
          }`}
        >
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              id={`package-${pkg.id}`}
              className={`card-folded flex flex-col border transition-all duration-300 group hover:-translate-y-1 bg-[#1A292E]/90 backdrop-blur ${
                pkg.featured
                  ? 'border-[#9FFE0A]/60 ring-1 ring-[#9FFE0A]/30'
                  : 'border-slate-800 hover:border-[#9FFE0A]/30'
              }`}
              aria-label={`${pkg.name} package — starting from $${pkg.price.toLocaleString()}`}
            >
              {/* Featured badge */}
              {pkg.featured && (
                <div className="bg-[#9FFE0A] text-[#1A292E] text-center py-1.5">
                  <span className="font-kanit font-bold text-xs tracking-[0.15em] uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Package Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.imageAlt}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  unoptimized
                />
                {/* Price overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A292E] to-transparent p-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-roboto text-[#DADADA] text-xs">From</span>
                    <span className="font-kanit font-black text-[#9FFE0A] text-3xl">
                      ${pkg.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-1 p-5">
                <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase mb-1">
                  {pkg.tagline}
                </p>
                <h3 className="font-kanit font-bold text-white text-xl mb-3">{pkg.name}</h3>
                <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mb-4 flex-1">
                  {pkg.description}
                </p>

                {/* Inclusions */}
                <ul className="space-y-1.5 mb-6">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-roboto text-[#DADADA]">
                      <span className="text-[#9FFE0A] text-xs flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={openQuiz}
                  className={`w-full py-3 text-sm tracking-wider font-kanit font-700 transition-all duration-200 rounded-none ${
                    pkg.featured ? 'btn-green' : 'btn-outline'
                  }`}
                  aria-label={`Get a custom estimate for ${pkg.name}`}
                  id={`package-cta-${pkg.id}`}
                >
                  Get Custom Estimate →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center font-roboto text-[#DADADA]/50 text-xs mt-8">
          All prices are starting points. Final pricing depends on vehicle size, panel condition, and selected film brand.
          Schedule a consultation for an exact quote.
        </p>
      </div>
    </section>
  )
}
