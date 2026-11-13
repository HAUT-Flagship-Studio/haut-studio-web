import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'
import Packages from '@/components/Packages'
import VideoTestimonials from '@/components/VideoTestimonials'
import DriveFrom from '@/components/DriveFrom'
import PPFFinalCTA from '@/components/PPFFinalCTA'
import { PPF_PACKAGES } from '@/lib/data'
import { EXOTIC_PPF_PRICE, MAKE_PAGES, makePhotos } from '@/lib/makes'

const BASE_URL = 'https://hautppfstudio.com'

// The owner-confirmed install facts from /ppf's "Before You Book", in short.
const HOW_IT_GOES_ON = [
  {
    title: 'Cut before it touches the car',
    detail: 'Every panel is cut on a plotter from HAUT Precision Scan patterns. No blade is used on the paint.',
  },
  {
    title: 'Edges wrapped where the panel allows',
    detail: 'Patterns are drawn with wrap-arounds wherever an edge is reachable, so the film tucks around the panel instead of ending on its face.',
  },
  {
    title: 'Nothing taken apart unless you ask',
    detail: 'Bumpers, headlights and trim stay on the car. Door handles and emblems come off only if you ask.',
  },
  {
    title: 'Factory paint comes back clean',
    detail: 'No edge prep is brushed on, so film comes off factory paint clean. Repainted panels are the risk — tell us if the car has any.',
  },
  {
    title: 'A lifted edge is ours to fix',
    detail: 'If an edge lifts, that is the install, not the car, and we redo it at no charge.',
  },
]

function exoticPackages() {
  return PPF_PACKAGES.map((pkg) => {
    const price = EXOTIC_PPF_PRICE[pkg.id]
    if (price === undefined) throw new Error(`No Exotic / Supercar price for package ${pkg.id}`)
    return { ...pkg, price }
  })
}

export function generateStaticParams() {
  return MAKE_PAGES.map((page) => ({ make: page.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ make: string }>
}): Promise<Metadata> {
  const { make } = await params
  const page = MAKE_PAGES.find((p) => p.slug === make)
  if (!page) return {}
  const models = [...new Set(makePhotos(page.make).map((p) => p.vehicle))].join(', ')
  const from = Math.min(...Object.values(EXOTIC_PPF_PRICE)).toLocaleString('en-US')
  return {
    title: `${page.make} Paint Protection Film (PPF) in Hackensack, NJ | HAUT Flagship Studio`,
    description: `${page.make} PPF installed in Hackensack, NJ, for Bergen County and North Jersey owners: ${models} done in this studio, patterns cut with no blade on the paint, 10-year manufacturer warranty, Exotic-class packages from $${from}.`,
    alternates: { canonical: `${BASE_URL}/ppf/${page.slug}` },
  }
}

export default async function MakePPFPage({ params }: { params: Promise<{ make: string }> }) {
  const { make } = await params
  const page = MAKE_PAGES.find((p) => p.slug === make)
  if (!page) notFound()

  const photos = makePhotos(page.make)
  const packages = exoticPackages()

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${page.make} paint protection film`,
      serviceType: 'Paint protection film installation',
      provider: { '@id': `${BASE_URL}/#studio` },
      url: `${BASE_URL}/ppf/${page.slug}`,
      image: photos.map((p) => `${BASE_URL}${p.image}`),
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: Math.min(...packages.map((p) => p.price)),
        highPrice: Math.max(...packages.map((p) => p.price)),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Paint Protection Film', item: `${BASE_URL}/ppf` },
        { '@type': 'ListItem', position: 2, name: page.make, item: `${BASE_URL}/ppf/${page.slug}` },
      ],
    },
  ]

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <PageHero
        backgroundImage={photos[0].image}
        eyebrow="Manufacturer Flagship Studio"
        heading={
          <>
            <span className="block font-roboto font-medium text-sm sm:text-base tracking-[0.2em] uppercase text-[#DADADA] mb-4">
              {`${page.make} Paint Protection Film in Hackensack, NJ`}
            </span>
            <span className="text-[#9FFE0A]">{page.headline}</span>
          </>
        }
        subtitle={page.subtitle}
      />

      {/* The cars of this make, from this bay */}
      <section
        data-track-section="make_work"
        className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        aria-label={`${page.make} installs at HAUT Flagship Studio`}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">✦ From This Bay</p>
          <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-6">
            {page.make}s We Have
            <br />
            <span className="text-[#9FFE0A]">Protected Here.</span>
          </h2>
          <div className="max-w-3xl space-y-4 mb-10">
            {page.intro.map((p) => (
              <p key={p} className="font-roboto text-[#DADADA] text-base leading-relaxed">
                {p}
              </p>
            ))}
            {page.further && (
              <p className="font-roboto text-[#DADADA] text-base leading-relaxed">
                {page.further.text}{' '}
                <a href={page.further.href} className="text-[#9FFE0A] hover:underline">
                  {page.further.label}
                </a>
              </p>
            )}
          </div>
          <div className={`grid grid-cols-1 gap-4 ${photos.length > 1 ? 'sm:grid-cols-2' : ''} ${photos.length > 2 ? 'lg:grid-cols-3' : ''}`}>
            {photos.map((item) => (
              <figure
                key={item.id}
                className={`card-folded relative overflow-hidden border border-slate-800 ${photos.length === 1 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
              >
                <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A292E]/95 to-transparent p-4">
                  <p className="text-white text-sm font-bold leading-tight">{item.vehicle}</p>
                  <p className="text-[#9FFE0A] text-xs font-roboto uppercase tracking-wide">{item.service}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* How the film goes on */}
      <section
        data-track-section="make_install"
        className="bg-[#1A292E] py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
        aria-label="How the film goes on"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">✦ How It Goes On</p>
          <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-10">
            The Same Standard
            <br />
            <span className="text-[#9FFE0A]">on Every {page.make}.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_GOES_ON.map((item) => (
              <div key={item.title} className="card-folded bg-[#1A292E]/90 border border-slate-800 p-6">
                <h3 className="font-kanit font-bold text-white text-xl mb-2">{item.title}</h3>
                <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mt-8 max-w-3xl">
            The full answers, with photos, are on the{' '}
            <Link href="/ppf" className="text-[#9FFE0A] hover:underline">
              paint protection film page
            </Link>
            .
          </p>
        </div>
      </section>

      <Packages
        packages={packages}
        eyebrow={`Coverage for a ${page.make}`}
        title={
          <>
            Exotic / Supercar
            <br />
            <span className="text-[#9FFE0A]">Pricing</span>
          </>
        }
        note={page.coverage}
      />

      {page.videoIds && (
        <VideoTestimonials
          ids={page.videoIds}
          eyebrow="✦ Is It Worth The Price?"
          title={
            <>
              A {page.make} Owner On Why
              <br />
              <span className="text-[#9FFE0A]">We Cost More.</span>
            </>
          }
        />
      )}

      <DriveFrom service={`${page.make} paint protection film`} />

      <PPFFinalCTA />
    </main>
  )
}
