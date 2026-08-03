import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Packages from '@/components/Packages'
import PricingMatrix from '@/components/PricingMatrix'
import ProcessBanner from '@/components/ProcessBanner'
import { WINDOW_TINT_PACKAGES, TINT_FEATURE_MATRIX } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Window Tinting in Hackensack, NJ | HAUT Flagship Studio',
  description:
    'Ceramic IR window film that blocks heat and UV fade without killing your signal. Front window, full vehicle, and windshield packages from $150, installed by certified master installers in Hackensack, NJ.',
  alternates: {
    canonical: 'https://hautppfstudio.com/window-tint',
  },
}

const TINT_SPECS = [
  {
    icon: '◒',
    title: 'Ceramic IR Film',
    detail: 'Non-metallic ceramic particles block infrared heat without interfering with radio, GPS, or phone signal.',
  },
  {
    icon: '◓',
    title: 'UV Protection',
    detail: 'Blocks the UV radiation responsible for interior fading, cracked dashboards, and prolonged skin exposure while driving.',
  },
  {
    icon: '◈',
    title: 'HAUT Precision Scan Cut',
    detail: 'HAUT Precision Scan patterns plotted for every window — no hand-trimming against the glass.',
  },
  {
    icon: '◉',
    title: 'No-Bubble Adhesive',
    detail: 'Pressure-activated adhesive cures clear with no visible bubbling or haze over time.',
  },
]

export default function WindowTintPage() {
  return (
    <main>
      <PageHero
        backgroundImage="/assets/service-window-tinting.webp"
        eyebrow="Window Tinting"
        heading={
          <>
            Cabin Heat, UV Fade & Glare.
            <br />
            <span className="text-[#9FFE0A]">Blocked at the Glass.</span>
          </>
        }
        subtitle="Ceramic IR film blocks the heat and UV exposure that fade interior trim and crack dashboards — cut from the same HAUT Precision Scan patterns as our PPF, installed by Bergen County's certified master installers."
        ctaLabel="Get Custom Estimate"
      />

      {/* Specs grid */}
      <section
        className="bg-[#1A292E] py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        aria-label="Window tint specifications"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              Film Specifications
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Built for Heat,
              <br />
              <span className="text-[#9FFE0A]">Not Just Looks</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TINT_SPECS.map((spec) => (
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

      <Packages
        packages={WINDOW_TINT_PACKAGES}
        eyebrow="Tint Packages & Pricing"
        title={
          <>
            Choose Your
            <br />
            <span className="text-[#9FFE0A]">Tint Coverage</span>
          </>
        }
        note="All packages use the same ceramic IR film. The difference is window coverage — not film quality."
      />

      {/* Pricing Matrix */}
      <section
        className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        aria-label="Window tint pricing matrix"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              Compare Packages
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Window-by-Window
              <br />
              <span className="text-[#9FFE0A]">Breakdown</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          </div>
          <PricingMatrix packages={WINDOW_TINT_PACKAGES} features={TINT_FEATURE_MATRIX} />
        </div>
      </section>

      <ProcessBanner
        eyebrow="How Window Tinting Is Applied"
        heading={
          <>
            From Glass Prep
            <br />
            <span className="text-[#9FFE0A]">to Optical Clarity Inspection</span>
          </>
        }
        subtitle="Every tint install at HAUT follows a 4-step process — glass prep, HAUT Precision Scan pattern cutting, heat shrinking, and dot matrix edge trim inspection. See the full breakdown alongside our PPF and ceramic coating process."
      />
    </main>
  )
}
