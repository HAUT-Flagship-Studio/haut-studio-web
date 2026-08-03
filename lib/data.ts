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
    name: 'Front End PPF',
    tagline: 'High-Impact Rock Chip Defense',
    price: 2399,
    description:
      "Self-healing optical TPU film applied to the panels that absorb the worst of highway debris — bumper, full hood, fenders, mirrors, and headlights. HAUT Precision Scan patterns are cut to your vehicle's exact contours with zero-blade contact, so rock chips and swirl marks stop at the film, not your paint.",
    inclusions: [
      'Full Front Bumper',
      'Full Hood Panel',
      'Front Fenders (pair)',
      'Side Mirrors',
      'Headlights & Fog Lights',
      'Self-Healing TPU + 10-Year Warranty',
    ],
    image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=Front+End+PPF',
    imageAlt: 'Front end PPF coverage diagram — bumper, hood, fenders',
    featured: false,
  },
  {
    id: 'highway',
    name: 'Highway PPF',
    tagline: 'Full Perimeter Chip Defense',
    price: 3199,
    description:
      'Everything in Front End, plus the rocker panels, A-pillars, and rear bumper impact zone that catch tire spray and trailing debris at highway speed. Same self-healing optical TPU, same zero-blade HAUT Precision Scan cut, extended to the full perimeter most daily drivers actually need.',
    inclusions: [
      'Everything in Front End',
      'Rocker Panels (pair)',
      'A-Pillars',
      'Rear Bumper Impact Area',
      'Door Edge Guards',
      'Self-Healing TPU + 10-Year Warranty',
    ],
    image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=Highway+PPF',
    imageAlt: 'Highway PPF coverage — full perimeter package',
    featured: true,
  },
  {
    id: 'full-vehicle',
    name: 'Full Vehicle PPF',
    tagline: 'Complete Body Chip & UV Defense',
    price: 6499,
    description:
      'Complete body encapsulation in self-healing optical TPU, cut panel-for-panel from HAUT Precision Scan patterns — every edge, every contour, zero on-car cutting. The standard for owners protecting resale value on exotic and luxury vehicles, applied in our climate-controlled studio. Includes free enclosed trailer transport to and from our studio.',
    inclusions: [
      '100% Body Coverage',
      'All Panels + Roof',
      'Door Jambs & Sills',
      'Trunk Lid Interior',
      'Free Enclosed Trailer Transport',
      'Self-Healing TPU + 10-Year Warranty',
    ],
    image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=Full+Vehicle+PPF',
    imageAlt: 'Full vehicle PPF wrap — complete body protection',
    featured: false,
  },
]

export const CERAMIC_PACKAGE: PackageItem = {
  id: 'ceramic',
  name: 'Ceramic Coating',
  tagline: 'UV Fade & Resale Value Defense',
  price: 999,
  description:
    'A dual-layer 9H ceramic sealant that bonds directly to your clear coat or PPF, blocking the UV exposure that fades paint and the road grime that dulls resale value. One application, years of hydrophobic gloss — no more wax appointments.',
  inclusions: [
    'Dual-Layer 9H Ceramic Shell',
    'Hydrophobic Nano Coating',
    'UV Inhibitor — Fights Fade',
    'Full-Vehicle Application',
    'Showroom Gloss Enhancement',
  ],
  image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=Ceramic+Coating',
  imageAlt: 'Ceramic coating application — hydrophobic nano sealant',
  featured: false,
}

export const WINDOW_TINT_PACKAGES: PackageItem[] = [
  {
    id: 'tint-front',
    name: 'Front Windows',
    tagline: 'Daily Heat & UV Defense',
    price: 150,
    description:
      'Ceramic IR film on the front driver and passenger windows — the two panels that take the most direct UV exposure and cabin heat on every drive. HAUT Precision Scan-cut for a factory-clean edge with zero bubbling.',
    inclusions: [
      'Front Driver Window',
      'Front Passenger Window',
      'Ceramic IR Film — Blocks Heat & UV',
      'HAUT Precision Scan Cut Pattern',
    ],
    image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=Front+Window+Tint',
    imageAlt: 'Front window ceramic tint coverage',
    featured: false,
  },
  {
    id: 'tint-full',
    name: 'Full Vehicle Tint',
    tagline: 'Full Cabin Heat & UV Defense',
    price: 450,
    description:
      "Ceramic IR film across every side and rear window, cut to each window's exact profile. Blocks the infrared heat and UV radiation that fade interior trim and crack dashboards — without the signal interference of metallic film.",
    inclusions: [
      'All Side Windows',
      'Rear Window',
      'Ceramic IR Film — Blocks Heat & UV',
      'HAUT Precision Scan Cut Pattern',
      'No-Bubble Adhesive',
    ],
    image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=Full+Vehicle+Tint',
    imageAlt: 'Full vehicle ceramic window tint coverage',
    featured: true,
  },
  {
    id: 'tint-full-plus',
    name: 'Full Vehicle + Windshield',
    tagline: 'Maximum Heat Rejection',
    price: 650,
    description:
      'Full vehicle coverage plus a windshield visor strip for maximum heat rejection and glare reduction where the sun hits hardest — the front glass most tint packages leave exposed.',
    inclusions: [
      'Everything in Full Vehicle Tint',
      'Windshield Visor Strip',
      'Maximum IR Heat Rejection',
      'Sharper Glare Reduction',
    ],
    image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=Windshield+Tint',
    imageAlt: 'Full vehicle tint plus windshield strip',
    featured: false,
  },
]

