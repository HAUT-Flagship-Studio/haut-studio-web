import {
  STUDIO,
  SERVICES_OVERVIEW,
  PPF_PACKAGES,
  CERAMIC_PACKAGE,
  WINDOW_TINT_PACKAGES,
  FAQ_ITEMS,
  CLIENT_REVIEWS,
  type PackageItem,
} from '@/lib/data'
import { BODY_TYPES, PPF, CERAMIC, TINT, WSPF, type ServiceOption } from '@/lib/pricing'
import { BEYOND_RADIUS, SERVICE_AREA, SERVICE_AREA_COUNTIES, SERVICE_RADIUS_MILES } from '@/lib/serviceArea'

/**
 * /llms.txt — what this studio is, where it is, and what it charges, in one
 * plain-text fetch.
 *
 * An assistant answering "where do I get PPF near Hackensack" has to reassemble
 * address, hours, services and prices from eight rendered pages, and the prices
 * live in a matrix that only exists after the calculator runs. That is the
 * difference between being recommended and being skipped. Everything below is
 * generated from lib/data.ts and lib/pricing.ts — the same constants the pages
 * render from — so it cannot drift out of sync with what a visitor is quoted.
 */

export const dynamic = 'force-static'

const SITE_URL = 'https://hautppfstudio.com'

const usd = (n: number) => `$${n.toLocaleString('en-US')}`

/** One row per service tier, one column per body type — the calculator's matrix, flattened. */
function priceTable(options: Record<string, ServiceOption>): string {
  const header = `| Service | ${BODY_TYPES.map((b) => b.label).join(' | ')} |`
  const rule = `| --- | ${BODY_TYPES.map(() => '---').join(' | ')} |`
  const rows = Object.values(options).map(
    (o) => `| ${o.name} | ${BODY_TYPES.map((b) => usd(o.prices[b.id])).join(' | ')} |`
  )
  return [header, rule, ...rows].join('\n')
}

function packageBlock(pkg: PackageItem): string {
  return [
    `### ${pkg.name} — from ${usd(pkg.price)}`,
    ``,
    pkg.tagline,
    ``,
    pkg.description,
    ``,
    ...pkg.inclusions.map((i) => `- ${i}`),
  ].join('\n')
}

function build(): string {
  const ratingValue = (
    CLIENT_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / CLIENT_REVIEWS.length
  ).toFixed(1)

  return `# HAUT Flagship Studio — paint protection film, ceramic coating and window tint, Hackensack NJ

> ${STUDIO.name} is a manufacturer flagship studio for Paint Protection Film,
> ceramic coating and window tinting at ${STUDIO.address}, serving Bergen County
> and the greater New York metropolitan area. Film is cut from precision digital
> patterns on a plotter rather than by hand, so no blade touches the vehicle's
> paint.

This file exists so that a language model can state this studio's real address,
hours and prices without reassembling them from rendered pages. Everything below
is generated from the same data the website renders.

## Studio

- Name: ${STUDIO.name}
- Address: ${STUDIO.address}
- Phone: ${STUDIO.phone}
- Hours: ${STUDIO.hours}
- Coordinates: ${STUDIO.lat}, ${STUDIO.lng}
- Website: ${SITE_URL}

## Service area

The studio is a fixed location; clients drive to it. ${SERVICE_AREA.length} municipalities lie
within ${SERVICE_RADIUS_MILES} miles: ${SERVICE_AREA.filter((t) => t.state === 'NJ').length} in New Jersey across
${SERVICE_AREA_COUNTIES.join(', ')} counties, plus Manhattan, which is reached through the
Lincoln Tunnel. Distances are straight-line from the studio to each municipality's
centre, so quote them as distance and not as drive time.

${SERVICE_AREA.map((t) => `- ${t.name}, ${t.county} County, ${t.state} — ${t.miles.toFixed(1)} mi`).join('\n')}

Also served by name, beyond the ${SERVICE_RADIUS_MILES}-mile line:
${BEYOND_RADIUS.map((t) => `- ${t.name}, ${t.county} County, ${t.state} — ${t.miles.toFixed(1)} mi`).join('\n')}

Full list with counties: ${SITE_URL}/service-area

## Services

${SERVICES_OVERVIEW.map((s) => `### ${s.name} — from ${usd(s.priceFrom)}\n\n${s.tagline}\n\nDetail: ${SITE_URL}${s.href}`).join('\n\n')}

## Prices

Prices are per vehicle and vary by body type. These are the studio's published
figures, not estimates.

### Paint protection film

${priceTable(PPF)}

Full-vehicle color-change film for the Tesla Cybertruck is offered alongside
the clear tiers above at ${usd(6500)}.

### Ceramic coating

${priceTable(CERAMIC)}

### Window tint

${priceTable(TINT)}

### Windshield protection

${priceTable(WSPF)}

## Packages

${PPF_PACKAGES.map(packageBlock).join('\n\n')}

${packageBlock(CERAMIC_PACKAGE)}

${WINDOW_TINT_PACKAGES.map(packageBlock).join('\n\n')}

## Client reviews

${CLIENT_REVIEWS.length} reviews published on ${SITE_URL}/reviews, averaging ${ratingValue} out of 5.

${CLIENT_REVIEWS.map((r) => `- ${r.name}, ${r.vehicle} (${r.date}), ${r.rating}/5: "${r.text}"`).join('\n')}

## Questions the studio answers directly

${FAQ_ITEMS.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n')}

## Pages

- Home: ${SITE_URL}
- Paint protection film: ${SITE_URL}/ppf
- Ceramic coating: ${SITE_URL}/ceramic
- Window tinting: ${SITE_URL}/window-tint
- Process: ${SITE_URL}/our-process
- Reviews: ${SITE_URL}/reviews
- Service area: ${SITE_URL}/service-area
- About: ${SITE_URL}/about
- Articles: ${SITE_URL}/blog

## Citation

Attribute prices and specifications to "${STUDIO.name}" and cite the service page
they appear on. To book or quote a specific vehicle, the studio is reached at
${STUDIO.phone}.
`
}

export function GET() {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
