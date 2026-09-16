import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import QuoteButton from '@/components/QuoteButton'
import { PhoneLink, AddressLink } from '@/components/TrackedLinks'
import { STUDIO } from '@/lib/data'
import {
  SERVICE_AREA,
  SERVICE_AREA_COUNTIES,
  SERVICE_RADIUS_MILES,
  townsInCounty,
  townsInState,
} from '@/lib/serviceArea'

// One page for the whole radius, not one page per town. Eighty-odd
// near-identical town pages is the textbook definition of a doorway set, and
// Google's spam policy costs the whole site, not the offending pages. What a
// search engine needs is this list published once and mirrored in the
// LocalBusiness areaServed in app/layout.tsx; what a visitor needs is to find
// their own town and see how far out it is. Both are the same page.
//
// The service words below are links, never a claim this page can do the work —
// see scripts/check-seo.mjs, rule body-competes-with-service-pages.
export const metadata: Metadata = {
  title: `Service Area | ${SERVICE_AREA.length} Towns Within ${SERVICE_RADIUS_MILES} Miles of the Hackensack Studio`,
  description: `HAUT Flagship Studio at 361 NJ-17 draws from ${townsInState('NJ').length} municipalities across ${SERVICE_AREA_COUNTIES.length} New Jersey counties, plus Manhattan through the Lincoln Tunnel — every town within ${SERVICE_RADIUS_MILES} miles, measured from the studio, with the distance for each one.`,
  alternates: {
    canonical: 'https://hautppfstudio.com/service-area',
  },
}

// Direction and a landmark, nothing a map would contradict. Drive times and
// route numbers belong to whoever is holding the wheel that morning.
const COUNTY_NOTE: Record<string, string> = {
  Bergen: 'The studio stands in Bergen County, so most of the radius falls inside it.',
  Passaic: 'West of the studio, on the far side of the Passaic River.',
  Hudson: 'South, down through the Meadowlands towards the river towns.',
  Essex: 'The south-western edge of the radius.',
}

