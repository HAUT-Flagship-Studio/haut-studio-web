'use client'

import Image from 'next/image'
import { STUDIO } from '@/lib/data'

const HIGHLIGHTS = [
  {
    icon: '◈',
    title: 'Climate-Controlled, Dust-Free Bays',
    body: 'Every install happens in a sealed, positive-pressure bay with filtered air handling — no shop dust, no debris under the film, no contamination locked beneath the surface.',
  },
  {
    icon: '◉',
    title: 'Certified Master Installers',
    body: 'Our technicians are factory-trained and certified on DAP digital pattern software and wet-application heat-forming — not weekend-course installers.',
  },
  {
    icon: '◐',
    title: 'Hackensack Roots',
    body: "Based at 361 NJ-17 since day one, HAUT built its reputation on Bergen County's exotic and luxury vehicle owners — word of mouth, not ad spend.",
  },
  {
    icon: '◑',
    title: 'Digital-First Precision',
    body: "Every panel is cut from vehicle-specific 3D scan data before it ever touches your paint — zero on-car blade contact, zero guesswork.",
  },
]

export default function AboutStudioModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="About HAUT Flagship Studio"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="card-folded bg-[#1A292E]/95 backdrop-blur border border-slate-800 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#DADADA]/15 sticky top-0 bg-[#1A292E]/95 backdrop-blur">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt="HAUT"
              width={1699}
              height={500}
              className="h-8 w-auto"
            />
            <div>
              <h3 className="font-kanit font-bold text-white text-xl leading-tight">About the Studio</h3>
              <p className="font-roboto text-[#DADADA]/50 text-xs">{STUDIO.address}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#DADADA] hover:text-[#9FFE0A] transition-colors p-1 flex-shrink-0"
            aria-label="Close about the studio"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          <p className="font-roboto text-[#DADADA] leading-relaxed">
            HAUT Flagship Studio is Bergen County&apos;s dedicated paint protection film, ceramic
            coating, and window tint installer — built around a single idea: precision beats
            speed. Every vehicle that comes through our Hackensack bays gets the same
            climate-controlled, dust-free environment and the same DAP digital-cut process,
            whether it&apos;s a daily driver or a six-figure exotic.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="border-l-2 border-[#9FFE0A] pl-4">
                <span className="text-[#9FFE0A] text-xl block mb-1">{h.icon}</span>
                <h4 className="font-kanit font-semibold text-white text-sm mb-1">{h.title}</h4>
                <p className="font-roboto text-[#DADADA]/70 text-xs leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#DADADA]/10">
            <p className="font-roboto text-[#DADADA]/50 text-xs leading-relaxed">
              Visit us at {STUDIO.address} · {STUDIO.hours} · {STUDIO.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
