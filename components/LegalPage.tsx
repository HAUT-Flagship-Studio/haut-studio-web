import type { ReactNode } from 'react'
import { PhoneLink } from '@/components/TrackedLinks'
import { STUDIO } from '@/lib/data'

export interface LegalSection {
  heading: string
  body: ReactNode
}

/**
 * /privacy and /terms. These used to be modals opened from footer buttons, so
 * neither had an address — and Meta's ad review, a carrier's SMS registration
 * and a client asking "where is your policy" all need one.
 */
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: ReactNode
  sections: LegalSection[]
}) {
  return (
    <main className="bg-[#1A292E] precision-grid px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <article className="max-w-3xl mx-auto">
        <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">{STUDIO.name}</p>
        <h1 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-3">{title}</h1>
        <p className="font-roboto text-[#DADADA]/60 text-sm mb-6">Last updated: {updated}</p>
        <div className="w-16 h-0.5 bg-[#9FFE0A] mb-8" />
        <div className="font-roboto text-[#DADADA] text-base leading-relaxed mb-10">{intro}</div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <section key={s.heading} aria-labelledby={`legal-${i}`}>
              <h2 id={`legal-${i}`} className="font-kanit font-semibold text-white text-xl mb-3">
                {s.heading}
              </h2>
              <div className="font-roboto text-[#DADADA]/80 text-sm leading-relaxed space-y-3 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[#9FFE0A] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[#DADADA]/10 font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
          Questions about this page: call{' '}
          <PhoneLink location={`legal_${title.toLowerCase().replace(/\s+/g, '_')}`} className="text-[#9FFE0A] hover:underline">
            {STUDIO.phone}
          </PhoneLink>{' '}
          or visit {STUDIO.name}, {STUDIO.address}.
        </div>
      </article>
    </main>
  )
}
