import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneLink } from '@/components/TrackedLinks'
import { STUDIO } from '@/lib/data'

// Until now a wrong address got Next's built-in 404: black text on white, no
// header, no footer, no way back. Analytics showed thirteen such addresses in
// ninety days — /team, /staff, /people, /our-team, /contact-us and the rest,
// two views each. That shape is a scanner walking a list, not a visitor, which
// is exactly why none of them earned a redirect: pointing /people at the
// homepage would be building for a bot. What a real person needs, arriving on a
// stale link or a typo, is the way back, and that is what this page is.
//
// noindex because a soft 404 in the index is worse than none — the status code
// already says 404, and this makes sure a crawler that renders the page agrees.
export const metadata: Metadata = {
  title: 'Page Not Found | HAUT Flagship Studio',
  robots: { index: false, follow: true },
}

const ROUTES = [
  { href: '/ppf', label: 'Paint Protection Film', note: 'Packages, pricing and the film itself' },
  { href: '/ceramic', label: 'Ceramic Coating', note: 'Dual-layer 9H, from $999' },
  { href: '/window-tint', label: 'Automotive Window Tinting', note: 'Ceramic IR film, from $199' },
  { href: '/our-process', label: 'Our Process', note: 'Every step, decontamination to inspection' },
  { href: '/service-area', label: 'Service Area', note: 'Every town within 10 miles' },
  { href: '/reviews', label: 'Client Reviews', note: 'Unedited, as they were written' },
]

export default function NotFound() {
  return (
    <main className="bg-[#1A292E] precision-grid min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-5xl mx-auto w-full">
        <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">Error 404</p>
        <h1 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
          That Address Doesn&apos;t Exist
          <br />
          <span className="text-[#9FFE0A]">Here Is What Does</span>
        </h1>
        <div className="w-16 h-0.5 bg-[#9FFE0A] mb-8" />
        <p className="font-roboto text-[#DADADA] text-base leading-relaxed max-w-2xl mb-10">
          The page you asked for is not on this site — most likely an old link or a typed address. The studio
          is still at {STUDIO.address}, and everything it does is one click away.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {ROUTES.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 hover:border-[#9FFE0A]/50 p-5 block h-full transition-colors"
              >
                <span className="font-kanit font-semibold text-white text-base block mb-1">{r.label}</span>
                <span className="font-roboto text-[#DADADA]/60 text-sm">{r.note}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="btn-green px-8 py-4 text-sm tracking-wider rounded-none text-center font-kanit font-semibold"
          >
            Back to the Homepage
          </Link>
          <PhoneLink location="not_found_cta" className="btn-outline px-8 py-4 text-sm text-center rounded-none">
            Call {STUDIO.phone}
          </PhoneLink>
        </div>
      </div>
    </main>
  )
}
