import { CHEAPEST_PPF_PRICE, CHEAPEST_CERAMIC_PRICE, CHEAPEST_TINT_PRICE } from './pricing'

export interface PackageItem {
  id: string
  name: string
  tagline: string
  price: number
  description: string
  inclusions: string[]
  image: string
  imageAlt: string
  featured: boolean
}

export interface FeatureRow {
  label: string
  included: boolean[]
}

export interface BlogArticle {
  slug: string
  category: string
  title: string
  excerpt: string
  metaDescription: string
  readTime: string
  date: string
  image: string
  imageAlt: string
  content: string[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface WorkGalleryItem {
  id: string
  image: string
  imageAlt: string
  vehicle: string
  service: 'PPF' | 'Ceramic Coating' | 'Window Tint' | 'PPF + Ceramic'
}

export interface VideoTestimonialItem {
  id: string
  video: string
  poster: string
  posterAlt: string
  name: string
  vehicle: string
  service: 'PPF' | 'Ceramic Coating' | 'Window Tint' | 'PPF + Ceramic'
  hook: string
  orientation: 'portrait' | 'landscape'
}

export const STUDIO = {
  name: 'HAUT Flagship Studio',
  phone: '+1 (201) 201-0170',
  phoneHref: 'tel:+12012010170',
  address: '361 NJ-17, Hackensack, NJ 07601',
  mapsHref: 'https://maps.app.goo.gl/XTmE5NDHpzPsf16Y7',
  hours: 'Mon–Fri 9AM–6PM · Sat 9AM–4PM',
  // Exact coordinates from the verified Google Business Profile listing (resolved
  // from mapsHref) — precise pin location, independent of free-embed geocoding.
  lat: 40.8773629,
  lng: -74.0652157,
}

export const PPF_PACKAGES: PackageItem[] = [
  {
    id: 'front-end',
    name: 'Front End Protection',
    tagline: 'Primary Impact Zone Defense',
    price: 2399,
    description:
      "Self-healing optical film applied to the primary impact zone — full bumper, full hood, full fenders, mirrors, and headlights. HAUT Precision Scan patterns are cut to your vehicle's exact contours with zero-blade contact. Best for daily drivers protecting against 90% of highway stone chips.",
    inclusions: [
      'Full Front Bumper',
      'Full Hood Panel',
      'Full Fenders (pair)',
      'Side Mirrors',
      'Headlights & Fog Lights',
      'Self-Healing Film + 10-Year Warranty',
    ],
    image: '/assets/ffront-end-package.webp',
    imageAlt: 'Front End Protection PPF coverage — bumper, hood, fenders',
    featured: false,
  },
  {
    id: 'highway',
    name: 'Highway & Track Package',
    tagline: 'Full Perimeter + Track Defense',
    price: 3199,
    description:
      'Everything in Front End Protection, plus rocker panels, A-pillars, full roof leading edge, and rear wheel splash arches for the debris and tire spray that catch up with a car at speed. Same self-healing optical film, same zero-blade HAUT Precision Scan cut. Best for sports cars, lowered vehicles, and frequent freeway commuters.',
    inclusions: [
      'Everything in Front End Protection',
      'Rocker Panels (pair)',
      'A-Pillars',
      'Full Roof Leading Edge',
      'Rear Wheel Splash Arches',
      'Self-Healing Film + 10-Year Warranty',
    ],
    image: '/assets/highway-package.webp',
    imageAlt: 'Highway & Track Package PPF coverage — full perimeter package',
    featured: true,
  },
  {
    id: 'full-vehicle',
    name: 'Full Body Armor',
    tagline: '100% Exterior Coverage',
    price: 6499,
    description:
      'Complete exterior coverage of every painted panel, carbon fiber component, door jamb, and sill — cut panel-for-panel from HAUT Precision Scan patterns with zero on-car cutting. Best for exotics, supercars, new vehicle deliveries, and matte/satin conversions.',
    inclusions: [
      '100% Painted Panel Coverage',
      'Carbon Fiber Components',
      'Door Jambs & Sills',
      'All Body Panels + Roof',
      'Self-Healing Film + 10-Year Warranty',
    ],
    image: '/assets/full-package.webp',
    imageAlt: 'Full Body Armor PPF wrap — complete body protection',
    featured: false,
  },
]

export const CERAMIC_PACKAGE: PackageItem = {
  id: 'ceramic',
  name: 'HAUT Ceramic',
  tagline: 'UV Fade & Resale Value Defense',
  price: 999,
  description:
    'HAUT Ceramic is a dual-layer 9H sealant that bonds directly to your clear coat or PPF, blocking the UV exposure that fades paint and the road grime that dulls resale value. One application, years of hydrophobic gloss — no more wax appointments.',
  inclusions: [
    'Dual-Layer 9H Ceramic Shell',
    'Hydrophobic Nano Coating',
    'UV Inhibitor — Fights Fade',
    'Full-Vehicle Application',
    'Showroom Gloss Enhancement',
  ],
  image: '/assets/placeholders/ceramic-coating.svg',
  imageAlt: 'Ceramic coating application — hydrophobic nano sealant',
  featured: false,
}

export const WINDOW_TINT_PACKAGES: PackageItem[] = [
  {
    id: 'tint-front',
    name: 'Front Windows',
    tagline: 'Daily Heat & UV Defense',
    price: 199,
    description:
      'Ceramic IR film on the front driver and passenger windows — the two panels that take the most direct UV exposure and cabin heat on every drive. HAUT Precision Scan-cut for a factory-clean edge with zero bubbling.',
    inclusions: [
      'Front Driver Window',
      'Front Passenger Window',
      'Ceramic IR Film — Blocks Heat & UV',
      'HAUT Precision Scan Cut Pattern',
    ],
    image: '/assets/placeholders/tint-front-window.svg',
    imageAlt: 'Front window ceramic tint coverage',
    featured: false,
  },
  {
    id: 'tint-windshield',
    name: 'Windshield Tint',
    tagline: 'Full Windshield Heat Defense',
    price: 299,
    description:
      "Full-coverage ceramic IR film across your entire windshield — a light, legal shade that cuts heat and glare without darkening your view, the front glass most tint packages leave exposed. HAUT Precision Scan-cut to your windshield's curve for a factory-clean edge with zero bubbling.",
    inclusions: [
      'Full Windshield Coverage',
      'Ceramic IR Film — Blocks Heat & UV',
      'HAUT Precision Scan Cut Pattern',
      'No-Bubble Adhesive',
    ],
    image: '/assets/placeholders/tint-windshield.svg',
    imageAlt: 'Full windshield ceramic IR tint',
    featured: false,
  },
  {
    id: 'tint-full',
    name: 'Full Vehicle Tint',
    tagline: 'Full Cabin Heat & UV Defense',
    price: 799,
    description:
      "Ceramic IR film across every side and rear window, cut to each window's exact profile. Blocks the infrared heat and UV radiation that fade interior trim and crack dashboards — without the signal interference of metallic film.",
    inclusions: [
      'All Side Windows',
      'Rear Window',
      'Ceramic IR Film — Blocks Heat & UV',
      'HAUT Precision Scan Cut Pattern',
      'No-Bubble Adhesive',
    ],
    image: '/assets/placeholders/tint-full-vehicle.svg',
    imageAlt: 'Full vehicle ceramic window tint coverage',
    featured: true,
  },
]

// Completed vehicles gallery. Add real install photos to public/assets/work/
// and push an entry per car — the gallery section hides itself while this is empty.
export const WORK_GALLERY: WorkGalleryItem[] = [
  {
    id: 'ferrari-f8-blue',
    image: '/assets/work/Ferrari-F8-full-ppf.webp',
    imageAlt: 'Blue Ferrari F8 Tributo — full body paint protection film at HAUT Flagship Studio',
    vehicle: 'Ferrari F8 Tributo',
    service: 'PPF',
  },
  {
    id: 'ferrari-sf90-black',
    image: '/assets/work/Ferrari-SF90-full-ppf-black.webp',
    imageAlt: 'Black Ferrari SF90 Stradale — full body paint protection film at HAUT Flagship Studio',
    vehicle: 'Ferrari SF90 Stradale',
    service: 'PPF',
  },
  {
    id: 'ferrari-sf90-silver',
    image: '/assets/work/Ferrari-SF90-full-ppf.webp',
    imageAlt: 'Silver Ferrari SF90 Stradale — full body paint protection film at HAUT Flagship Studio',
    vehicle: 'Ferrari SF90 Stradale',
    service: 'PPF',
  },
  {
    id: 'lamborghini-huracan-tecnica',
    image: '/assets/work/Lamborghini-Huracan-Technika.webp',
    imageAlt: 'Blue Lamborghini Huracán Tecnica — paint protection film and ceramic coating at HAUT Flagship Studio',
    vehicle: 'Lamborghini Huracán Tecnica',
    service: 'PPF + Ceramic',
  },
  {
    id: 'lamborghini-revuelto',
    image: '/assets/work/Lamborghini-Rivuelto-full-ppf.webp',
    imageAlt: 'Lime green Lamborghini Revuelto — full body paint protection film at HAUT Flagship Studio',
    vehicle: 'Lamborghini Revuelto',
    service: 'PPF',
  },
  {
    id: 'porsche-gt3rs',
    image: '/assets/work/Porsche-GT3RS-full-ppf.webp',
    imageAlt: 'Green Porsche 911 GT3 RS — full body paint protection film at HAUT Flagship Studio',
    vehicle: 'Porsche 911 GT3 RS',
    service: 'PPF',
  },
]

export const VIDEO_TESTIMONIALS: VideoTestimonialItem[] = [
  {
    id: 'alex-perrera-lamborghini',
    video: '/assets/alex-perrera-lamborghini-huracan-review.mp4',
    poster: '/assets/alex-perrera-lamborghini-poster.webp',
    posterAlt: 'Alex Perrera video review of his Lamborghini Huracán Tecnica PPF install',
    name: 'Alex Perrera',
    vehicle: 'Lamborghini Huracán Tecnica',
    service: 'PPF',
    hook: 'His first car with HAUT — on why we cost more than other shops, and why it was worth it.',
    orientation: 'portrait',
  },
  {
    id: 'alex-perrera-range-rover',
    video: '/assets/alex-perrera-range-rover-review.mp4',
    poster: '/assets/alex-perrera-rangerover-poster.webp',
    posterAlt: 'Alex Perrera video review of his Range Rover PPF install at HAUT Flagship Studio',
    name: 'Alex Perrera',
    vehicle: 'Range Rover',
    service: 'PPF',
    hook: 'His second car with HAUT — a repeat client on why he came back and recommends us.',
    orientation: 'landscape',
  },
]

export const SERVICES_OVERVIEW = [
  {
    id: 'ppf',
    name: 'Paint Protection Film',
    tagline: 'High-performance physical shield designed to absorb everyday road impact, helping defend your factory paint against rock chips, swirl marks, and road wear.',
    priceFrom: CHEAPEST_PPF_PRICE,
    href: '/ppf',
    image: '/assets/service-ppf.webp',
    imageAlt: 'Paint protection film service overview',
  },
  {
    id: 'ceramic',
    name: 'Ceramic Coating',
    tagline: 'Ultra-gloss hydrophobic barrier that repels dirt and water, making routine washes effortless while helping preserve your paint’s depth and UV resistance.',
    priceFrom: CHEAPEST_CERAMIC_PRICE,
    href: '/ceramic',
    image: '/assets/service-ceramic-coating.webp',
    imageAlt: 'Ceramic coating service overview',
  },
  {
    id: 'window-tint',
    name: 'Window Tinting',
    tagline: 'Advanced ceramic tint engineered to reduce cabin heat and block harmful UV rays—enhancing everyday driving comfort while protecting your interior leather and trim.',
    priceFrom: CHEAPEST_TINT_PRICE,
    href: '/window-tint',
    image: '/assets/service-window-tinting.webp',
    imageAlt: 'Window tinting service overview',
  },
]

export const TINT_FEATURE_MATRIX: FeatureRow[] = [
  { label: 'Front Driver & Passenger Windows', included: [true, false, true] },
  { label: 'All Rear Side Windows', included: [false, false, true] },
  { label: 'Rear Windshield', included: [false, false, true] },
  { label: 'Ceramic IR Film', included: [true, true, true] },
  { label: 'No-Bubble Adhesive', included: [false, true, true] },
  { label: 'Full Windshield Coverage', included: [false, true, false] },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How long does Paint Protection Film last?',
    answer:
      'High-quality PPF with a self-healing topcoat typically lasts 8–12 years when properly maintained. HAUT installs precision-cut film that covers every exposed panel edge.',
  },
  {
    question: 'Does PPF eliminate the need for waxing?',
    answer:
      'Yes. The hydrophobic topcoat on modern PPF repels water, dirt, and road grime — making traditional wax completely unnecessary. A simple rinse restores gloss.',
  },
  {
    question: 'What is the difference between PPF and ceramic coating?',
    answer:
      'PPF is a physical urethane film that absorbs rock chips and road debris while self-healing minor scratches. Ceramic coating is a nano-chemical sealant applied on top of clear coat or PPF that adds hydrophobic gloss and UV protection. Both can be combined for maximum coverage.',
  },
  {
    question: 'What does the 10-year warranty actually cover?',
    answer:
      'The manufacturer warranty covers yellowing, cracking, and adhesive failure of the self-healing film for 10 years, and is honored nationwide — not just at the installing studio. It does not cover damage from improper washing (automatic brush washes) or physical cuts from an accident.',
  },
  {
    question: 'How far in advance do I need to book?',
    answer:
      'Most services, including Front End and Highway PPF, can be booked same-week. Full Vehicle PPF and combined packages that require multiple days in our climate-controlled bay may need 1–2 weeks of lead time depending on the season.',
  },
  {
    question: 'Where is HAUT Flagship Studio located?',
    answer:
      'HAUT Flagship Studio is located at 361 NJ-17, Hackensack, NJ 07601. We serve the greater Bergen County area.',
  },
]

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'winter-road-salt-paint-protection-nj',
    category: 'Maintenance',
    title: 'Winter Driving in New Jersey: Protecting Your Paint From Road Salt',
    excerpt:
      'Road salt on the Garden State Parkway and Route 17 does real, measurable damage to exposed clear coat over a single winter. Here is what actually protects against it — and what does not.',
    metaDescription:
      'Road salt accelerates paint corrosion over a New Jersey winter. Here is how PPF and ceramic coating actually reduce the damage, and what washing habits matter most.',
    readTime: '4 min read',
    date: 'August 2026',
    image: '/assets/placeholders/blog-winter-road-salt.svg',
    imageAlt: 'Winter road salt paint protection guide for New Jersey drivers',
    content: [
      'New Jersey winters mean brine trucks on the Garden State Parkway and Route 17 before every storm, and that salt does not wash off on its own once the roads are clear. It sits in wheel wells, rocker panels, and anywhere a rock chip has already exposed bare metal — and it is chemically corrosive the entire time it is there.',
      'The damage rarely starts on a flawless painted surface. It starts at existing chips and scratches, where salt brine reaches bare metal or primer instead of sealed clear coat. That is why the panels that take the most highway debris — front bumper, hood, rocker panels — are also the panels most exposed to accelerated corrosion once winter driving starts.',
      'Paint protection film\'s job here is the same as it is against gravel: it is a sacrificial physical layer. A rock chip that would have exposed bare metal instead lands on the film, which means the salt has nothing to reach underneath it. This is part of why the Highway & Track package specifically extends coverage to rocker panels and wheel arches — the areas that see the most direct salt spray at speed.',
      'Ceramic coating does not stop physical damage, but it changes how salt behaves on the surface. A hydrophobic surface sheds brine and slush before it dries and cakes on, instead of letting it sit and evaporate in place — which is usually when residue and water spotting get left behind.',
      'The single highest-impact habit during a Jersey winter is rinsing the undercarriage and rocker panels regularly, not just the visible body — salt collects where it is hardest to see. A touchless wash or hand wash with pH-neutral soap is preferable to an automatic brush wash, which is true year-round but matters even more when the car is picking up road grit and salt at the same time.',
      'Front End or Highway PPF paired with ceramic coating is the combination most Bergen County clients run into winter for exactly this reason — physical protection where debris and salt spray actually hit, plus a surface that does not let contamination sit and dwell.',
    ],
  },
  {
    slug: 'new-jersey-window-tint-laws-guide',
    category: 'Local Guide',
    title: 'New Jersey Window Tint Laws: What\'s Actually Legal',
    excerpt:
      'Tint darkness rules vary by state, and New Jersey is stricter than most on front glass. Here is what VLT percentage is actually legal on each window before you book an install.',
    metaDescription:
      'A breakdown of New Jersey\'s window tint laws — what VLT percentage is legal on front windows, rear windows, and the windshield, and what gets flagged at inspection.',
    readTime: '4 min read',
    date: 'June 2026',
    image: '/assets/placeholders/blog-nj-tint-law.svg',
    imageAlt: 'New Jersey window tint law and VLT guide',
    content: [
      'Window tint darkness is measured in VLT — visible light transmission — the percentage of light that passes through the glass. A higher VLT number means a lighter, more transparent tint; a lower number means darker. New Jersey\'s rules are more conservative than many drivers expect, and they differ by window position.',
      'Front side windows and the windshield both have to let in more than 70% of light under New Jersey law. In practice, that limits front glass to the lightest ceramic IR films — the kind built to cut heat and UV without darkening the view, not the deeper shades most people picture when they think of "window tint."',
      'Rear side windows and the rear windshield are not subject to that same restriction — New Jersey allows any darkness back there, down to the deepest 5% VLT films. That is why a lot of NJ vehicles run a noticeably darker rear cabin than front.',
      'Reflective or mirrored tint is prohibited statewide, regardless of which window it is on. This is a common point of confusion for drivers coming from states with different rules, or comparing notes with out-of-state shops.',
      'Illegal tint is something New Jersey\'s vehicle inspection can flag, and it is also something an officer can cite during a traffic stop independent of inspection. The safest approach is to confirm the legal VLT for each window position before the film goes on, not after — a shop working from New Jersey\'s actual limits will spec the front windows and windshield differently from the rear glass by default.',
      'This is also why a full-vehicle tint quote is never really "pick one darkness for everything." At HAUT, every job accounts for New Jersey\'s per-window limits from the start, so the front glass stays street-legal while the rear cabin can go as dark as the client wants.',
    ],
  },
  {
    slug: 'ceramic-coating-lifespan-maintenance-guide',
    category: 'Maintenance',
    title: 'How Long Does Ceramic Coating Actually Last? A Realistic Maintenance Guide',
    excerpt:
      'Ceramic coating doesn\'t fail overnight — its hydrophobic performance fades gradually with UV exposure, contamination, and wash habits. Here is what actually determines whether a coating holds up for two years or five.',
    metaDescription:
      'Ceramic coating lifespan depends on UV exposure, wash habits, and maintenance — not a fixed expiration date. Here is what actually determines how long the hydrophobic layer holds up.',
    readTime: '5 min read',
    date: 'April 2026',
    image: '/assets/placeholders/blog-ceramic-lifespan.svg',
    imageAlt: 'Ceramic coating lifespan and maintenance guide',
    content: [
      'Ceramic coating is often sold with a single headline number — two years, five years, "lifetime" — as if the hydrophobic shell simply switches off on a set date. It does not work that way. The 9H-hard layer itself is durable, but the surface-level hydrophobic performance that makes water bead and slide off degrades gradually, and how fast depends almost entirely on what happens to the car after installation.',
      'What actually degrades first is the outermost molecular layer that creates the water-repelling effect — not the hardness or the UV protection underneath it. A coating can still be doing its job of blocking oxidation and resisting light scratches long after the water no longer beads as dramatically as it did in month one.',
      'UV exposure is the single biggest factor. A vehicle that spends most of its time outdoors in direct sun will see the hydrophobic layer break down faster than a garaged car, the same way a roof coating or window film degrades faster under constant sunlight. Contamination matters just as much — bird droppings, tree sap, and industrial fallout are acidic or abrasive, and the longer they sit on a coated surface, the more they etch into the layer meant to protect it.',
      'Wash habits do more damage to a ceramic coating\'s lifespan than almost anything else. Automatic brush washes use the same stiff bristles that dull PPF edges, and on a ceramic-coated surface they strip the hydrophobic layer in a fraction of the time a hand wash or touchless wash would take. A pH-neutral soap and a two-bucket hand wash — or a quality touchless wash — is what actually protects the investment.',
      'Most professional dual-layer ceramic systems, including HAUT Ceramic, are formulated for multi-year performance rather than a single-season shine. Real-world results still depend heavily on parking conditions and wash routine — a garaged daily driver washed by hand will hold hydrophobic performance meaningfully longer than a car parked outdoors and run through an automatic wash weekly.',
      'A coating losing some water-beading intensity after a year or two is not a failure — it is the expected curve, and a maintenance detail or topper application can refresh the surface without a full correction and reapplication. Combined with paint protection film on the panels that take physical impact, ceramic coating is one half of a system, not a standalone forever-shield — the two protect against different things and neither replaces the other.',
    ],
  },
  {
    slug: 'ppf-vs-ceramic-coating-hackensack',
    category: 'Technical Guide',
    title: 'PPF vs. Ceramic Coating: When to Use Which (And When to Use Both)',
    excerpt:
      'Paint Protection Film and ceramic coating solve different problems. PPF is a physical barrier — ceramic is a chemical sealant. Understanding the distinction helps you decide what your vehicle actually needs.',
    metaDescription:
      'Paint Protection Film and ceramic coating solve different problems. PPF is a physical barrier — ceramic is a chemical sealant. Understanding the distinction helps you decide what your vehicle actually needs.',
    readTime: '5 min read',
    date: 'February 2026',
    image: '/assets/placeholders/blog-ppf-vs-ceramic.svg',
    imageAlt: 'PPF vs ceramic coating comparison diagram',
    content: [
      'Paint Protection Film (PPF) and ceramic coating are routinely marketed as competing products. They are not. They operate at different physical layers and solve different problems.',
      'PPF is a urethane film — a physical substrate bonded to your painted surface. It absorbs kinetic energy from rock chips, road debris, bug acid, and minor abrasion. The self-healing topcoat in modern PPF reforms at temperatures reachable by direct sunlight, erasing light swirl marks without any manual intervention.',
      'Ceramic coating is a nano-chemical sealant applied as a liquid that cures into a glass-like layer directly on your clear coat (or on top of PPF). It does not absorb impact. What it does: creates a hydrophobic surface, adds gloss depth, and blocks UV from degrading the material beneath.',
      'The key question: what are you protecting against? If your vehicle sees highway driving, rock chips are your primary threat. PPF is the correct answer. Ceramic coating applied without PPF does not stop a rock chip.',
      'If you drive mainly city routes, park indoors, and care primarily about water behavior and ease of cleaning — ceramic coating alone may be sufficient. The hydrophobic layer is real and significant: water contact angles above 110° mean most grime rinses off with plain water.',
      'The most comprehensive approach: PPF on high-impact zones (front end, rocker panels), then ceramic coating applied on top of the PPF and across the full vehicle. You get physical impact protection where it matters and hydrophobic performance everywhere.',
      'At HAUT, both services are available individually or as a combined package. The Highway PPF + Ceramic combination is the most requested for daily drivers that see significant NJ Turnpike and Garden State Parkway mileage.',
    ],
  },
  {
    slug: 'how-long-does-ppf-last',
    category: 'Maintenance',
    title: 'How Long Does Paint Protection Film Last? Realistic Timelines by Usage',
    excerpt:
      'Most PPF manufacturers quote 10 years. The real answer depends on UV exposure, washing frequency, and whether the topcoat is self-healing. Here is what to expect based on driving patterns.',
    metaDescription:
      'Most PPF manufacturers quote 10 years. The real answer depends on UV exposure, washing frequency, and whether the topcoat is self-healing.',
    readTime: '4 min read',
    date: 'December 2025',
    image: '/assets/placeholders/blog-ppf-lifespan.svg',
    imageAlt: 'PPF lifespan guide — how long does film last',
    content: [
      'Every PPF manufacturer quotes a 10-year warranty. That number is accurate — under controlled conditions. Real-world lifespan varies significantly based on UV exposure, washing habits, and installation quality.',
      'UV exposure is the primary degradation factor. PPF installed on vehicles parked outdoors in direct sun will yellow and lose elasticity faster than film on a garaged vehicle. Modern film includes integrated UV inhibitors rated for ASTM G154 accelerated weathering tests, but prolonged continuous exposure still shortens effective life.',
      'Washing frequency matters. Automatic car washes with rotating brushes are the fastest way to destroy PPF. The mechanical friction abrades the self-healing topcoat, eventually removing it entirely. Touchless washes or hand washes with proper pH-neutral soap extend film life significantly.',
      'The self-healing topcoat is a consumable layer. Over years of use, its ability to reflow diminishes. By year 7–8, the topcoat may no longer fully erase light scratches at ambient temperatures — though the UV and chip protection beneath remains functional.',
      'For daily highway drivers in New Jersey, a realistic expectation on front-end PPF is 6–8 years of peak performance, with physical protection continuing beyond that. Full vehicle PPF on garaged cars regularly reaches the 10-year mark without visible degradation.',
      'Installation quality affects longevity. Film applied with visible bubbles, lifting edges, or improper heat-forming will fail earlier — not because of the film itself, but because moisture and contamination can enter through compromised seals.',
    ],
  },
  {
    slug: 'ppf-installation-hackensack-nj-guide',
    category: 'Local Guide',
    title: 'Getting PPF in Hackensack, NJ: What the Process Actually Looks Like',
    excerpt:
      'From first consultation to final delivery, a full vehicle PPF installation takes 3–5 days at HAUT. Here is a step-by-step walkthrough of the process, including paint decontamination, digital pattern cutting, and post-install care.',
    metaDescription:
      'From first consultation to final delivery, a full vehicle PPF installation takes 3–5 days at HAUT. Here is a step-by-step walkthrough.',
    readTime: '6 min read',
    date: 'October 2025',
    image: '/assets/placeholders/blog-hackensack-ppf.svg',
    imageAlt: 'PPF installation process at HAUT Flagship Studio Hackensack',
    content: [
      'Most clients arrive expecting a same-day job. PPF installation — done correctly — takes time. A full vehicle wrap at HAUT requires 3–5 business days depending on vehicle complexity and film selection.',
      'Day 1: Paint Inspection and Decontamination. Before any film is cut or applied, the vehicle goes through a full decontamination wash, clay bar treatment, and paint correction if needed. Applying PPF over contamination or swirl marks locks those defects under the film permanently.',
      'Day 1–2: Digital Pattern Generation. Every panel template is generated using vehicle-specific 3D scan data through HAUT Precision Scan technology. This eliminates on-car trimming — a practice that risks cutting through the clear coat. Patterns account for every recessed edge, antenna mount, and body line.',
      'Day 2–4: Film Application. Panels are applied in sections, starting with the most complex geometry (front bumper, hood leading edge). Each section is wet-applied using a slip solution, positioned precisely, then heat-formed around edges and into recesses. Heat guns and squeegees remove all moisture and air.',
      'Day 4–5: Cure and Quality Check. The film requires 24–48 hours to fully bond. During this window, the vehicle stays in a climate-controlled bay. After cure, every panel is inspected under LED lighting for lifting edges, contamination, or optical distortion.',
      'Day 5: Client Delivery and Care Briefing. Every client receives a written care guide: no car washes for 7 days, avoid high-pressure direct spraying on edges for 30 days, use pH-neutral wash soap. We walk through every panel and explain what to expect as the film settles.',
      'HAUT is located at 361 NJ-17 in Hackensack — accessible from Bergen County, Hudson County, and NYC metro.',
    ],
  },
]
