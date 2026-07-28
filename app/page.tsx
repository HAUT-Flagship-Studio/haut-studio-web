import Hero from '@/components/Hero'
import ServicesOverview from '@/components/ServicesOverview'
import RoadHazards from '@/components/RoadHazards'
import ProcessBanner from '@/components/ProcessBanner'
import Reviews from '@/components/Reviews'
import LocationMap from '@/components/LocationMap'

export default function HomePage() {
  return (
    <main>
      <Hero
        locationBadge="HAUT FLAGSHIP STUDIO • HACKENSACK, NJ"
        heading={
          <>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">PPF & Ceramic.</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">Window Tinting.</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#9FFE0A]">
              Total Protection.
            </span>
          </>
        }
        subtitle="As the manufacturer flagship studio, we set the installation benchmarks the rest of the industry tries to follow. We deliver elite master-class craftsmanship across our three core disciplines: Paint Protection Film, Ceramic Coating, and Window Tinting. Experience direct-from-source quality you can trust, secured by a direct manufacturer warranty valid in any state nationwide."
        trustBadges={['Durable Optic Clear PPF', 'Extra Shiny Ceramic Coating', 'Heat & UV Rejected Window Tint', 'Nationwide Manufacturer Warranty']}
      />

      <ServicesOverview />

      <RoadHazards />

      <ProcessBanner
        heading={
          <>
            Zero-Blade Precision,
            <br />
            <span className="text-[#9FFE0A]">Every Panel, Every Install</span>
          </>
        }
        subtitle="From paint decontamination to final inspection, every PPF, ceramic coating, and window tint install at HAUT follows the same DAP digital precision process in our climate-controlled Hackensack, NJ studio. See the full step-by-step breakdown for all three services."
      />

      <Reviews limit={3} />

      <LocationMap />
    </main>
  )
}
