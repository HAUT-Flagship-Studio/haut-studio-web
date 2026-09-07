import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import GlossMatteSlider from '@/components/GlossMatteSlider'
import RoadHazardsGrid from '@/components/RoadHazardsGrid'
import InstallationStandard from '@/components/InstallationStandard'
import Packages from '@/components/Packages'
import VideoTestimonials from '@/components/VideoTestimonials'
import PPFFaq from '@/components/PPFFaq'
import PPFFinalCTA from '@/components/PPFFinalCTA'
import { PPF_PACKAGES, PPF_FAQ_ITEMS } from '@/lib/data'
import { buildFaqSchema } from '@/lib/faqSchema'

export const metadata: Metadata = {
  title: 'Paint Protection Film (PPF) in Hackensack, NJ | Packages & Pricing | HAUT Flagship Studio',
  description:
    'Paint protection film (PPF) in Hackensack, NJ — self-healing film with a 10-year manufacturer warranty, cut with HAUT Precision Scan for zero-blade contact. Front End, Highway & Track, and Full Body Armor packages installed by certified master installers. Compare packages and pricing.',
  alternates: {
    canonical: 'https://hautppfstudio.com/ppf',
  },
}

export default function PPFPage() {
  // The questions below are the ones this page renders, so the markup
  // describes what a visitor can actually read.
  const faqSchema = buildFaqSchema(PPF_FAQ_ITEMS)

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero
        backgroundImage="/assets/ppf-page-cover.webp"
        locationBadge="✦ HAUT PAINT PROTECTION FILM"
        heading={
          <>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">Uncompromising</span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">Protection for Your</span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#9FFE0A]">Factory Paint.</span>
          </>
        }
        subtitle="Defend your vehicle against rock chips, swirl marks, and road debris with HAUT's proprietary self-healing Paint Protection Film. Digitally cut with zero razor blades on your paint, extended for wrapped edges, and backed by a 10-year manufacturer warranty."
        trustBadges={['★ 5.0 Google Reviews', '100% HAUT Precision Scan Cut (Zero Blades)', 'Custom Extended-Wrapped Edges', '10-Year Transferable Warranty']}
      />

      {/* Factory Paint Finish Dilemma / Why HAUT PPF */}
      <section
        className="bg-[#1A292E] precision-grid"
        aria-label="Why paint protection film is non-negotiable"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              ✦ Why PPF Is Non-Negotiable
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-6">
              Factory Paint Can Never
              <br />
              <span className="text-[#9FFE0A]">Be Replicated.</span>
            </h2>
            <p className="font-roboto text-[#DADADA] text-base leading-relaxed mb-4">
              Original OEM paint is applied under factory conditions no bodyshop can match — electrostatic
              application, robotic consistency, and bake-cured clear coat in a contaminant-free environment.
              Once a panel is repainted, that factory finish is gone permanently, and it shows to anyone who
              checks paint depth with a gauge.
            </p>
            <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
              A single repainted panel can measurably reduce resale value and flags the vehicle in a pre-purchase
              inspection. Paint protection film is an invisible, sacrificial layer of armor between your factory
              finish and the road — it absorbs the damage so your original paint never has to.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#0D1216] border border-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="font-kanit font-semibold text-white text-lg mb-2 leading-snug">
                Preserve 100% Market Value
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
                Prevents minor rock chips and daily wear from requiring body shop repaints, protecting your
                pristine factory finish and maximizing resale value.
              </p>
            </div>
            <div className="bg-[#0D1216] border border-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="font-kanit font-semibold text-white text-lg mb-2 leading-snug">
                Passes Every Paint-Depth Inspection
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
                Film sits on top of the clear coat, so a paint-depth gauge still reads factory-original
                underneath — no repaint flag on a pre-purchase inspection or dealer trade-in appraisal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gloss vs. Satin Matte */}
      <section
        className="bg-[#1A292E] precision-grid"
        aria-label="Gloss versus satin matte PPF finishes"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-14">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              Choose Your Finish
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Gloss vs. Satin
              <br />
              <span className="text-[#9FFE0A]">Choose Your Finish</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          </div>

          <div className="mb-10 max-w-4xl mx-auto">
            <GlossMatteSlider
              glossSrc="/assets/ppf-finish-gloss.webp"
              matteSrc="/assets/ppf-finish-matte.webp"
              alt="Chevrolet Corvette C8"
            />
            <p className="text-center font-roboto text-[#DADADA]/50 text-xs tracking-widest uppercase mt-3">
              Drag to compare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 hover:border-[#9FFE0A]/40 transition-all duration-300 p-8">
              <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase mb-2">
                Optical Clarity
              </p>
              <h3 className="font-kanit font-bold text-white text-2xl mb-4">
                Ultra-Gloss PPF
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
                Deepens your factory color depth rather than dulling it, repels water and dirt with a
                hydrophobic topcoat, and cures completely invisible — indistinguishable from bare paint
                even under direct light.
              </p>
            </div>
            <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 hover:border-[#9FFE0A]/40 transition-all duration-300 p-8">
              <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase mb-2">
                Satin Transformation
              </p>
              <h3 className="font-kanit font-bold text-white text-2xl mb-4">
                Satin Matte PPF
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
                Protects a factory matte or satin finish with the same self-healing film, or transforms
                gloss factory paint into a sleek satin-matte look — without paying for a $10,000+ OEM
                matte paint option.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RoadHazardsGrid />

      <InstallationStandard />

      <Packages
        packages={PPF_PACKAGES}
        eyebrow="Coverage Packages"
        title={
          <>
            Choose Your
            <br />
            <span className="text-[#9FFE0A]">Coverage Level</span>
          </>
        }
      />

      {/* Cross-sell */}
      <section
        className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        aria-label="Complete your protection"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              ✦ Complete the Protection
            </p>
            <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight">
              PPF Stops Impact.
              <br />
              <span className="text-[#9FFE0A]">Pair It With the Rest.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-8 flex flex-col justify-center">
              <h3 className="font-kanit font-bold text-white text-2xl mb-3">
                Add Ceramic Coating
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mb-6">
                PPF absorbs the impact — ceramic coating adds the hydrophobic gloss and UV protection
                on top, so washes take minutes and the finish stays deeper for years.
              </p>
              <Link href="/ceramic" className="btn-outline px-6 py-3 text-sm text-center rounded-none self-start">
                View Ceramic Coating →
              </Link>
            </div>
            <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-8 flex flex-col justify-center">
              <h3 className="font-kanit font-bold text-white text-2xl mb-3">
                Add Window Tinting
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mb-6">
                Cut from the same HAUT Precision Scan patterns as your PPF — ceramic IR film blocks
                cabin heat and UV fade at the glass.
              </p>
              <Link href="/window-tint" className="btn-outline px-6 py-3 text-sm text-center rounded-none self-start">
                View Window Tinting →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonials
        ids={['alex-perrera-lamborghini']}
        eyebrow="✦ Is It Worth The Price?"
        title={
          <>
            A Client On Why We
            <br />
            <span className="text-[#9FFE0A]">Cost More — And Why It's Worth It.</span>
          </>
        }
      />

      <PPFFaq />

      <PPFFinalCTA />
    </main>
  )
}
