/**
 * Regenerates lib/serviceArea.ts from the U.S. Census Bureau Gazetteer.
 *
 * Run by hand when the radius changes or a new Gazetteer year is published —
 * municipal boundaries move about once a decade, so this is not a build step:
 *
 *   node scripts/build-service-area.mjs            # 10 miles, 2023 Gazetteer
 *   node scripts/build-service-area.mjs --miles 15
 *
 * It reads the County Subdivisions file, not the Places file. In New Jersey
 * every municipality is a county subdivision, while the Places file omits
 * townships entirely — building this list from Places drops Teaneck, Saddle
 * Brook, Rochelle Park and South Hackensack, all within three miles.
 */
import { readFileSync, writeFileSync } from 'node:fs'

/**
 * The studio pin, read out of lib/data.ts rather than imported: that module
 * pulls in the rest of lib/ through extensionless TypeScript imports, which
 * plain Node will not resolve. Parsing keeps one source of truth for the
 * coordinates without dragging a TypeScript loader into a script that runs
 * about once a decade.
 */
function studioPin() {
  const src = readFileSync('lib/data.ts', 'utf8')
  const lat = /\blat:\s*(-?\d+\.\d+)/.exec(src)
  const lng = /\blng:\s*(-?\d+\.\d+)/.exec(src)
  if (!lat || !lng) throw new Error('lib/data.ts no longer declares STUDIO.lat / STUDIO.lng')
  return { lat: Number(lat[1]), lng: Number(lng[1]) }
}
const STUDIO = studioPin()

const YEAR = 2023
const SOURCE = `https://www2.census.gov/geo/docs/maps-data/data/gazetteer/${YEAR}_Gazetteer/${YEAR}_Gaz_cousubs_national.zip`

const milesArg = process.argv.indexOf('--miles')
const RADIUS = milesArg > -1 ? Number(process.argv[milesArg + 1]) : 10

/**
 * County FIPS → name, per state, for the counties a radius this size can reach.
 * New York is here for Manhattan: 8.6 miles by air, and the Lincoln Tunnel makes
 * it a real catchment rather than a line on a map. Nothing else in New York
 * comes inside ten miles — the Bronx is 11.3.
 */
const COUNTIES = {
  NJ: { '003': 'Bergen', '013': 'Essex', '017': 'Hudson', '031': 'Passaic' },
  NY: { '061': 'New York' },
}

const EARTH_RADIUS_MILES = 3958.7613
function distance(lat1, lng1, lat2, lng2) {
  const rad = (d) => (d * Math.PI) / 180
  const dLat = rad(lat2 - lat1)
  const dLng = rad(lng2 - lng1)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h))
}

/** The Gazetteer ships as a zip of one tab-separated file. */
async function fetchGazetteer() {
  const res = await fetch(SOURCE)
  if (!res.ok) throw new Error(`Census returned ${res.status} for ${SOURCE}`)
  const { inflateRawSync } = await import('node:zlib')
  const zip = Buffer.from(await res.arrayBuffer())

  // Minimal ZIP reader: this archive holds exactly one entry. A ZIP stores raw
  // DEFLATE, not zlib-wrapped, so inflateRaw is the one that works here.
  if (zip.readUInt32LE(0) !== 0x04034b50) throw new Error('not a ZIP archive')
  const method = zip.readUInt16LE(8)
  const start = 30 + zip.readUInt16LE(26) + zip.readUInt16LE(28)
  const body = zip.subarray(start)
  if (method === 0) return body.toString('utf8')
  if (method !== 8) throw new Error(`unexpected ZIP compression method ${method}`)
  return inflateRawSync(body).toString('utf8')
}

/**
 * Towns the owner asked to be named (2026-10-02) although their centres lie
 * beyond the radius: the Saddle River valley and Franklin Lakes. They are
 * measured from the same Gazetteer row as everything else and published as a
 * separate export, so the "within N miles" sentence stays true and these read
 * as what they are — named, not inside.
 */
const NAMED_BEYOND_RADIUS = new Set(['Saddle River', 'Upper Saddle River', 'Franklin Lakes'])

const text = await fetchGazetteer()
const towns = []
const beyond = []

for (const line of text.split('\n').slice(1)) {
  const f = line.split('\t')
  if (f.length < 11) continue

  const state = f[0].trim()
  if (!COUNTIES[state]) continue

  const lat = Number(f[9])
  const lng = Number(f[10])
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue

  const miles = distance(STUDIO.lat, STUDIO.lng, lat, lng)

  const county = COUNTIES[state][f[1].trim().slice(2, 5)]
  if (!county) continue

  // "Lodi borough" is how the Census writes it; "Lodi" is how anyone says it.
  // Washington keeps its suffix — New Jersey has several Washington Townships.
  let name = f[3].trim().replace(/ (borough|city|town|township|village)$/, '')
  if (name === 'Washington') name = 'Washington Township'

  const row = { name, state, county, miles: Number(miles.toFixed(1)) }
  if (miles > RADIUS) {
    if (NAMED_BEYOND_RADIUS.has(name)) beyond.push(row)
    continue
  }
  towns.push(row)
}

