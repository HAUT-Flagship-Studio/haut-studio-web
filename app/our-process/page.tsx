import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import QuoteButton from '@/components/QuoteButton'
import { STUDIO } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Our Process | PPF, Ceramic Coating & Window Tint Installation | HAUT Flagship Studio',
  description:
    "See exactly how HAUT Flagship Studio installs paint protection film, ceramic coating, and window tint in Hackensack, NJ — HAUT Precision Scan pattern plotting, climate-controlled dust-free bays, and zero-blade contact on every panel. The full step-by-step process for Bergen County's certified master installers.",
  alternates: {
    canonical: 'https://hautppfstudio.com/our-process',
  },
}

const TABS = [
  { id: 'ppf-process', label: 'Paint Protection Film' },
  { id: 'ceramic-process', label: 'Ceramic Coating' },
  { id: 'window-tint-process', label: 'Window Tinting' },
]

const PPF_STEPS = [
  {
    step: '01',
    title: 'Paint Decontamination & Clay Bar Prep',
    body: 'Every vehicle starts with a full decontamination wash and clay bar treatment to strip embedded brake dust, tar, and road grime from the clear coat. Installing film over contamination locks defects underneath permanently — this step is never skipped, no matter how clean the car looks on arrival.',
  },
  {
    step: '02',
    title: 'HAUT Precision Scan Plotting (Zero-Blade Contact)',
    body: "Your vehicle's exact panel geometry — every recessed edge, door jamb, mirror housing, and body line — is pulled from vehicle-specific 3D scan data and plotted through HAUT Precision Scan technology. Every template is cut before it ever touches your paint, eliminating the on-car blade trimming that risks scoring your clear coat.",
  },
  {
    step: '03',
    title: 'Climate-Controlled Dust-Free Certified Installation',
    body: 'Panels are wet-applied and heat-formed by certified master installers inside our sealed, positive-pressure Hackensack bay. Filtered air handling keeps airborne dust and debris out of the install, so nothing gets trapped between the film and your paint.',
  },
  {
    step: '04',
    title: 'Edge Tucking, LED Curing & Final Inspection',
    body: 'Every edge is tucked and heat-formed into door jambs and recesses for a factory-clean finish, then cured under LED lighting that reveals lifting edges, trapped moisture, or optical distortion invisible under normal light. Nothing leaves the bay until it passes.',
  },
]

const CERAMIC_STEPS = [
  {
    step: '01',
    title: 'Multi-Stage Paint Correction & Swirl Removal',
    body: 'Before any ceramic product touches the surface, we machine-correct the paint across multiple polishing stages to remove swirl marks, light scratches, and oxidation — the coating is only as good as the surface underneath it.',
  },
  {
    step: '02',
    title: 'Isopropyl Alcohol Surface Degreasing',
    body: 'A dedicated IPA (isopropyl alcohol) wipe-down strips every trace of polishing oils and residue left behind from correction. Ceramic coating bonds directly to clear coat or PPF — any oil film between the two prevents proper adhesion and shortens the coating\'s lifespan.',
  },
  {
    step: '03',
    title: 'Dual-Layer 9H Ceramic Base & Topcoat Application',
    body: 'A base ceramic layer is hand-applied panel by panel and leveled before it flashes, followed by a topcoat layer for depth and durability. The dual-layer application is what pushes the finished shell to a 9H pencil hardness rating.',
  },
  {
    step: '04',
    title: 'Infrared Curing & Hydrophobic Quality Test',
    body: 'Infrared curing accelerates the chemical cross-linking that hardens the ceramic shell, cutting the cure window without compromising bond strength. Every vehicle is water-tested before delivery to confirm the hydrophobic contact angle meets spec.',
  },
]

const TINT_STEPS = [
  {
    step: '01',
    title: 'Glass Surface Prep & Scrape',
    body: 'Every window is thoroughly cleaned and hand-scraped to remove old adhesive residue, mineral deposits, and contamination. Film applied over an imperfectly prepped surface traps particles that show up as visible specks under sunlight.',
  },
  {
    step: '02',
    title: 'HAUT Precision Scan Glass Cutting',
    body: "Each window's exact profile is plotted through our computerized HAUT Precision Scan glass-cutting system, producing a panel-exact template for every pane before it's applied — no hand-trimming against the glass edge.",
  },
  {
    step: '03',
    title: 'Heat Shrinking & Wet Micro-Fiber Application',
    body: 'Curved rear and quarter windows are heat-shrunk to match the glass contour before application. Film is then applied wet, using a slip solution and micro-fiber tools to press out moisture and eliminate air pockets from edge to edge.',
  },
  {
    step: '04',
    title: 'Dot Matrix Edge Trim & Optical Clarity Inspection',
    body: 'Edges are precision-trimmed around the dot matrix border every factory windshield and rear window uses, for a clean, factory-level edge with no visible film lift. A final optical clarity check under direct light confirms zero haze, bubbling, or distortion.',
  },
]

