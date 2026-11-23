import { WORK_GALLERY, type WorkGalleryItem } from './data'
import { PPF } from './pricing'
import { G_CLASS_WINTER } from './offers'

/**
 * One page per make the studio has real install photos of: /ppf/ferrari,
 * /ppf/lamborghini, /ppf/porsche, /ppf/g-class.
 *
 * Owners of these cars search by the car — "ferrari ppf nj", "gt3 rs paint
 * protection film" — not by town, and those results carry almost no map pack,
 * so an organic #1 there is a click, unlike "ppf near me". Every car named in
 * this file must be in WORK_GALLERY: a make page is the photos of that make
 * from this bay, and the build fails if a make has none.
 */

export type MakeSlug = 'ferrari' | 'lamborghini' | 'porsche' | 'g-class'

export interface MakePage {
  slug: MakeSlug
  make: string
  /** "G-Classes" — when the plural is not make + "s". */
  plural?: string
  /** Photos of this make when there are more than the home gallery should carry. */
  photos?: WorkGalleryItem[]
  /** The models for the meta description, when the gallery names do not say it well. */
  models?: string
  /** A time-limited offer shown above the prices, with its landing page. */
  offer?: { text: string; href: string; endsOn: string }
  /** Second line of the H1, under "<make> Paint Protection Film in Hackensack, NJ". */
  headline: string
  subtitle: string
  /** What was done on this make here, naming only cars in WORK_GALLERY. */
  intro: string[]
  /** Which package fits this make, in the studio's words. */
  coverage: string
  videoIds?: string[]
  /** An outside page that says more about this make than the studio page should. */
  further?: { text: string; label: string; href: string }
}

