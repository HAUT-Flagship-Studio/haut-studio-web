import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import FilmSpecs from '@/components/FilmSpecs'
import OurProcess from '@/components/OurProcess'
import Packages from '@/components/Packages'
import PricingMatrix from '@/components/PricingMatrix'
import { PPF_PACKAGES, PPF_FEATURE_MATRIX } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Paint Protection Film (PPF) Packages & Pricing | HAUT Flagship Studio',
  description:
    'Military-grade TPU paint protection film with a self-healing topcoat and 10-year manufacturer warranty. Front End, Highway, and Full Vehicle packages installed by certified master installers in Hackensack, NJ. Compare packages and pricing.',
  alternates: {
    canonical: 'https://hautppfstudio.com/ppf',
  },
}

export default function PPFPage() {
  return (
    <main>
      <Hero />

      <FilmSpecs />

      <OurProcess />

      <Packages packages={PPF_PACKAGES} />

      {/* Pricing Matrix */}
      <section
        className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        aria-label="Paint protection film pricing matrix"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
              Compare Coverage
            </p>
            <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Panel-by-Panel
              <br />
              <span className="text-[#9FFE0A]">Breakdown</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          </div>
          <PricingMatrix packages={PPF_PACKAGES} features={PPF_FEATURE_MATRIX} />
        </div>
      </section>
    </main>
  )
}
