import type { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import GClassWinterForm from '@/components/GClassWinterForm'
import QuoteButton from '@/components/QuoteButton'
import VideoTestimonials from '@/components/VideoTestimonials'
import { AddressLink, PhoneLink } from '@/components/TrackedLinks'
import { CLIENT_REVIEWS, STUDIO } from '@/lib/data'
import { PPF } from '@/lib/pricing'
import { G_CLASS_WINTER, offerIsLive } from '@/lib/offers'
import { makePhotos, MAKE_PAGES } from '@/lib/makes'

/**
 * Ad landing for "Full Body PPF on a G-Class, $14,299 → $12,000" (owner's ТЗ,
 * 2026-11-22). Reached only from ads: noindex, not in the sitemap or the menu,
 * and the header shrinks to logo and phone (AD_LANDINGS in lib/offers.ts), so
 * the one way on is the form. Re-rendered hourly; once the offer has ended it
 * sends visitors to /ppf/g-class.
 */
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'G-Class Full Body PPF — Winter Price | HAUT Flagship Studio',
  description:
    'Full body paint protection film on a Mercedes G-Class for $12,000 instead of $14,299 at HAUT Flagship Studio in Hackensack, NJ, through February 28, 2027.',
  alternates: { canonical: `https://hautppfstudio.com${G_CLASS_WINTER.path}` },
  robots: { index: false, follow: false },
}

const usd = (n: number) => `$${n.toLocaleString('en-US')}`

const BUYS = [
  ['No blade on your paint.', 'Every panel is cut on the plotter before the car enters the bay.'],
  ['Patterns made by hand.', 'Traced on the actual car by installers, then digitized. No 3D-generated guesswork.'],
  ['Nothing taken apart.', 'Bumpers, headlights and trim stay on. The film wraps into the gaps by hand.'],
  ['Factory paint comes off clean.', 'No edge prep. Removal never pulls the clear coat.'],
  ['No dirt lines.', 'Edges wrap behind the panel, so there is no visible edge to collect grime.'],
  ['A lifted edge is ours to fix.', 'That is the install, not the car. Redone at no charge.'],
  ['10-year manufacturer warranty,', 'transferable when you sell the car.'],
] as const

const REVIEW_NAMES = ['Anna Shlepina', 'Slun Tay']

