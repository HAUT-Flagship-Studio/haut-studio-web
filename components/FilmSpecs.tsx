'use client'

import { useState } from 'react'

const SPECS = [
  {
    icon: '◈',
    title: 'Self-Healing Topcoat',
    teaser: 'Heat-activated polymer layer erases light scratches within seconds.',
    detail:
      'The elastomeric topcoat uses shape-memory polymers that reflow at temperatures above 60°C — reachable by sunlight alone. Minor swirl marks and fingernail scratches disappear without any manual intervention.',
  },
  {
    icon: '◉',
    title: 'Hydrophobic Surface',
    teaser: 'Water beads and rolls off at contact angles above 110°.',
    detail:
      'The nano-structured surface creates a lotus-effect hydrophobic layer with a static water contact angle of 110–120°. Road grime, brake dust, and bird droppings have minimal adhesion, making rinse maintenance sufficient.',
  },
  {
    icon: '◐',
    title: '9H Hardness Rating',
    teaser: 'Premium optical-clarity TPU film rated 9H — stops rock chips before they ever reach clear coat.',
    detail:
      'Premium-grade TPU (aliphatic polyurethane) film with 9H pencil hardness resists rock chips, road debris, and minor abrasion. Film thickness ranges from 6–8 mils (150–200 µm), providing a substantial physical barrier.',
  },
  {
    icon: '◑',
    title: 'UV Inhibitor Layer',
    teaser: 'Blocks 99% of UV-A and UV-B to prevent paint oxidation and protect resale value.',
    detail:
      'Integrated UV-absorbing compound layers prevent the clear coat beneath from yellowing, chalking, or oxidizing. ASTM G154 accelerated weathering tests confirm 10+ year color retention under continuous exposure.',
  },
  {
    icon: '◒',
    title: 'Optical Clarity',
    teaser: 'Film clarity rated at 92% light transmittance — optically invisible.',
    detail:
      'Low refractive index formulation ensures the film is visually undetectable in daylight. There is no orange-peel distortion when installed by our certified master installers using heat-forming techniques.',
  },
  {
    icon: '◓',
    title: 'DAP Digital Precision Patterns',
    teaser: 'Zero-blade paint contact — the pattern is cut before it ever touches your car.',
    detail:
      'Every panel template is generated from vehicle-specific 3D scan data via DAP (Digital Application Pattern) software, then cut before installation — 100% zero-blade contact with your paint. Patterns include all recessed edges, door jambs, and mirror housings for seamless full-panel coverage.',
  },
]

export default function FilmSpecs({ limit }: { limit?: number }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeSpec, setActiveSpec] = useState<(typeof SPECS)[0] | null>(null)
  const visibleSpecs = limit ? SPECS.slice(0, limit) : SPECS

  const openSpec = (spec: (typeof SPECS)[0]) => {
    setActiveSpec(spec)
    setModalOpen(true)
  }

  return (
    <section
      id="specs"
      className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Film specifications"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
            Technical Specifications
          </p>
          <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
            What&apos;s Inside
            <br />
            <span className="text-[#9FFE0A]">Every Layer</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#9FFE0A]" />
        </div>

        {/* Spec Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {visibleSpecs.map((spec) => (
            <button
              key={spec.title}
              type="button"
              onClick={() => openSpec(spec)}
              className="card-folded text-left bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-6 hover:border-[#9FFE0A]/40 transition-all duration-300 group"
              aria-label={`Learn more about ${spec.title}`}
            >
              <span className="text-[#9FFE0A] text-2xl mb-4 block group-hover:scale-110 transition-transform duration-200">
                {spec.icon}
              </span>
              <h3 className="font-kanit font-semibold text-white text-lg mb-2 group-hover:text-[#9FFE0A] transition-colors">
                {spec.title}
              </h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">
                {spec.teaser}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[#9FFE0A] text-xs font-roboto opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => { setActiveSpec(null); setModalOpen(true) }}
            className="btn-outline px-8 py-4 text-sm tracking-wider rounded-none inline-flex items-center gap-2"
            id="specs-learn-btn"
          >
            <span>View Full Specification Sheet</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Spec Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Film specification details"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false) }}
        >
          <div className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#DADADA]/15">
              <h3 className="font-kanit font-bold text-white text-xl">
                {activeSpec ? activeSpec.title : 'Full Specification Sheet'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#DADADA] hover:text-[#9FFE0A] transition-colors p-1"
                aria-label="Close specification modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {activeSpec ? (
                <div>
                  <span className="text-[#9FFE0A] text-4xl block mb-4">{activeSpec.icon}</span>
                  <p className="font-roboto text-[#DADADA] leading-relaxed mb-6">{activeSpec.detail}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Full spec table */}
                  <table className="w-full text-sm font-roboto">
                    <thead>
                      <tr className="border-b border-[#DADADA]/15">
                        <th className="text-left text-[#9FFE0A] font-semibold py-2 pr-4">Property</th>
                        <th className="text-left text-[#9FFE0A] font-semibold py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADADA]/10">
                      {[
                        ['Film Material', 'Aliphatic Polyurethane (TPU)'],
                        ['Film Thickness', '6–8 mils (150–200 µm)'],
                        ['Hardness (Pencil)', '9H'],
                        ['Water Contact Angle', '110–120°'],
                        ['UV Transmittance Block', '≥ 99% (UV-A + UV-B)'],
                        ['Light Transmittance', '92%'],
                        ['Self-Healing Trigger Temp', '60°C (natural sunlight)'],
                        ['Operating Temperature Range', '-40°C to +90°C'],
                        ['Adhesive Type', 'Pressure-Sensitive Acrylic'],
                        ['Removability', 'Residue-free within 10 years'],
                        ['Warranty', 'Manufacturer 10-Year Limited'],
                        ['Pattern Software', 'DAP (Digital Application Pattern)'],
                        ['Installation Method', 'Wet application + heat-forming'],
                      ].map(([prop, val]) => (
                        <tr key={prop}>
                          <td className="text-[#DADADA]/70 py-2.5 pr-4">{prop}</td>
                          <td className="text-white font-medium py-2.5">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pt-4 space-y-4">
                    {SPECS.map((spec) => (
                      <div key={spec.title} className="border-l-2 border-[#9FFE0A] pl-4">
                        <h4 className="font-kanit font-semibold text-white text-sm mb-1">{spec.title}</h4>
                        <p className="font-roboto text-[#DADADA]/70 text-xs leading-relaxed">{spec.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
