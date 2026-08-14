'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { WORK_GALLERY } from '@/lib/data'

export default function WorkGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i === null ? i : (i + 1) % WORK_GALLERY.length))
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i === null ? i : (i - 1 + WORK_GALLERY.length) % WORK_GALLERY.length))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex])

  if (WORK_GALLERY.length === 0) return null

  const active = activeIndex !== null ? WORK_GALLERY[activeIndex] : null

  return (
    <section
      id="gallery"
      className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Completed vehicle gallery"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12 text-left">
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">
            ✦ Recent Work
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Cars We&rsquo;ve
            <br />
            <span className="text-[#9FFE0A]">Actually Protected.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {WORK_GALLERY.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(i)}
              className="card-folded group relative aspect-square overflow-hidden border border-slate-800 hover:border-[#9FFE0A]/40 transition-all duration-300"
              aria-label={`View ${item.vehicle} — ${item.service}`}
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A292E]/95 to-transparent p-3">
                <p className="text-white text-xs font-bold leading-tight">{item.vehicle}</p>
                <p className="text-[#9FFE0A] text-[10px] font-roboto uppercase tracking-wide">{item.service}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.vehicle} — enlarged photo`}
          onClick={() => setActiveIndex(null)}
        >
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-[#9FFE0A] transition-colors"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-4xl w-full aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.image}
              alt={active.imageAlt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-bold">{active.vehicle}</p>
            <p className="text-[#9FFE0A] text-xs font-roboto uppercase tracking-wide">{active.service}</p>
          </div>
        </div>
      )}
    </section>
  )
}
