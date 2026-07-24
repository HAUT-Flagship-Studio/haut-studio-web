import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import QuoteButton from '@/components/QuoteButton'
import { STUDIO } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About HAUT Flagship Studio | Certified PPF & Ceramic Installers in Hackensack, NJ',
  description:
    "HAUT Flagship Studio is Bergen County's dedicated paint protection film, ceramic coating, and window tint installer — climate-controlled, dust-free bays in Hackensack, NJ, certified master installers, and a zero-blade digital precision process on every vehicle.",
  alternates: {
    canonical: 'https://hautppfstudio.com/about',
  },
}

const HIGHLIGHTS = [
  {
    icon: '◈',
    title: 'Climate-Controlled, Dust-Free Bays',
    body: 'Every install happens inside a sealed, positive-pressure bay with filtered air handling — no shop dust, no debris trapped under the film, no contamination locked beneath the surface. It is the same controlled environment for every vehicle that comes through our doors.',
  },
  {
    icon: '◉',
    title: 'Certified Master Installers',
    body: 'Our technicians are factory-trained and certified on DAP digital pattern software and wet-application heat-forming technique — not weekend-course installers working off YouTube tutorials.',
  },
  {
    icon: '◐',
    title: 'Hackensack Roots, Bergen County Reputation',
    body: "Based at 361 NJ-17 since day one, HAUT built its name on Bergen County's exotic and luxury vehicle owners — word of mouth, not ad spend. Local heritage is not a marketing line here; it's the entire client base.",
  },
  {
    icon: '◑',
    title: 'Zero-Blade Digital Precision',
    body: 'Every panel and every window is cut from vehicle-specific 3D scan data through DAP software before it ever touches your paint or glass — zero on-car blade contact, zero guesswork, a factory-exact fit on the first try.',
  },
]

const STATS = [
  { value: '10-Year', label: 'Manufacturer PPF Warranty' },
  { value: '3', label: 'Services, One Zero-Blade Standard' },
  { value: '100%', label: 'Digitally-Plotted Patterns' },
  { value: '361 NJ-17', label: 'Hackensack, NJ Flagship Studio' },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About the Studio"
        heading={
          <>
            Bergen County&apos;s
            <br />
            <span className="text-[#9FFE0A]">Flagship Protection Studio</span>
          </>
        }
        subtitle="HAUT Flagship Studio is Hackensack, NJ's dedicated paint protection film, ceramic coating, and window tint installer — built around a single idea: precision beats speed. Every vehicle that comes through our doors gets the same climate-controlled, dust-free environment and the same zero-blade DAP digital-cut process, whether it's a daily driver or a six-figure exotic."
        ctaLabel="Get Custom Estimate"
      />

      {/* Story */}
      <section className="bg-[#1A292E] py-16 md:py-20 px-4 sm:px-6 lg:px-8" aria-label="Our story">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">Our Story</p>
          <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-6">
            A Local Studio, Built on Local Trust
          </h2>
          <div className="space-y-4 font-roboto text-[#DADADA] text-base leading-relaxed">
            <p>
              HAUT Flagship Studio opened its doors at 361 NJ-17 in Hackensack with a straightforward premise:
              Bergen County and Northern NJ vehicle owners deserve a paint protection film, ceramic coating, and
              window tint installer that treats every panel with the same precision an exotic dealership expects
              from its own service department.
            </p>
            <p>
              That standard is what separates a flagship studio from a mobile installer working out of a van in a
              parking lot. Every vehicle that comes through our bays — whether it&apos;s a daily commuter racking up
              miles on the Garden State Parkway or a six-figure exotic seeing daylight twice a month — goes
              through the same climate-controlled, dust-free installation environment and the same DAP digital
              pattern-cutting process. No shortcuts, no on-car blade trimming, no exceptions.
            </p>
            <p>
              Over time, that consistency is what built our reputation across Bergen County: word of mouth from
              owners who saw the difference between a shop that estimates a cut by eye and a studio that plots
              every pattern digitally before a blade ever comes near the car.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights grid */}
      <section
        className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        aria-label="What sets HAUT apart"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">Why HAUT</p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              What Sets a Flagship
              <br />
              <span className="text-[#9FFE0A]">Studio Apart</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-6"
              >
                <span className="text-[#9FFE0A] text-2xl mb-4 block">{h.icon}</span>
                <h3 className="font-kanit font-semibold text-white text-lg mb-2">{h.title}</h3>
                <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-[#DADADA]/10 pt-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-kanit font-black text-[#9FFE0A] text-2xl sm:text-3xl mb-1">{s.value}</p>
                <p className="font-roboto text-[#DADADA]/60 text-xs sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zero-blade philosophy cross-sell */}
      <section className="bg-[#1A292E] py-16 md:py-20 px-4 sm:px-6 lg:px-8" aria-label="Our process">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
            Curious Exactly How
            <br />
            <span className="text-[#9FFE0A]">We Protect Every Vehicle?</span>
          </h2>
          <p className="font-roboto text-[#DADADA]/70 text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            See the full step-by-step installation process for paint protection film, ceramic coating, and
            window tinting — from paint decontamination to final inspection.
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

      {/* Visit us + CTA */}
      <section className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8" aria-label="Visit the studio">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-[#9FFE0A]/40 p-8 flex flex-col justify-center">
            <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase mb-2">Visit the Studio</p>
            <h3 className="font-kanit font-bold text-white text-2xl mb-4">HAUT Flagship Studio</h3>
            <div className="space-y-3 font-roboto text-[#DADADA] text-sm mb-6">
              <p>{STUDIO.address}</p>
              <p className="text-[#DADADA]/70">{STUDIO.hours}</p>
            </div>
            <a
              href={STUDIO.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-6 py-3 text-sm text-center rounded-none self-start"
            >
              Get Directions →
            </a>
          </div>
          <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-8 flex flex-col justify-center">
            <h3 className="font-kanit font-bold text-white text-2xl mb-3">
              Schedule Your Consultation
            </h3>
            <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mb-6">
              Same-week appointments available for Bergen County and Northern NJ. Tell us about your vehicle
              and we&apos;ll send a custom estimate for PPF, ceramic coating, window tint, or any combination.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <QuoteButton label="Get Custom Estimate →" className="btn-green px-6 py-3 text-sm tracking-wider rounded-none" />
              <a href={STUDIO.phoneHref} className="btn-outline px-6 py-3 text-sm text-center rounded-none">
                Call {STUDIO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
