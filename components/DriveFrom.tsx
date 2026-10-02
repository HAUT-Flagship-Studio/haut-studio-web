import Link from 'next/link'
import { SERVICE_AREA, SERVICE_RADIUS_MILES } from '@/lib/serviceArea'

/**
 * One sentence naming the nearest towns, on each service page.
 *
 * Search Console shows people searching by town — "window tint lodi nj",
 * "paint protection film lodi nj", "ppf installation fair lawn" — and the
 * service pages answered at positions 60–85 because none of them said the
 * word. Lodi is first on purpose: 361 NJ-17 sits on the Hackensack–Lodi line
 * and Google geocodes the address to Lodi as often as to Hackensack. Towns
 * come from lib/serviceArea.ts so a distance here can never disagree with
 * /service-area; the link at the end is the only place the full list lives.
 */
const NAMED = ['Lodi', 'Teaneck', 'Garfield', 'Saddle Brook', 'Paramus', 'Fair Lawn']

export default function DriveFrom({ service }: { service: string }) {
  const towns = NAMED.map((name) => SERVICE_AREA.find((t) => t.name === name))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .sort((a, b) => a.miles - b.miles)

  return (
    <section
      className="bg-[#1A292E] py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
      aria-label="Where clients drive from"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
          Where Clients Drive From
        </p>
        <p className="font-roboto text-[#DADADA] text-base leading-relaxed">
          The studio is at 361 NJ-17 on the Hackensack–Lodi line, so {service} here is a short drive
          for most of Bergen County:{' '}
          {towns.map((t, i) => (
            <span key={t.name}>
              {t.name} ({t.miles.toFixed(1)} mi){i < towns.length - 1 ? ', ' : ''}
            </span>
          ))}
          .{' '}
          <Link href="/service-area" className="text-[#9FFE0A] hover:underline">
            See every town within {SERVICE_RADIUS_MILES} miles →
          </Link>
        </p>
      </div>
    </section>
  )
}
