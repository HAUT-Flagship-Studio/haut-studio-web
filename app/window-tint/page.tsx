import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Packages from '@/components/Packages'
import PricingMatrix from '@/components/PricingMatrix'
import ProcessBanner from '@/components/ProcessBanner'
import TintFaq from '@/components/TintFaq'
import { WINDOW_TINT_PACKAGES, TINT_FEATURE_MATRIX } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Window Tinting in Hackensack, NJ | HAUT Flagship Studio',
  description:
    'Ceramic IR window film that blocks heat and UV fade without killing your signal. Front window, full vehicle, and windshield packages from $199, installed by certified master installers in Hackensack, NJ.',
  alternates: {
    canonical: 'https://hautppfstudio.com/window-tint',
  },
}

const TINT_BENEFITS = [
  'Cuts cabin heat on hot days, so the interior cools down faster and the A/C works less to keep it that way.',
  'Blocks the UV radiation that fades interior trim, cracks dashboards, and reaches skin on long drives.',
  'Adds privacy by reducing visibility into the cabin from outside.',
  'Cuts glare from direct sun and oncoming headlights at night.',
  'Gives the exterior a cleaner, more finished look.',
]

const VLT_OPTIONS = [70, 50, 35, 20, 5]

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

      {/* Benefits + VLT options */}
      <section
        className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        aria-label="Benefits of window tint and available darkness levels"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              ✦ Benefits of Window Tint
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Less Heat, Less Glare,
              <br />
              <span className="text-[#9FFE0A]">More Privacy.</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mb-14">
            {TINT_BENEFITS.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <span className="text-[#9FFE0A] text-lg leading-none mt-0.5">✓</span>
                <p className="font-roboto text-[#DADADA] text-sm leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl">
            <p className="font-roboto text-[#DADADA] text-sm font-semibold uppercase tracking-wide mb-4">
              Available Darkness (VLT)
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {VLT_OPTIONS.map((vlt) => (
                <div
                  key={vlt}
                  className="border border-[#9FFE0A]/40 bg-[#9FFE0A]/10 px-4 py-2 font-kanit font-bold text-[#9FFE0A] text-sm"
                >
                  {vlt}% VLT
                </div>
              ))}
            </div>
            <p className="font-roboto text-[#DADADA]/60 text-xs leading-relaxed max-w-2xl">
              New Jersey law requires front side windows and the windshield to let in more than 70% of
              light — darker shades are available for rear side windows and the rear windshield. We&apos;ll
              confirm the legal shade for each window at your consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Specs grid */}
      <section
        className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
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

      {/* Professional installation */}
      <section
        className="bg-[#1A292E] precision-grid"
        aria-label="Why professional tint installation matters"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              ✦ Professional Installation
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-6">
              Curved Glass Doesn&apos;t
              <br />
              <span className="text-[#9FFE0A]">Take Film Flat.</span>
            </h2>
            <p className="font-roboto text-[#DADADA] text-base leading-relaxed mb-4">
              Curved rear windows, quarter glass, and wraparound backlights don&apos;t take film flat — each
              pane is heat-shrunk to match its exact contour before it&apos;s applied, using patterns cut by
              our HAUT Precision Scan glass-cutting system so no one is hand-trimming against the edge of
              your glass with a blade.
            </p>
            <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
              Every install finishes with edges trimmed to the dot-matrix border built into your factory
              windshield and rear window, then inspected for haze, bubbling, or lift under direct light
              before the car leaves the bay — the same optical clarity check we run on every PPF and
              ceramic install.
            </p>
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

      <TintFaq />

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