export default function ServiceAreaPage() {
  const furthest = SERVICE_AREA[SERVICE_AREA.length - 1]
  const newYork = townsInState('NY')
  const newJersey = townsInState('NJ')

  return (
    <main>
      <PageHero
        backgroundImage="/assets/hero-car-photo.webp"
        eyebrow="Service Area"
        heading={
          <>
            {SERVICE_AREA.length} Towns,
            <br />
            <span className="text-[#9FFE0A]">One Studio Floor</span>
          </>
        }
        subtitle={`Every municipality within ${SERVICE_RADIUS_MILES} miles of 361 NJ-17 — ${townsInState('NJ').length} across ${SERVICE_AREA_COUNTIES.length} New Jersey counties, plus Manhattan through the tunnel. Work happens here, in the sealed bays, so the only question that matters is how far you have to drive.`}
        ctaLabel="Get Custom Estimate"
      />

      {/* What the radius means */}
      <section className="bg-[#1A292E] precision-grid py-16 md:py-20 px-4 sm:px-6 lg:px-8" aria-label="How the radius is measured">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">How This Is Measured</p>
          <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-6">
            Distance, Not a Marketing Radius
          </h2>
          <div className="space-y-4 font-roboto text-[#DADADA] text-base leading-relaxed">
            <p>
              Every distance below is measured from the studio to the centre of the municipality, using the
              U.S. Census Bureau&apos;s own coordinates. Nothing here is rounded up to make the map look
              bigger: {newJersey.length} New Jersey municipalities across{' '}
              {SERVICE_AREA_COUNTIES.join(', ')} counties fall inside {SERVICE_RADIUS_MILES} miles, and towns
              a mile further out do not.
            </p>
            <p className="text-[#DADADA]/70 text-sm">
              It is straight-line distance, so read it as distance and not as minutes. {furthest.name} at{' '}
              {furthest.miles.toFixed(1)} miles can be a shorter trip than a town half that far on the wrong
              side of the Hackensack River at rush hour.
            </p>
            <p>
              Outside the radius and still want the work done? That is not a problem — it is a drive. Owners
              come from further out every week; the list is about who is close, not about who is welcome.
            </p>
          </div>
        </div>
      </section>

      {/* The list */}
      <section className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8" aria-label="Towns served">
        <div className="max-w-7xl mx-auto space-y-14">
          {SERVICE_AREA_COUNTIES.map((county) => {
            const towns = townsInCounty(county)
            return (
              <div key={county}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                  <h2 className="font-kanit font-bold text-white text-2xl lg:text-3xl">
                    {county} County
                  </h2>
                  <span className="font-roboto text-[#9FFE0A] text-sm">
                    {towns.length} {towns.length === 1 ? 'town' : 'towns'}
                  </span>
                </div>
                <p className="font-roboto text-[#DADADA]/60 text-sm mb-6 max-w-2xl">{COUNTY_NOTE[county]}</p>
                <div className="w-16 h-0.5 bg-[#9FFE0A] mb-8" />

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-1">
                  {towns.map((town) => (
                    <li
                      key={town.name}
                      className="flex items-baseline justify-between gap-3 border-b border-[#DADADA]/10 py-2"
                    >
                      <span className="font-roboto text-[#DADADA] text-sm">{town.name}</span>
                      <span className="font-roboto text-[#DADADA]/50 text-xs tabular-nums whitespace-nowrap">
                        {town.miles.toFixed(1)} mi
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Manhattan gets its own block: one borough is not a county section, and
          the straight-line number is the one number on this page that misleads. */}
      {newYork.length > 0 && (
        <section
          className="bg-[#1A292E] precision-grid py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#DADADA]/10"
          aria-label="Across the Hudson"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              Across the Hudson
            </p>
            <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-6">
              {newYork.map((t) => t.name).join(', ')} —{' '}
              <span className="text-[#9FFE0A]">
                {newYork[0].miles.toFixed(1)} Miles, One Tunnel
              </span>
            </h2>
            <div className="space-y-4 font-roboto text-[#DADADA] text-base leading-relaxed">
              <p>
                Manhattan is closer to this studio than a dozen of the New Jersey towns listed above — the
                distance is simply measured over water a car cannot drive across. The trip runs through the
                Lincoln Tunnel and out along Route 3: roughly twenty minutes from Midtown when the tunnel is
                clear, and honestly longer when it is not.
              </p>
              <p className="text-[#DADADA]/70 text-sm">
                It is the one entry on this page where the mileage tells you the least. Garage space in
                Manhattan costs what it costs; owners who keep a car there tend to plan the drive out rather
                than the errand nearby.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* What you came for */}
      <section className="bg-[#1A292E] precision-grid py-16 md:py-20 px-4 sm:px-6 lg:px-8" aria-label="What we install">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
            Found Your Town?
          </h2>
          <p className="font-roboto text-[#DADADA]/70 text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            The work itself is covered on its own pages —{' '}
            <Link href="/ppf" className="text-[#9FFE0A] underline underline-offset-4 hover:no-underline">
              paint protection film
            </Link>
            ,{' '}
            <Link href="/ceramic" className="text-[#9FFE0A] underline underline-offset-4 hover:no-underline">
              ceramic coating
            </Link>
            ,{' '}
            <Link href="/window-tint" className="text-[#9FFE0A] underline underline-offset-4 hover:no-underline">
              window tint
            </Link>
            {' '}— each with packages and pricing. Or see{' '}
            <Link href="/our-process" className="text-[#9FFE0A] underline underline-offset-4 hover:no-underline">
              how the install runs
            </Link>{' '}
            before you book the drive.
          </p>
        </div>
      </section>

      {/* Visit + CTA */}
      <section className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8" aria-label="Visit the studio">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-[#9FFE0A]/40 p-8 flex flex-col justify-center">
            <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase mb-2">Where To Drive</p>
            <h3 className="font-kanit font-bold text-white text-2xl mb-4">{STUDIO.name}</h3>
            <div className="space-y-3 font-roboto text-[#DADADA] text-sm mb-6">
              <p>{STUDIO.address}</p>
              <p className="text-[#DADADA]/70">{STUDIO.hours}</p>
            </div>
            <AddressLink
              location="service_area_directions"
              className="btn-outline px-6 py-3 text-sm text-center rounded-none self-start"
            >
              Get Directions →
            </AddressLink>
          </div>
          <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-8 flex flex-col justify-center">
            <h3 className="font-kanit font-bold text-white text-2xl mb-3">Schedule Your Consultation</h3>
            <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mb-6">
              Same-week appointments available. Tell us about your vehicle and what you want protected, and
              we&apos;ll send a custom estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <QuoteButton
                label="Get Custom Estimate →"
                className="btn-green px-6 py-3 text-sm tracking-wider rounded-none"
              />
              <PhoneLink location="service_area_cta" className="btn-outline px-6 py-3 text-sm text-center rounded-none">
                Call {STUDIO.phone}
              </PhoneLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
