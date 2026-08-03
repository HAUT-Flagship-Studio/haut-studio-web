import Hero from '@/components/Hero'
import ServicesOverview from '@/components/ServicesOverview'
import RoadHazards from '@/components/RoadHazards'
import ProcessBanner from '@/components/ProcessBanner'
import Reviews from '@/components/Reviews'
import FAQSection from '@/components/FAQSection'
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
        subtitle="As the manufacturer's own flagship studio, we install the patterns and processes the rest of the industry licenses secondhand — across Paint Protection Film, Ceramic Coating, and Window Tinting. Every install is backed by a direct manufacturer warranty, honored in any state nationwide."
        trustBadges={['★ 5.0 Google Reviews', 'Manufacturer Flagship Studio', '10-Year Nationwide Warranty', 'Exotic & Supercar Specialists']}
      />

      <RoadHazards />

      <ProcessBanner
        eyebrow="✦ How It Works"
        heading="The HAUT Installation Standard."
        subtitle="With over 10+ years of hands-on experience, our master technicians spent years refining their trade as trusted partners for regional Ferrari, Porsche, McLaren, and Lamborghini dealerships. Today, HAUT operates 100% direct-to-owner, applying those exact factory-certified standards directly to your vehicle with zero volume compromises."
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

      <Reviews />

      <ServicesOverview />

      <FAQSection />

      <LocationMap />
    </main>
  )
}
