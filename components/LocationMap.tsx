import Link from 'next/link'
import { STUDIO } from '@/lib/data'
import { SERVICE_AREA, SERVICE_RADIUS_MILES } from '@/lib/serviceArea'
import { PhoneLink, AddressLink } from './TrackedLinks'

export default function LocationMap() {
  // Coordinates (not the address string) are used for the embed query — the free,
  // keyless Google Maps embed geocoder resolves this NJ-17 address (and even the
  // business name + address) to the wrong town, neighboring Lodi, not Hackensack;
  // exact lat/lng from the verified Google Business Profile is the reliable fix.
  const mapQuery = `${STUDIO.lat},${STUDIO.lng}`

  return (
    <section
      id="contact"
      className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Studio location and contact"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-left">
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">
            ✦ Visit the Studio
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Find Us in
            <br />
            <span className="text-[#9FFE0A]">Hackensack, NJ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Dark-styled map embed — click anywhere to open the verified Google Maps profile */}
          <div className="lg:col-span-3 card-folded border border-slate-800 overflow-hidden relative min-h-[360px] group">
            <iframe
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="absolute inset-0 w-full h-full border-0 pointer-events-none"
              style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HAUT Flagship Studio location map"
            />
            <AddressLink
              location="location_map_embed"
              className="absolute inset-0 z-10 flex items-end justify-center bg-[#1A292E]/0 group-hover:bg-[#1A292E]/20 transition-colors duration-200"
              aria-label="Open HAUT Flagship Studio location in Google Maps"
            >
              <span className="mb-4 px-4 py-2 bg-[#1A292E]/90 backdrop-blur border border-[#9FFE0A]/40 text-[#9FFE0A] text-xs font-roboto tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View on Google Maps →
              </span>
            </AddressLink>
          </div>

          {/* Info card */}
          <div className="lg:col-span-2 card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-5">HAUT Flagship Studio</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#9FFE0A]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-roboto text-white text-sm">{STUDIO.address}</p>
                    <AddressLink
                      location="location_map_directions"
                      className="font-roboto text-[#9FFE0A] text-xs hover:underline"
                    >
                      Get Directions →
                    </AddressLink>
                    <p className="font-roboto text-[#DADADA]/60 text-xs mt-2">
                      <Link href="/service-area" className="text-[#9FFE0A] hover:underline">
                        {SERVICE_AREA.length} towns within {SERVICE_RADIUS_MILES} miles →
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#9FFE0A]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    <p>Mon–Fri: 9AM – 6PM</p>
                    <p>Saturday: 9AM – 4PM</p>
                  </div>
                </div>
              </div>
            </div>
            <PhoneLink
              location="location_map_call_button"
              className="btn-green w-full py-4 text-sm tracking-wider rounded-none text-center mt-8"
            >
              Call {STUDIO.phone}
            </PhoneLink>
          </div>
        </div>
      </div>
    </section>
  )
}