export const SERVICES_OVERVIEW = [
  {
    id: 'ppf',
    name: 'Paint Protection Film',
    tagline: 'High-performance physical shield designed to absorb everyday road impact, helping defend your factory paint against rock chips, swirl marks, and road wear.',
    priceFrom: 2399,
    href: '/ppf',
    image: '/assets/service-ppf.webp',
    imageAlt: 'Paint protection film service overview',
  },
  {
    id: 'ceramic',
    name: 'Ceramic Coating',
    tagline: 'Ultra-gloss hydrophobic barrier that repels dirt and water, making routine washes effortless while helping preserve your paint’s depth and UV resistance.',
    priceFrom: 999,
    href: '/ceramic',
    image: '/assets/service-ceramic-coating.webp',
    imageAlt: 'Ceramic coating service overview',
  },
  {
    id: 'window-tint',
    name: 'Window Tinting',
    tagline: 'Advanced ceramic tint engineered to reduce cabin heat and block harmful UV rays—enhancing everyday driving comfort while protecting your interior leather and trim.',
    priceFrom: 150,
    href: '/window-tint',
    image: '/assets/service-window-tinting.webp',
    imageAlt: 'Window tinting service overview',
  },
]

export const PPF_FEATURE_MATRIX: FeatureRow[] = [
  { label: 'Front Bumper', included: [true, true, true] },
  { label: 'Full Hood', included: [true, true, true] },
  { label: 'Fenders & Mirrors', included: [true, true, true] },
  { label: 'Headlights & Fog Lights', included: [true, true, true] },
  { label: 'Rocker Panels', included: [false, true, true] },
  { label: 'A-Pillars', included: [false, true, true] },
  { label: 'Rear Bumper Impact Area', included: [false, true, true] },
  { label: 'Door Edge Guards', included: [false, true, true] },
  { label: 'Full Body, Roof & Trunk', included: [false, false, true] },
  { label: 'Door Jambs & Sills', included: [false, false, true] },
  { label: 'Free Enclosed Trailer Transport', included: [false, false, true] },
]

export const TINT_FEATURE_MATRIX: FeatureRow[] = [
  { label: 'Front Driver & Passenger Windows', included: [true, true, true] },
  { label: 'All Rear Side Windows', included: [false, true, true] },
  { label: 'Rear Windshield', included: [false, true, true] },
  { label: 'Ceramic IR Film', included: [true, true, true] },
  { label: 'No-Bubble Adhesive', included: [false, true, true] },
  { label: 'Windshield Visor Strip', included: [false, false, true] },
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
      'The manufacturer warranty covers yellowing, cracking, and adhesive failure of the self-healing TPU film for 10 years, and is honored nationwide — not just at the installing studio. It does not cover damage from improper washing (automatic brush washes) or physical cuts from an accident.',
  },
  {
    question: 'How far in advance do I need to book?',
    answer:
      'Most services, including Front End and Highway PPF, can be booked same-week. Full Vehicle PPF and combined packages that require multiple days in our climate-controlled bay may need 1–2 weeks of lead time depending on the season.',
  },
  {
    question: 'Where is HAUT Flagship Studio located?',
    answer:
      'HAUT Flagship Studio is located at 361 NJ-17, Hackensack, NJ 07601. We serve the greater Bergen County area and offer free enclosed trailer transport for Full Vehicle PPF packages.',
  },
]

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'ppf-vs-ceramic-coating-hackensack',
    category: 'Technical Guide',
    title: 'PPF vs. Ceramic Coating: When to Use Which (And When to Use Both)',
    excerpt:
      'Paint Protection Film and ceramic coating solve different problems. PPF is a physical barrier — ceramic is a chemical sealant. Understanding the distinction helps you decide what your vehicle actually needs.',
    metaDescription:
      'Paint Protection Film and ceramic coating solve different problems. PPF is a physical barrier — ceramic is a chemical sealant. Understanding the distinction helps you decide what your vehicle actually needs.',
    readTime: '5 min read',
    date: 'June 2025',
    image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=PPF+vs+Ceramic',
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
    date: 'May 2025',
    image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=PPF+Lifespan+Guide',
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
    date: 'April 2025',
    image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=Hackensack+PPF+Guide',
    imageAlt: 'PPF installation process at HAUT Flagship Studio Hackensack',
    content: [
      'Most clients arrive expecting a same-day job. PPF installation — done correctly — takes time. A full vehicle wrap at HAUT requires 3–5 business days depending on vehicle complexity and film selection.',
      'Day 1: Paint Inspection and Decontamination. Before any film is cut or applied, the vehicle goes through a full decontamination wash, clay bar treatment, and paint correction if needed. Applying PPF over contamination or swirl marks locks those defects under the film permanently.',
      'Day 1–2: Digital Pattern Generation. Every panel template is generated using vehicle-specific 3D scan data through HAUT Precision Scan technology. This eliminates on-car trimming — a practice that risks cutting through the clear coat. Patterns account for every recessed edge, antenna mount, and body line.',
      'Day 2–4: Film Application. Panels are applied in sections, starting with the most complex geometry (front bumper, hood leading edge). Each section is wet-applied using a slip solution, positioned precisely, then heat-formed around edges and into recesses. Heat guns and squeegees remove all moisture and air.',
      'Day 4–5: Cure and Quality Check. The film requires 24–48 hours to fully bond. During this window, the vehicle stays in a climate-controlled bay. After cure, every panel is inspected under LED lighting for lifting edges, contamination, or optical distortion.',
      'Day 5: Client Delivery and Care Briefing. Every client receives a written care guide: no car washes for 7 days, avoid high-pressure direct spraying on edges for 30 days, use pH-neutral wash soap. We walk through every panel and explain what to expect as the film settles.',
      'HAUT is located at 361 NJ-17 in Hackensack — accessible from Bergen County, Hudson County, and NYC metro. For full vehicle installations, we offer free enclosed trailer pickup and delivery.',
    ],
  },
]
