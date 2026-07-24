import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reviews from '@/components/Reviews'

export const metadata: Metadata = {
  title: 'Client Reviews | HAUT Flagship Studio',
  description:
    "Real reviews from Bergen County's exotic and luxury vehicle owners — Paint Protection Film, ceramic coating, and window tinting installed by HAUT Flagship Studio's certified master installers in Hackensack, NJ.",
  alternates: {
    canonical: 'https://hautppfstudio.com/reviews',
  },
}

export default function ReviewsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Client Reviews"
        heading={
          <>
            What Clients
            <br />
            <span className="text-[#9FFE0A]">Say About the Work</span>
          </>
        }
        subtitle="Real reviews from Bergen County's exotic and luxury vehicle owners who trusted HAUT Flagship Studio's certified master installers with their paint protection film, ceramic coating, and window tinting installs."
        ctaLabel="Get Custom Estimate"
      />
      <Reviews showHeader={false} />
    </main>
  )
}
