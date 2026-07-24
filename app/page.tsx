import Hero from '@/components/Hero'
import ServicesOverview from '@/components/ServicesOverview'
import FilmSpecs from '@/components/FilmSpecs'
import Reviews from '@/components/Reviews'
import LocationMap from '@/components/LocationMap'

export default function HomePage() {
  return (
    <main>
      <Hero
        locationBadge="Hackensack, NJ • Certified Master Installers"
        heading={
          <>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">Paint Damage.</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">Faded Tint.</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#9FFE0A]">
              Stopped Cold.
            </span>
          </>
        }
        subtitle="Bergen County and Northern NJ's certified installers for self-healing optical TPU paint protection film, dual-layer ceramic coating, and precision window tinting — every install cut from DAP digital precision patterns for zero-blade contact, backed by a 10-year manufacturer warranty on film."
        trustBadges={['Self-Healing Optical TPU', 'Dual-Layer Ceramic', 'Precision Window Tint', '10-Year PPF Warranty']}
        imageAlt="Vehicle protected by HAUT Flagship Studio in Hackensack, NJ"
      />

      <ServicesOverview />

      <FilmSpecs limit={3} ctaHref="/ppf" />

      <Reviews limit={3} />

      <LocationMap />
    </main>
  )
}
