const HAZARDS = [
  {
    title: 'Rock Chips & Debris',
    detail: 'Absorbs high-speed impacts from gravel and road debris, leaving the film to take the hit so your clear coat doesn\'t.',
  },
  {
    title: 'Swirls & Wash Scratches',
    detail: 'Self-healing topcoat molecularly fuses back together with ambient heat, erasing fine scratches and swirl marks automatically.',
  },
  {
    title: 'UV Fading & Stains',
    detail: 'Blocks harmful UV rays and resists chemical stains from bird droppings, bug splatter, and harsh road salts.',
  },
]

export default function RoadHazardsGrid() {
  return (
    <section
      id="hazards"
      className="bg-[#1A292E] precision-grid"
      aria-label="Road hazards and PPF solutions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
            ✦ Defense System
          </p>
          <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
            Rock Chips. Swirl Marks.
            <br />
            <span className="text-[#9FFE0A]">UV Fade. Stopped Cold.</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#9FFE0A]" />
        </div>

        {/* Hazard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HAZARDS.map((h) => (
            <div
              key={h.title}
              className="bg-[#0D1216] border border-white/10 p-6 rounded-2xl"
            >
              <h3 className="font-kanit font-semibold text-white text-lg mb-2 leading-snug">{h.title}</h3>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">{h.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
