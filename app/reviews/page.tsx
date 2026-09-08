import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reviews from '@/components/Reviews'
import { STUDIO } from '@/lib/data'

export const metadata: Metadata = {
  // Describes the reviews, not the service menu — the service pages own that.
  // See scripts/check-seo.mjs, rule metadata-competes-with-service-pages.
  title: '5.0 Star Client Reviews | HAUT Flagship Studio',
  description:
    "20 verified five-star Google reviews in the clients' own words — Maybachs, Range Rovers, BMW M cars and Teslas, from owners who came back a second and third time. Read what they said about the work before you book yours.",
  alternates: {
    canonical: 'https://hautppfstudio.com/reviews',
  },
}

export default function ReviewsPage() {
  return (
    <main>
      <PageHero
        backgroundImage="/assets/hero-car-photo.webp"
        eyebrow="Client Reviews"
        heading={
          <>
            What Clients
            <br />
            <span className="text-[#9FFE0A]">Say About the Work</span>
          </>
        }
        subtitle="Real reviews from Bergen County's exotic and luxury vehicle owners who trusted HAUT Flagship Studio's certified master installers with their paint protection film, ceramic coating, and window tinting installs."
        ctaLabel="Get Custom Estimate"
      />

      {/* Aggregate rating summary */}
      <section className="bg-[#1A292E] precision-grid py-12 px-4 sm:px-6 lg:px-8" aria-label="Rating summary">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="font-kanit font-black text-[#9FFE0A] text-5xl">5.0</span>
            <div className="flex flex-col items-start">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#9FFE0A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-roboto text-[#DADADA]/60 text-xs mt-0.5">20 verified Google reviews</span>
            </div>
          </div>
          <p className="font-roboto text-[#DADADA]/70 text-sm max-w-xl mx-auto leading-relaxed">
            Every review below is a real client's own words, verified through our Google Business Profile —
            we don&apos;t edit or filter for tone, only for length.
          </p>
        </div>
      </section>

      <Reviews showHeader={false} />
    </main>
  )
}
