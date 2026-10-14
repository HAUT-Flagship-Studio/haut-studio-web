import Image from 'next/image'

// The five things owners say they're afraid a film shop will do to their car,
// each answered with what the studio actually does instead.
type Fear = {
  fear: string
  tag: string
  answer: string
  image?: { src: string; alt: string; caption: string }
}

const FEARS: Fear[] = [
  {
    fear: "They'll cut into my paint.",
    tag: 'Zero-Blade Cut',
    answer:
      "Every pattern is plotter-cut from your vehicle's scan data before the car enters the bay. Edges are wrapped and heat-formed by hand on the car — no blade is used on the paint.",
  },
  {
    fear: "The film will pull paint off when it's removed.",
    tag: 'No Edge Prep',
    answer:
      "On factory paint, the film comes off clean. Removal problems come from two places: repainted panels, and edge prep — an adhesion promoter some shops brush on film edges to make them grab harder, which bonds the film into the clear coat. We don't use edge prep. If a panel has been repainted, tell us and we'll talk it through before any film goes on.",
  },
  {
    fear: 'The edges will start lifting.',
    tag: 'Our Responsibility',
    answer:
      "Edges are wrapped behind the panel, heat-sealed, and inspected under raking LED light before delivery. A lifted edge is an installation fault, not wear — it's on us, and we fix it at no charge.",
  },
  {
    fear: 'Uneven edges will collect a dirt line.',
    tag: 'Wrapped Edges',
    answer:
      'A dirt line forms on the exposed edge of film trimmed on the face of a panel. Our patterns are drawn with wrap-arounds wherever an edge is reachable, and we add 0.1 in. on top — enough to tuck the film neatly around the panel edge, so there is no visible edge for grime to gather on.',
    image: {
      src: '/assets/work/brabus-g-class-wrapped-door-edge.webp',
      alt: 'Close-up of a Brabus G-Class door gap at the hinge, with paint protection film wrapped around both panel edges into the gap',
      caption: 'Brabus G-Class, door gap at the hinge — film follows the body line and wraps into the gap.',
    },
  },
  {
    fear: "They'll take my car apart and break something.",
    tag: 'No Disassembly',
    answer:
      "We don't remove bumpers, headlights, or trim. Film is wrapped into the panel gaps by hand, with a finish that matches a disassembled install — without unclipping sensors or disturbing panel alignment. Door handles and emblems come off only if you ask.",
  },
]

export default function InstallFears() {
  return (
    <section
      data-track-section="install_fears"
      id="install-fears"
      className="bg-[#1A292E] precision-grid scroll-mt-24"
      aria-label="What owners worry about before a PPF install"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-14">
          <p className="text-[#9FFE0A] font-roboto text-sm tracking-[0.2em] uppercase mb-3">
            ✦ Before You Book
          </p>
          <h2 className="font-kanit font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
            The Road Isn&apos;t the Only Risk.
            <br />
            <span className="text-[#9FFE0A]">A Bad Install Is Another.</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#9FFE0A]" />
          <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed mt-4 max-w-2xl">
            Most owners who call us have already seen a bad film job — a scored clear coat, an edge
            collecting dirt, a bumper that never sat right again. Here is where each of those comes
            from, and what we do instead.
          </p>
        </div>

        <ol className="border-t border-white/10">
          {FEARS.map((f, i) => (
            <li
              key={f.tag}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-8 border-b border-white/10"
            >
              <div className="flex items-start gap-4">
                <span className="font-kanit font-black text-[#9FFE0A] text-3xl leading-none shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-kanit font-semibold text-white text-xl leading-snug">
                  &ldquo;{f.fear}&rdquo;
                </h3>
              </div>
              <div className="md:pl-0 pl-12">
                <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase mb-2">
                  {f.tag}
                </p>
                <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">{f.answer}</p>
                {f.image && (
                  <figure className="mt-5">
                    <Image
                      src={f.image.src}
                      alt={f.image.alt}
                      width={1600}
                      height={1200}
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="w-full max-w-xl h-auto border border-white/10"
                    />
                    <figcaption className="font-roboto text-[#DADADA]/50 text-xs mt-2">
                      {f.image.caption}
                    </figcaption>
                  </figure>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
