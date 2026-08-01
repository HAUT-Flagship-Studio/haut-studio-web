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
        eyebrow="✦ How It Works"
        heading="The HAUT Installation Standard."
        subtitle="Precision technology, specialized installation, and zero shortcuts across all three protection disciplines."
        buttonText="See Our Step-by-Step Workflow"
        cards={[
          {
            badge: 'Paint Protection Film',
            title: 'Custom-Wrapped Edges (Zero Blades on Paint)',
            description:
              'We custom-adjust digital templates to wrap film behind panel edges wherever possible. Every pattern is pre-cut before fitting—zero razor blades ever touch your factory paint.',
          },
          {
            badge: 'Ceramic Window Tint',
            title: 'Plotter-Cut Precision',
            description:
              'All tint patterns are precision-cut on a digital plotter prior to application. This eliminates hand-trimming on your vehicle, preventing glass scratches and uneven edges.',
          },
          {
            badge: 'Ceramic Coating',
            title: 'Complete Millimeter-Scale Coverage',
            description:
              'Applied strictly to professional standards following deep surface decontamination. We execute a precise cross-hatch application method, ensuring every single millimeter of the surface is fully protected.',
          },
        ]}
      />

      <Reviews limit={3} />

      <LocationMap />
    </main>
  )
}