export default function GClassWinterPage() {
  if (!offerIsLive(G_CLASS_WINTER)) redirect('/ppf/g-class')

  const gClass = MAKE_PAGES.find((p) => p.slug === 'g-class')
  const photos = gClass ? makePhotos(gClass) : []
  // Section 4 of the ТЗ: three or four G-Class shots, close on the edges and gaps.
  const WORK_IDS = ['brabus-g-class-three-quarter', 'brabus-g-class-hood', 'brabus-g-class-door-gap', 'brabus-g-class-hinge']
  const workPhotos = photos.filter((p) => WORK_IDS.includes(p.id))
  const reviews = REVIEW_NAMES.map((n) => CLIENT_REVIEWS.find((r) => r.name === n)).filter((r) => r !== undefined)

  return (
    <main className="bg-[#1A292E]">
      {/* 1. First screen */}
      <section data-track-section="offer_hero" className="relative overflow-hidden pt-24 pb-12 md:pt-36 md:pb-20 px-4 sm:px-6 lg:px-8">
        {photos[0] && (
          <Image src={photos[0].image} alt={photos[0].imageAlt} fill priority sizes="100vw" className="object-cover object-[50%_35%] opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A292E]/30 via-[#1A292E]/75 to-[#1A292E]" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="font-kanit font-black text-white text-4xl sm:text-6xl leading-[1.05] mb-5">
            Full Body PPF on a G-Class.{' '}
            <span className="whitespace-nowrap">
              <s className="text-[#DADADA]/60 decoration-2">{usd(G_CLASS_WINTER.regular)}</s>{' '}
              <span className="text-[#9FFE0A]">{usd(G_CLASS_WINTER.price)}.</span>
            </span>
          </h1>
          <p className="font-roboto text-[#DADADA] text-lg leading-relaxed mb-8">
            Winter price at the film manufacturer&apos;s own studio in Hackensack, NJ. Through {G_CLASS_WINTER.endsLabel}.
          </p>
          <a href="#book" data-cta="offer_book" className="btn-green inline-block px-8 py-4 text-base tracking-wider rounded-none">
            Book an inspection
          </a>
        </div>
      </section>

      {/* 2. What the price buys */}
      <section data-track-section="offer_buys" className="precision-grid py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-kanit font-bold text-white text-3xl mb-8">What {usd(G_CLASS_WINTER.price)} buys</h2>
          <ul className="space-y-4">
            {BUYS.map(([lead, rest]) => (
              <li key={lead} className="flex gap-3 font-roboto text-[#DADADA] text-base leading-relaxed">
                <span className="text-[#9FFE0A] mt-0.5" aria-hidden>✦</span>
                <span>
                  <strong className="text-white">{lead}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Client video */}
      <VideoTestimonials
        ids={['alex-perrera-lamborghini']}
        eyebrow="✦ From a client"
        title={
          <>
            Why we cost more —
            <br />
            <span className="text-[#9FFE0A]">from a client.</span>
          </>
        }
      />

      {/* 4. Work and reviews */}
      <section data-track-section="offer_work" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          {workPhotos.length > 0 && (
            <div className="grid gap-4 mb-10 sm:grid-cols-2">
              {workPhotos.map((p) => (
                <figure key={p.id} className="card-folded relative aspect-[4/3] overflow-hidden border border-slate-800">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1A292E]/95 to-transparent p-4 text-white text-sm font-bold">
                    {p.vehicle}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <figure key={r.id} className="card-folded border border-[#DADADA]/15 bg-white/5 p-6">
                <p className="text-[#9FFE0A] text-sm mb-3" aria-label={`${r.rating} out of 5 stars`}>
                  {'★'.repeat(r.rating)}
                </p>
                <blockquote className="font-roboto text-[#DADADA] text-base leading-relaxed mb-4">{r.text}</blockquote>
                <figcaption className="font-kanit font-semibold text-white">
                  {r.name} <span className="font-roboto font-normal text-[#DADADA]/60 text-sm">· {r.vehicle}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Other packages */}
      <section data-track-section="offer_packages" className="precision-grid py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-kanit font-bold text-white text-3xl mb-6">Not ready for full body?</h2>
          <table className="w-full font-roboto text-base text-left border border-[#DADADA]/15">
            <thead className="bg-white/5 text-[#DADADA] text-xs uppercase tracking-wide">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Package</th>
                <th scope="col" className="px-4 py-3 font-medium">G-Class price</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-[#DADADA]/10">
                <th scope="row" className="px-4 py-3 font-normal">Front End Protection</th>
                <td className="px-4 py-3 font-kanit font-bold">{usd(PPF.frontEnd.prices.exotic)}</td>
              </tr>
              <tr className="border-t border-[#DADADA]/10">
                <th scope="row" className="px-4 py-3 font-normal">Highway &amp; Track Package</th>
                <td className="px-4 py-3 font-kanit font-bold">{usd(PPF.highway.prices.exotic)}</td>
              </tr>
              <tr className="border-t border-[#DADADA]/10">
                <th scope="row" className="px-4 py-3 font-normal">Full Body Armor</th>
                <td className="px-4 py-3">
                  <s className="text-[#DADADA]/60">{usd(G_CLASS_WINTER.regular)}</s>{' '}
                  <strong className="font-kanit text-[#9FFE0A]">{usd(G_CLASS_WINTER.price)}</strong>{' '}
                  <span className="text-[#DADADA]/70 text-sm">through Feb 28, 2027</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-5">
            <QuoteButton
              label="Different car? Get your price in 2 minutes →"
              className="font-roboto text-[#9FFE0A] text-base underline underline-offset-4 hover:no-underline"
            />
          </p>
        </div>
      </section>

      {/* 6. Why a winter price */}
      <section data-track-section="offer_why" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-kanit font-bold text-white text-3xl mb-4">Why a winter price</h2>
          <p className="font-roboto text-[#DADADA] text-base leading-relaxed">
            Winter is slow season for paint protection in New Jersey. We&apos;d rather keep the bay full than empty. The
            price returns to {usd(G_CLASS_WINTER.regular)} on {G_CLASS_WINTER.returnsOn}.
          </p>
        </div>
      </section>

      {/* 7. Form */}
      <section id="book" data-track-section="offer_form" className="precision-grid py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-kanit font-bold text-white text-3xl mb-3">Book an inspection.</h2>
          <p className="font-roboto text-[#DADADA] text-base leading-relaxed mb-8">
            Bring the car to 361 NJ-17, Hackensack. We&apos;ll look at the paint and confirm the price before any work.
          </p>
          <div className="card-folded border border-[#DADADA]/15 bg-[#1A292E]/90 p-6 sm:p-8">
            <GClassWinterForm />
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto font-roboto text-[#DADADA] text-sm space-y-2">
          <p className="font-kanit font-semibold text-white">{STUDIO.name}</p>
          <p>{STUDIO.address}</p>
          <p>{STUDIO.hours}</p>
          <p>
            <PhoneLink location="offer_footer" className="text-[#9FFE0A] hover:underline">
              {STUDIO.phone}
            </PhoneLink>
          </p>
          <p>
            <AddressLink location="offer_footer" className="text-[#9FFE0A] hover:underline">
              Get Directions →
            </AddressLink>
          </p>
        </div>
      </footer>
    </main>
  )
}
