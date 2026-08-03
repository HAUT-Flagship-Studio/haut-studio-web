import Link from 'next/link'
import Image from 'next/image'
import { SERVICES_OVERVIEW } from '@/lib/data'

export default function ServicesOverview() {
  return (
    <section
      id="services"
      className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Services overview"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-left">
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">
            ✦ OUR EXPERTISE
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Flawless Inside & Out.
            <br />
            <span className="text-[#9FFE0A]">New Car Feeling, Every Day.</span>
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_OVERVIEW.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="card-folded group flex flex-col bg-[#1A292E]/90 backdrop-blur border border-slate-800 hover:border-[#9FFE0A]/40 transition-all duration-300 hover:-translate-y-1"
              aria-label={`Explore ${service.name}`}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A292E] to-transparent p-4">
                  <span className="font-roboto text-[#DADADA] text-xs">From</span>{' '}
                  <span className="font-kanit font-black text-[#9FFE0A] text-2xl">
                    ${service.priceFrom.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-[#9FFE0A] transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-4">
                  {service.tagline}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#9FFE0A] group-hover:gap-3 transition-all duration-200">
                  Explore {service.name}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
