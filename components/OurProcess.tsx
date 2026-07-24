const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Wash & Paint Decontamination',
    body: 'A full decontamination wash and clay bar treatment strips embedded contamination and road grime before any film is cut — installing over defects locks them under the film permanently.',
  },
  {
    step: '02',
    title: 'Digital DAP Precision Pattern Cut',
    body: "Vehicle-specific 3D scan data drives the DAP cutter, generating a panel-exact template — every recessed edge, door jamb, and mirror housing — with zero blade contact on your paint.",
  },
  {
    step: '03',
    title: 'Dust-Free Certified Installation',
    body: 'Film is wet-applied and heat-formed by certified master installers inside our climate-controlled, dust-free bay — no airborne debris, no trapped particles under the surface.',
  },
  {
    step: '04',
    title: 'Final Quality Inspection',
    body: 'Every panel is inspected under LED lighting for lifting edges, contamination, or optical distortion before the vehicle leaves our studio.',
  },
]

export default function OurProcess() {
  return (
    <section
      id="process"
      className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-24"
      aria-label="Our installation process"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
            How It&apos;s Done
          </p>
          <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
            Our
            <br />
            <span className="text-[#9FFE0A]">Process</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#9FFE0A]" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((s) => (
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
