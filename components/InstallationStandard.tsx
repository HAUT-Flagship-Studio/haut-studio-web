const PROTOCOL_STEPS = [
  {
    step: '01',
    title: 'Decontamination & Paint Prep',
    body: 'Iron remover, clay bar treatment, and machine polishing strip embedded contamination before any film touches the surface.',
  },
  {
    step: '02',
    title: 'HAUT Precision Pattern Modification',
    body: 'We manually extend every software-generated pattern by 15–20mm beyond the factory template for full wrapped edges — not just panel faces.',
  },
  {
    step: '03',
    title: 'Dust-Free Cleanroom Installation',
    body: 'Installed inside a filtered, positive-pressure environment that keeps airborne contaminants from ever getting trapped beneath the film.',
  },
  {
    step: '04',
    title: 'Edge Tucking & Curing Inspection',
    body: 'Every edge is tucked behind the panel and heat-sealed, then inspected under raking LED surface lighting before your vehicle leaves the bay.',
  },
]

export default function InstallationStandard() {
  return (
    <section
      id="process"
      className="bg-[#1A292E] precision-grid scroll-mt-24"
      aria-label="The HAUT installation standard"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
            Zero-Blade Protocol
          </p>
          <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
            The HAUT
            <br />
            <span className="text-[#9FFE0A]">Installation Standard</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#9FFE0A]" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROTOCOL_STEPS.map((s) => (
            <div
              key={s.step}
              className="card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-6"
            >
              <span className="font-kanit font-black text-[#9FFE0A]/30 text-4xl block mb-4">
                {s.step}
              </span>
              <h3 className="font-kanit font-semibold text-white text-lg mb-2">{s.title}</h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
