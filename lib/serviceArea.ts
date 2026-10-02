/**
 * Every municipality whose centre lies within 10 miles of the studio at
 * 361 NJ-17 — all of New Jersey's, plus Manhattan across the Hudson.
 *
 * The list is measured, not assembled by hand. Distances are great-circle miles
 * from STUDIO.lat/lng — the verified Google Business Profile pin — to each
 * municipality's internal point in the U.S. Census Bureau 2023 County
 * Subdivisions Gazetteer. New Jersey has no unincorporated land, and every
 * municipality is a county subdivision, so that file is the complete set; the
 * Gazetteer's separate "places" file silently omits townships, which would have
 * dropped Teaneck, Saddle Brook, Rochelle Park and South Hackensack — three of
 * them closer than two miles.
 *
 * Straight-line, therefore, not drive time. The gap is widest for Manhattan,
 * whose 8.6 miles are measured over water the car cannot cross: the trip runs
 * through the Lincoln Tunnel and Route 3. Quote these as distance, never as
 * minutes.
 *
 * Regenerate rather than edit by hand — see scripts/build-service-area.mjs.
 */
export type ServiceAreaTown = {
  name: string
  state: 'NJ' | 'NY'
  county: 'Bergen' | 'Essex' | 'Hudson' | 'New York' | 'Passaic'
  /** Great-circle miles from the studio to the municipality's centre. */
  miles: number
}

/** Spelled out, for schema.org and anywhere a two-letter code would read wrong. */
export const STATE_NAMES: Record<ServiceAreaTown['state'], string> = {
  NJ: 'New Jersey',
  NY: 'New York',
}

export const SERVICE_RADIUS_MILES = 10

