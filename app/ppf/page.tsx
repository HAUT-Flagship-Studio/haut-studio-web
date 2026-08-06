import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import GlossMatteSlider from '@/components/GlossMatteSlider'
import RoadHazardsGrid from '@/components/RoadHazardsGrid'
import InstallationStandard from '@/components/InstallationStandard'
import Packages from '@/components/Packages'
import PPFFaq from '@/components/PPFFaq'
import PPFFinalCTA from '@/components/PPFFinalCTA'
import { PPF_PACKAGES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Paint Protection Film (PPF) Packages & Pricing | HAUT Flagship Studio',
  description:
    'Self-healing paint protection film with a 10-year manufacturer warranty, cut with HAUT Precision Scan for zero-blade contact. Front End, Highway & Track, and Full Body Armor packages installed by certified master installers in Hackensack, NJ. Compare packages and pricing.',
  alternates: {
    canonical: 'https://hautppfstudio.com/ppf',
  },
}

export default function PPFPage() {
  return (
    <main>
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
      />

      {/* Factory Paint Finish Dilemma / Why HAUT PPF */}
      <section
        className="bg-[#1A292E]"
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
                Direct-to-Owner Dedication
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
                We previously served as primary technical contractors for major local Ferrari, Porsche,
                McLaren, and Lamborghini dealers. Today, we work 100% Direct-to-Owner — devoting full time to
                your vehicle without dealership rush or volume compromises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gloss vs. Stealth Matte */}
      <section
        className="bg-[#1A292E] precision-grid"
        aria-label="Gloss versus stealth matte PPF finishes"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-14">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              Choose Your Finish
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Gloss vs. Stealth
              <br />
              <span className="text-[#9FFE0A]">Matte Finishes</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          </div>

          <div className="mb-10 max-w-4xl mx-auto">
            <GlossMatteSlider
              glossSrc="/assets/ppf-finish-gloss.jpg"
              matteSrc="/assets/ppf-finish-matte.jpg"
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
                Stealth Matte PPF
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

      <PPFFaq />

      <PPFFinalCTA />
    </main>
  )
}