const byDistance = (a, b) => a.miles - b.miles || a.name.localeCompare(b.name)
towns.sort(byDistance)
beyond.sort(byDistance)
for (const name of NAMED_BEYOND_RADIUS) {
  if (!beyond.some((t) => t.name === name)) throw new Error(`${name} not found beyond ${RADIUS} miles in the Gazetteer`)
}

const toRows = (list) =>
  list
    .map(
      (t) =>
        `  { name: '${t.name.replace(/'/g, "\\'")}', state: '${t.state}', county: '${t.county}', miles: ${t.miles.toFixed(1)} },`
    )
    .join('\n')
const rows = toRows(towns)
const beyondRows = toRows(beyond)
const everyTown = [...towns, ...beyond]

const file = `/**
 * Every municipality whose centre lies within ${RADIUS} miles of the studio at
 * 361 NJ-17 — all of New Jersey's, plus Manhattan across the Hudson.
 *
 * The list is measured, not assembled by hand. Distances are great-circle miles
 * from STUDIO.lat/lng — the verified Google Business Profile pin — to each
 * municipality's internal point in the U.S. Census Bureau ${YEAR} County
 * Subdivisions Gazetteer. New Jersey has no unincorporated land, and every
 * municipality is a county subdivision, so that file is the complete set; the
 * Gazetteer's separate "places" file silently omits townships, which would have
 * dropped Teaneck, Saddle Brook, Rochelle Park and South Hackensack — three of
 * them closer than two miles.
 *
 * Straight-line, therefore, not drive time. The gap is widest for Manhattan,
 * whose ${towns.find((t) => t.state === 'NY')?.miles.toFixed(1) ?? '8.6'} miles are measured over water the car cannot cross: the trip runs
 * through the Lincoln Tunnel and Route 3. Quote these as distance, never as
 * minutes.
 *
 * Regenerate rather than edit by hand — see scripts/build-service-area.mjs.
 */
export type ServiceAreaTown = {
  name: string
  state: ${[...new Set(everyTown.map((t) => t.state))].sort().map((s) => `'${s}'`).join(' | ')}
  county: ${[...new Set(everyTown.map((t) => t.county))].sort().map((c) => `'${c}'`).join(' | ')}
  /** Great-circle miles from the studio to the municipality's centre. */
  miles: number
}

/** Spelled out, for schema.org and anywhere a two-letter code would read wrong. */
export const STATE_NAMES: Record<ServiceAreaTown['state'], string> = {
${[...new Set(everyTown.map((t) => t.state))]
  .sort()
  .map((s) => `  ${s}: '${{ NJ: 'New Jersey', NY: 'New York' }[s] ?? s}',`)
  .join('\n')}
}

export const SERVICE_RADIUS_MILES = ${RADIUS}

export const SERVICE_AREA: ServiceAreaTown[] = [
${rows}
]

/**
 * Named at the owner's request although their centres lie beyond the radius.
 * Measured the same way as everything above and kept apart from it, so the
 * "within ${RADIUS} miles" sentence stays true wherever it is printed.
 */
export const BEYOND_RADIUS: ServiceAreaTown[] = [
${beyondRows}
]

/** Every town the site names, nearest first: the radius plus the named exceptions. */
export const ALL_NAMED_TOWNS: ServiceAreaTown[] = [...SERVICE_AREA, ...BEYOND_RADIUS]

/** Towns of one state, nearest first. */
export const townsInState = (state: ServiceAreaTown['state']) =>
  SERVICE_AREA.filter((t) => t.state === state)

/** Towns of one county, nearest first. */
export const townsInCounty = (county: ServiceAreaTown['county']) =>
  SERVICE_AREA.filter((t) => t.county === county)

/**
 * New Jersey counties the radius reaches, most-covered first. New York is not
 * here: one borough does not make a county section, and Manhattan reads better
 * as what it is — the far side of the river.
 */
export const SERVICE_AREA_COUNTIES = [...new Set(townsInState('NJ').map((t) => t.county))].sort(
  (a, b) => townsInCounty(b).length - townsInCounty(a).length
)
`

writeFileSync('lib/serviceArea.ts', file)
console.log(`lib/serviceArea.ts — ${towns.length} municipalities within ${RADIUS} miles, ${beyond.length} named beyond it`)