export const SERVICE_AREA: ServiceAreaTown[] = [
  { name: 'Lodi', state: 'NJ', county: 'Bergen', miles: 0.9 },
  { name: 'Hasbrouck Heights', state: 'NJ', county: 'Bergen', miles: 1.1 },
  { name: 'South Hackensack', state: 'NJ', county: 'Bergen', miles: 1.2 },
  { name: 'Hackensack', state: 'NJ', county: 'Bergen', miles: 1.3 },
  { name: 'Teterboro', state: 'NJ', county: 'Bergen', miles: 1.6 },
  { name: 'Maywood', state: 'NJ', county: 'Bergen', miles: 1.8 },
  { name: 'Bogota', state: 'NJ', county: 'Bergen', miles: 1.9 },
  { name: 'Rochelle Park', state: 'NJ', county: 'Bergen', miles: 2.1 },
  { name: 'Wood-Ridge', state: 'NJ', county: 'Bergen', miles: 2.2 },
  { name: 'Garfield', state: 'NJ', county: 'Bergen', miles: 2.3 },
  { name: 'Saddle Brook', state: 'NJ', county: 'Bergen', miles: 2.3 },
  { name: 'Moonachie', state: 'NJ', county: 'Bergen', miles: 2.5 },
  { name: 'Wallington', state: 'NJ', county: 'Bergen', miles: 2.7 },
  { name: 'Little Ferry', state: 'NJ', county: 'Bergen', miles: 2.8 },
  { name: 'Ridgefield Park', state: 'NJ', county: 'Bergen', miles: 2.8 },
  { name: 'Teaneck', state: 'NJ', county: 'Bergen', miles: 2.9 },
  { name: 'Elmwood Park', state: 'NJ', county: 'Bergen', miles: 3.4 },
  { name: 'Carlstadt', state: 'NJ', county: 'Bergen', miles: 3.5 },
  { name: 'Passaic', state: 'NJ', county: 'Passaic', miles: 3.6 },
  { name: 'River Edge', state: 'NJ', county: 'Bergen', miles: 3.7 },
  { name: 'Leonia', state: 'NJ', county: 'Bergen', miles: 4.1 },
  { name: 'Palisades Park', state: 'NJ', county: 'Bergen', miles: 4.1 },
  { name: 'Ridgefield', state: 'NJ', county: 'Bergen', miles: 4.1 },
  { name: 'East Rutherford', state: 'NJ', county: 'Bergen', miles: 4.3 },
  { name: 'Rutherford', state: 'NJ', county: 'Bergen', miles: 4.5 },
  { name: 'New Milford', state: 'NJ', county: 'Bergen', miles: 4.6 },
  { name: 'Bergenfield', state: 'NJ', county: 'Bergen', miles: 4.7 },
  { name: 'Paramus', state: 'NJ', county: 'Bergen', miles: 4.8 },
  { name: 'Englewood', state: 'NJ', county: 'Bergen', miles: 4.9 },
  { name: 'Fair Lawn', state: 'NJ', county: 'Bergen', miles: 4.9 },
  { name: 'Clifton', state: 'NJ', county: 'Passaic', miles: 5.1 },
  { name: 'Fairview', state: 'NJ', county: 'Bergen', miles: 5.1 },
  { name: 'Fort Lee', state: 'NJ', county: 'Bergen', miles: 5.3 },
  { name: 'Cliffside Park', state: 'NJ', county: 'Bergen', miles: 5.6 },
  { name: 'Oradell', state: 'NJ', county: 'Bergen', miles: 5.7 },
  { name: 'Paterson', state: 'NJ', county: 'Passaic', miles: 5.7 },
  { name: 'Dumont', state: 'NJ', county: 'Bergen', miles: 6.0 },
  { name: 'Edgewater', state: 'NJ', county: 'Bergen', miles: 6.0 },
  { name: 'Lyndhurst', state: 'NJ', county: 'Bergen', miles: 6.1 },
  { name: 'North Bergen', state: 'NJ', county: 'Hudson', miles: 6.2 },
  { name: 'Nutley', state: 'NJ', county: 'Essex', miles: 6.2 },
  { name: 'Englewood Cliffs', state: 'NJ', county: 'Bergen', miles: 6.3 },
  { name: 'Glen Rock', state: 'NJ', county: 'Bergen', miles: 6.5 },
  { name: 'Guttenberg', state: 'NJ', county: 'Hudson', miles: 6.6 },
  { name: 'Secaucus', state: 'NJ', county: 'Hudson', miles: 6.6 },
  { name: 'Tenafly', state: 'NJ', county: 'Bergen', miles: 6.6 },
  { name: 'Woodland Park', state: 'NJ', county: 'Passaic', miles: 6.8 },
  { name: 'Haworth', state: 'NJ', county: 'Bergen', miles: 6.9 },
  { name: 'West New York', state: 'NJ', county: 'Hudson', miles: 7.0 },
  { name: 'Cresskill', state: 'NJ', county: 'Bergen', miles: 7.1 },
  { name: 'Emerson', state: 'NJ', county: 'Bergen', miles: 7.1 },
  { name: 'North Arlington', state: 'NJ', county: 'Bergen', miles: 7.1 },
  { name: 'Prospect Park', state: 'NJ', county: 'Passaic', miles: 7.2 },
  { name: 'Hawthorne', state: 'NJ', county: 'Passaic', miles: 7.3 },
  { name: 'Ridgewood', state: 'NJ', county: 'Bergen', miles: 7.6 },
  { name: 'Belleville', state: 'NJ', county: 'Essex', miles: 7.7 },
  { name: 'Haledon', state: 'NJ', county: 'Passaic', miles: 7.7 },
  { name: 'Washington Township', state: 'NJ', county: 'Bergen', miles: 7.7 },
  { name: 'Demarest', state: 'NJ', county: 'Bergen', miles: 7.8 },
  { name: 'Union City', state: 'NJ', county: 'Hudson', miles: 7.8 },
  { name: 'Bloomfield', state: 'NJ', county: 'Essex', miles: 7.9 },
  { name: 'Little Falls', state: 'NJ', county: 'Passaic', miles: 7.9 },
  { name: 'Westwood', state: 'NJ', county: 'Bergen', miles: 7.9 },
  { name: 'Weehawken', state: 'NJ', county: 'Hudson', miles: 8.0 },
  { name: 'Totowa', state: 'NJ', county: 'Passaic', miles: 8.3 },
  { name: 'Montclair', state: 'NJ', county: 'Essex', miles: 8.4 },
  { name: 'Closter', state: 'NJ', county: 'Bergen', miles: 8.6 },
  { name: 'Ho-Ho-Kus', state: 'NJ', county: 'Bergen', miles: 8.6 },
  { name: 'Manhattan', state: 'NY', county: 'New York', miles: 8.6 },
  { name: 'North Haledon', state: 'NJ', county: 'Passaic', miles: 8.6 },
  { name: 'Cedar Grove', state: 'NJ', county: 'Essex', miles: 8.7 },
  { name: 'Glen Ridge', state: 'NJ', county: 'Essex', miles: 8.8 },
  { name: 'Hillsdale', state: 'NJ', county: 'Bergen', miles: 9.0 },
  { name: 'Harrington Park', state: 'NJ', county: 'Bergen', miles: 9.1 },
  { name: 'Midland Park', state: 'NJ', county: 'Bergen', miles: 9.1 },
  { name: 'Kearny', state: 'NJ', county: 'Hudson', miles: 9.2 },
  { name: 'Hoboken', state: 'NJ', county: 'Hudson', miles: 9.3 },
  { name: 'Verona', state: 'NJ', county: 'Essex', miles: 9.8 },
  { name: 'Norwood', state: 'NJ', county: 'Bergen', miles: 9.9 },
  { name: 'River Vale', state: 'NJ', county: 'Bergen', miles: 9.9 },
  { name: 'Waldwick', state: 'NJ', county: 'Bergen', miles: 9.9 },
  { name: 'Alpine', state: 'NJ', county: 'Bergen', miles: 10.0 },
  { name: 'Wyckoff', state: 'NJ', county: 'Bergen', miles: 10.0 },
]

/**
 * Named at the owner's request although their centres lie beyond the radius.
 * Measured the same way as everything above and kept apart from it, so the
 * "within 10 miles" sentence stays true wherever it is printed.
 */
export const BEYOND_RADIUS: ServiceAreaTown[] = [
  { name: 'Saddle River', state: 'NJ', county: 'Bergen', miles: 10.2 },
  { name: 'Franklin Lakes', state: 'NJ', county: 'Bergen', miles: 11.6 },
  { name: 'Upper Saddle River', state: 'NJ', county: 'Bergen', miles: 13.0 },
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
