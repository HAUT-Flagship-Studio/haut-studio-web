import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import QuoteButton from '@/components/QuoteButton'
import ProcessBanner from '@/components/ProcessBanner'
import { CERAMIC_PACKAGE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Ceramic Coating in Hackensack, NJ | HAUT Flagship Studio',
  description:
    'Dual-layer 9H ceramic coating that blocks UV fade and protects resale value. From $999, installed by certified master installers at HAUT Flagship Studio, Hackensack, NJ.',
  alternates: {
    canonical: 'https://hautppfstudio.com/ceramic',
  },
}

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
  return (
    <main>
      <PageHero
        eyebrow="Ceramic Coating"
        heading={
          <>
            UV Fade & Grime,
            <br />
            <span className="text-[#9FFE0A]">Sealed Out for Years</span>
          </>
        }
        subtitle="Dual-layer 9H ceramic sealant bonds directly to your clear coat or PPF, blocking the UV exposure that fades paint and protects the resale value of your vehicle for years — not months."
        ctaLabel="Get Custom Estimate"
      />

      {/* Specs grid */}
      <section
        className="bg-[#1A292E] py-20 md:py-28 px-4 sm:px-6 lg:px-8"
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
              full protection, pair it with self-healing optical TPU film on the panels that take the most impact.
            </p>
            <Link href="/ppf" className="btn-outline px-6 py-3 text-sm text-center rounded-none self-start">
              View PPF Packages →
            </Link>
          </div>
        </div>
      </section>

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
