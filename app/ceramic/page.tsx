import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import QuoteButton from '@/components/QuoteButton'
import ProcessBanner from '@/components/ProcessBanner'
import CeramicFaq from '@/components/CeramicFaq'
import DriveFrom from '@/components/DriveFrom'
import { CERAMIC_PACKAGE, CERAMIC_FAQ_ITEMS } from '@/lib/data'
import { buildFaqSchema } from '@/lib/faqSchema'

export const metadata: Metadata = {
  title: 'Ceramic Coating in Hackensack, NJ | HAUT Flagship Studio',
  description:
    'HAUT Ceramic — dual-layer 9H coating that blocks UV fade and protects resale value. From $999, installed by certified master installers at HAUT Flagship Studio, Hackensack, NJ.',
  alternates: {
    canonical: 'https://hautppfstudio.com/ceramic',
  },
}

const CERAMIC_REASONS = [
  'Preserves resale value — keeps your factory finish free of the swirl marks and fading that flag a car as poorly maintained.',
  'Cuts wash time and ends wax appointments for good — one application, years of hydrophobic gloss.',
  'Deepens color and gloss by filling micro-imperfections in the clear coat for a wetter-looking finish.',
  'Blocks the UV exposure that causes clear coat oxidation, chalking, and fade.',
  'Adds 9H-hard resistance to swirl marks and light chemical etching from bird droppings and road salt.',
  'Protects PPF and vinyl wraps from staining and premature yellowing with a sacrificial top layer.',
  'Repels water and grime on contact — a 110–120° contact angle means most dirt rinses off with plain water.',
]

const CERAMIC_SPECS = [
  {
    icon: '◉',
    title: 'Hydrophobic Surface',
    detail: 'Static water contact angle of 110–120° — grime and water bead off on contact instead of drying onto the surface.',
  },
  {
    icon: '◐',
    title: '9H Hardness Rating',
    detail: 'Dual-layer ceramic cures into a glass-like shell that resists swirl marks and light chemical etching.',
  },
  {
    icon: '◑',
    title: 'UV Inhibitor Layer',
    detail: 'Blocks the UV radiation responsible for clear coat oxidation, chalking, and fade — the damage that quietly erodes resale value.',
  },
  {
    icon: '◈',
    title: 'Gloss Enhancement',
    detail: 'Fills micro-imperfections in the clear coat for a deeper, wetter-looking finish under direct light.',
  },
]

export default function CeramicPage() {
  // The questions below are the ones this page renders, so the markup
  // describes what a visitor can actually read.
  const faqSchema = buildFaqSchema(CERAMIC_FAQ_ITEMS)

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        backgroundImage="/assets/service-ceramic-coating.webp"
        eyebrow="Ceramic Coating"
        heading={
          <>
            UV Fade & Grime,
            <br />
            <span className="text-[#9FFE0A]">Sealed Out for Years</span>
          </>
        }
        subtitle="HAUT Ceramic is a dual-layer 9H sealant that bonds directly to your clear coat or PPF, blocking the UV exposure that fades paint and protecting the resale value of your vehicle for years — not months."
        ctaLabel="Get Custom Estimate"
      />

      {/* Reasons to get HAUT Ceramic */}
      <section
        className="bg-[#1A292E] precision-grid"
        aria-label="Reasons to get HAUT Ceramic coating"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mb-10">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              ✦ Why Get HAUT Ceramic
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              More Than a Shine —
              <br />
              <span className="text-[#9FFE0A]">A Maintenance Plan.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl">
            {CERAMIC_REASONS.map((reason) => (
              <div key={reason} className="flex items-start gap-3">
                <span className="text-[#9FFE0A] text-lg leading-none mt-0.5">✓</span>
                <p className="font-roboto text-[#DADADA] text-sm leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs grid */}
      <section
        className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        aria-label="Ceramic coating specifications"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              What It Does
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Chemical Sealant,
              <br />
              <span className="text-[#9FFE0A]">Not a Physical Barrier</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERAMIC_SPECS.map((spec) => (
              <div
                key={spec.title}
                className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-6"
              >
                <span className="text-[#9FFE0A] text-2xl mb-4 block">{spec.icon}</span>
                <h3 className="font-kanit font-semibold text-white text-lg mb-2">{spec.title}</h3>
                <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">{spec.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional application */}
      <section
        className="bg-[#1A292E] precision-grid"
        aria-label="Why professional ceramic application matters"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              ✦ Professional Application
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-6">
              Why This Isn&apos;t
              <br />
              <span className="text-[#9FFE0A]">a DIY Spray Bottle Job.</span>
            </h2>
            <p className="font-roboto text-[#DADADA] text-base leading-relaxed mb-4">
              HAUT Ceramic bonds to the surface at a molecular level — once it cures, it&apos;s permanent.
              There&apos;s no wiping it off and starting over. Every vehicle goes through multi-stage paint
              correction and a dedicated degreasing pass before a single drop of coating touches the panel,
              because the coating locks in whatever is underneath it — contamination, swirl marks, or oils
              from a rushed prep all get sealed in permanently along with the gloss.
            </p>
            <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
              A botched DIY application doesn&apos;t wash out — removing a cured ceramic shell takes machine
              polishing to cut it back off the clear coat. Our certified master installers hand-apply HAUT
              Ceramic panel by panel inside a climate-controlled bay, then infrared-cure and water-test every
              vehicle before it leaves, so it&apos;s done right the first time.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing card + cross-sell */}
      <section
        className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        aria-label="Ceramic coating pricing"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-[#9FFE0A]/40 p-8 flex flex-col">
            <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase mb-2">
              {CERAMIC_PACKAGE.tagline}
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-[#DADADA] text-sm">From</span>
              <span className="font-kanit font-black text-[#9FFE0A] text-5xl">
                ${CERAMIC_PACKAGE.price.toLocaleString()}
              </span>
            </div>
            <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mb-6">
              {CERAMIC_PACKAGE.description}
            </p>
            <ul className="space-y-2 mb-8 flex-1">
              {CERAMIC_PACKAGE.inclusions.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-roboto text-[#DADADA]">
                  <span className="text-[#9FFE0A] text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <QuoteButton label="Get Custom Estimate →" className="btn-green w-full py-3 text-sm tracking-wider rounded-none" />
          </div>
          <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-8 flex flex-col justify-center">
            <h3 className="font-kanit font-bold text-white text-2xl mb-3">
              Combine With Paint Protection Film
            </h3>
            <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mb-6">
              Ceramic coating adds gloss and hydrophobic performance — it does not stop rock chips. For
              full protection, pair it with self-healing optical film on the panels that take the most impact.
            </p>
            <Link href="/ppf" className="btn-outline px-6 py-3 text-sm text-center rounded-none self-start">
              View PPF Packages →
            </Link>
          </div>
        </div>
      </section>

      <DriveFrom service="ceramic coating" />

      <CeramicFaq />

      <ProcessBanner
        eyebrow="How Ceramic Coating Is Applied"
        heading={
          <>
            From Paint Correction
            <br />
            <span className="text-[#9FFE0A]">to Hydrophobic Cure</span>
          </>
        }
        subtitle="Every ceramic coating application at HAUT follows a 4-step process — multi-stage paint correction, surface degreasing, dual-layer 9H application, and infrared curing. See the full breakdown alongside our PPF and window tint process."
      />
    </main>
  )
}