export const MAKE_PAGES: MakePage[] = [
  {
    slug: 'ferrari',
    make: 'Ferrari',
    headline: 'F8 Tributo and SF90 Stradale, Full Body.',
    subtitle:
      'Paint protection film on Ferraris from our own bay at 361 NJ-17 — patterns cut before the film touches the car, edges wrapped where the panel allows, and a 10-year manufacturer warranty.',
    intro: [
      'The Ferraris on this page were done here: a blue F8 Tributo and two SF90 Stradales, one black and one silver, each in full-body film. The photos are from the studio, not from a film catalogue.',
      'HAUT, the film manufacturer this studio belongs to, developed HAUT Italia — a clear film with a lower-peel adhesive for Ferrari paint — over years of installing and removing film on Ferraris in this bay.',
    ],
    coverage:
      'Every Ferrari shown here is in Full Body Armor, which covers every painted panel, so there is no film edge across the middle of a panel where partial coverage would stop. Front End Protection and the Highway & Track Package are there for a Ferrari that is driven more than it is stored.',
    further: {
      text: 'The film itself, and how it is meant to come off:',
      label: 'HAUT Italia for Ferrari →',
      href: 'https://haut-usa.com/ferrari-paint-protection-film',
    },
  },
  {
    slug: 'lamborghini',
    make: 'Lamborghini',
    headline: 'Huracán Tecnica to Revuelto.',
    subtitle:
      'Paint protection film on Lamborghinis from our own bay at 361 NJ-17 — patterns cut before the film touches the car, edges wrapped where the panel allows, and a 10-year manufacturer warranty.',
    intro: [
      'Two Lamborghinis from this bay: a blue Huracán Tecnica in paint protection film with ceramic coating over it, and a lime green Revuelto in full-body film.',
      'The Huracán’s owner, Alex Perrera, recorded a video on why we cost more than other shops and why it was worth it. It is further down this page. His Range Rover was his second car with us.',
    ],
    coverage:
      'The Revuelto is in Full Body Armor. On a low, wide car like the Huracán, the Highway & Track Package adds the rocker panels and the rear wheel arches, which take the tire spray the front end never sees. Ceramic coating goes over the film, as on the Huracán, for the gloss and easier washing.',
    videoIds: ['alex-perrera-lamborghini'],
  },
  {
    slug: 'porsche',
    make: 'Porsche',
    headline: '911 GT3 RS, Every Painted Panel.',
    subtitle:
      'Paint protection film on Porsches from our own bay at 361 NJ-17 — patterns cut before the film touches the car, edges wrapped where the panel allows, and a 10-year manufacturer warranty.',
    intro: [
      'The green 911 GT3 RS on this page is in full-body film, done in this studio.',
      'A 911 that sees the Parkway or a track day takes its chips low and along the sides, not only on the nose — which is what decides the coverage below.',
    ],
    coverage:
      'For a 911 that is driven hard, the Highway & Track Package adds the rocker panels, the A-pillars, the roof leading edge and the rear wheel arches to the front end. Full Body Armor covers everything, which is what the GT3 RS has. Prices below are the Exotic class in our calculator. A Cayenne or Macan is priced as a Regular SUV.',
  },
  {
    slug: 'g-class',
    make: 'Mercedes G-Class',
    plural: 'G-Classes',
    photos: [
      {
        id: 'brabus-g-class-in-bay',
        image: '/assets/work/brabus-g-class-in-bay.webp',
        imageAlt: 'Satin grey Brabus G-Class in the bay at HAUT Flagship Studio, next to the Graphtec plotter that cuts its film',
        vehicle: 'Brabus G-Class',
        service: 'PPF',
      },
      {
        id: 'brabus-g-class-three-quarter',
        image: '/assets/work/brabus-g-class-front-three-quarter.webp',
        imageAlt: 'Brabus G-Class outside HAUT Flagship Studio in Hackensack after its paint protection film install',
        vehicle: 'Brabus G-Class',
        service: 'PPF',
      },
      {
        id: 'brabus-g-class-side',
        image: '/assets/work/brabus-g-class-side-profile.webp',
        imageAlt: 'Side profile of the Brabus G-Class — the flat doors and rockers that take the spray from the front tires',
        vehicle: 'Brabus G-Class — the flat sides',
        service: 'PPF',
      },
      {
        id: 'brabus-g-class-hood',
        image: '/assets/work/brabus-g-class-hood-front.webp',
        imageAlt: 'Brabus G-Class hood, bumper and fenders in paint protection film, in the studio bay',
        vehicle: 'Brabus G-Class — hood and bumper',
        service: 'PPF',
      },
      {
        id: 'brabus-g-class-door-gap',
        image: '/assets/work/brabus-g-class-door-gap-edge.webp',
        imageAlt: 'Brabus G-Class door gap close-up — the film follows the body line and wraps into the gap',
        vehicle: 'Brabus G-Class — film into the door gap',
        service: 'PPF',
      },
      {
        id: 'brabus-g-class-hinge',
        image: '/assets/work/brabus-g-class-wrapped-door-edge.webp',
        imageAlt: 'Brabus G-Class door gap at the hinge — paint protection film wrapped around both panel edges',
        vehicle: 'Brabus G-Class — edges at the hinge',
        service: 'PPF',
      },
    ],
    models: 'G63 and Brabus',
    headline: 'G63 and Brabus, Every Painted Panel.',
    subtitle:
      'Paint protection film on the G-Class from our own bay at 361 NJ-17 — patterns cut before the film touches the car, edges wrapped where the panel allows, and a 10-year manufacturer warranty.',
    intro: [
      'A Brabus G-Class and a factory-matte G63, both done in this studio. The photos are from the studio, not from a film catalogue.',
      'Flat panels show everything: a knife line, a lifted edge, a dirt line along the film. That is why every G-Class panel is cut on the plotter before it reaches the car, and the film follows the body lines into the door gaps.',
      "Factory matte paint can't be polished. On a matte G-Class, film is the only protection the paint has.",
    ],
    coverage:
      'On a G-Class the sides take as much as the nose: the flat doors and rockers catch everything the front tires throw. Full Body Armor covers every painted panel, so no film edge stops in the middle of a door.',
    offer: {
      text: `Winter price: Full Body Armor on a G-Class for $${G_CLASS_WINTER.price.toLocaleString('en-US')} instead of $${G_CLASS_WINTER.regular.toLocaleString('en-US')} — through ${G_CLASS_WINTER.endsLabel}.`,
      href: G_CLASS_WINTER.path,
      endsOn: G_CLASS_WINTER.endsOn,
    },
  },
]

/** The install photos of one make, in gallery order. */
export function makePhotos(page: Pick<MakePage, 'make' | 'photos'>): WorkGalleryItem[] {
  const photos = page.photos ?? WORK_GALLERY.filter((item) => item.vehicle.startsWith(page.make + ' '))
  if (photos.length === 0) throw new Error(`No WORK_GALLERY photos for ${page.make} — a make page needs its own cars`)
  return photos
}

/** Package ids on the site → the calculator's PPF options, for Exotic & Huge SUV prices. */
export const EXOTIC_PPF_PRICE: Record<string, number> = {
  'front-end': PPF.frontEnd.prices.exotic,
  highway: PPF.highway.prices.exotic,
  'full-vehicle': PPF.fullBody.prices.exotic,
}