function ProcessSection({
  id,
  eyebrow,
  heading,
  intro,
  steps,
  ctaLabel,
  serviceHref,
  serviceLabel,
}: {
  id: string
  eyebrow: string
  heading: ReactNode
  intro: string
  steps: { step: string; title: string; body: string }[]
  ctaLabel: string
  serviceHref: string
  serviceLabel: string
}) {
  return (
    <section
      id={id}
      className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-24"
      aria-label={`${serviceLabel} installation process`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-3xl">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">{eyebrow}</p>
          <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">{heading}</h2>
          <div className="w-16 h-0.5 bg-[#9FFE0A] mb-6" />
          <p className="font-roboto text-[#DADADA]/70 text-base leading-relaxed">{intro}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {steps.map((s) => (
            <div
              key={s.step}
              className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-6"
            >
              <span className="font-kanit font-black text-[#9FFE0A]/30 text-4xl block mb-4">{s.step}</span>
              <h3 className="font-kanit font-semibold text-white text-lg mb-2">{s.title}</h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <QuoteButton label={ctaLabel} className="btn-green px-8 py-4 text-sm tracking-wider rounded-none" />
          <Link
            href={serviceHref}
            className="btn-outline px-8 py-4 text-sm tracking-wider rounded-none inline-flex items-center gap-2"
          >
            View {serviceLabel} Packages & Pricing →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function OurProcessPage() {
  return (
    <main>
      <PageHero
        eyebrow="How It's Done"
        heading={
          <>
            One Studio.
            <br />
            <span className="text-[#9FFE0A]">Three Zero-Blade Processes.</span>
          </>
        }
        subtitle="Bergen County and Northern NJ vehicle owners trust HAUT Flagship Studio because every install — paint protection film, ceramic coating, or window tint — follows the same digitally-plotted, zero-blade process inside our climate-controlled, dust-free Hackensack, NJ bays. Here's exactly what happens to your vehicle, step by step."
        ctaLabel="Get Custom Estimate"
      />

      {/* Philosophy intro */}
      <section className="bg-[#1A292E] py-16 md:py-20 px-4 sm:px-6 lg:px-8" aria-label="Our zero-blade philosophy">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">The Zero-Blade Philosophy</p>
          <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-6">
            Your Paint Never Meets a Blade
          </h2>
          <p className="font-roboto text-[#DADADA] text-base leading-relaxed mb-4">
            Most shops still hand-trim film directly on the car — a blade a few millimeters from your clear coat,
            on every single edge. At HAUT, every pattern for every panel and every window is plotted digitally
            through HAUT Precision Scan technology before installation ever begins. That means zero
            on-car cutting, zero risk of a stray blade mark, and a factory-exact fit on the first try.
          </p>
          <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
            Combined with our climate-controlled, dust-free installation bays at 361 NJ-17 in Hackensack, it&apos;s why
            Bergen County&apos;s exotic and luxury vehicle owners bring their cars to HAUT instead of a mobile installer
            or a general detail shop.
          </p>
        </div>
      </section>

      {/* Tab / jump nav */}
      <section className="bg-[#1A292E] border-y border-[#DADADA]/10 py-8 px-4 sm:px-6 lg:px-8">
        <nav
          className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3"
          aria-label="Jump to a service's process"
        >
          {TABS.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className="btn-outline px-5 py-2.5 text-xs sm:text-sm tracking-wide rounded-none whitespace-nowrap"
            >
              {tab.label}
            </a>
          ))}
        </nav>
      </section>

      <ProcessSection
        id="ppf-process"
        eyebrow="Service 1 of 3"
        heading={
          <>
            Paint Protection Film
            <br />
            <span className="text-[#9FFE0A]">Installation Process</span>
          </>
        }
        intro="Self-healing optical TPU film, cut with zero-blade HAUT Precision Scan and installed in a climate-controlled Hackensack bay — the process that protects Bergen County's daily drivers and exotics alike from rock chips, swirl marks, and UV fade."
        steps={PPF_STEPS}
        ctaLabel="Get PPF Estimate →"
        serviceHref="/ppf"
        serviceLabel="PPF"
      />

      <ProcessSection
        id="ceramic-process"
        eyebrow="Service 2 of 3"
        heading={
          <>
            Ceramic Coating
            <br />
            <span className="text-[#9FFE0A]">Application Process</span>
          </>
        }
        intro="A dual-layer 9H ceramic shell bonded directly to clear coat or PPF — correction, degreasing, application, and cure, done right so the hydrophobic finish actually lasts years, not months."
        steps={CERAMIC_STEPS}
        ctaLabel="Get Ceramic Estimate →"
        serviceHref="/ceramic"
        serviceLabel="Ceramic Coating"
      />

      <ProcessSection
        id="window-tint-process"
        eyebrow="Service 3 of 3"
        heading={
          <>
            Window Tinting
            <br />
            <span className="text-[#9FFE0A]">Installation Process</span>
          </>
        }
        intro="Ceramic IR film, computer-cut for every window and heat-shrunk to the glass contour — the same digital-precision standard we hold our PPF and ceramic work to, applied to every pane."
        steps={TINT_STEPS}
        ctaLabel="Get Tint Estimate →"
        serviceHref="/window-tint"
        serviceLabel="Window Tinting"
      />

      {/* Closing CTA */}
      <section className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8" aria-label="Book your install">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
            Ready to See This Process
            <br />
            <span className="text-[#9FFE0A]">on Your Vehicle?</span>
          </h2>
          <p className="font-roboto text-[#DADADA]/70 text-base leading-relaxed mb-8">
            Schedule a consultation at our Hackensack, NJ studio and get a custom estimate for PPF, ceramic
            coating, window tint, or any combination — same-week appointments available for Bergen County
            and Northern NJ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <QuoteButton label="Get Custom Estimate →" className="btn-green px-8 py-4 text-sm tracking-wider rounded-none" />
            <a href={STUDIO.phoneHref} className="btn-outline px-8 py-4 text-sm tracking-wider rounded-none">
              Call {STUDIO.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
