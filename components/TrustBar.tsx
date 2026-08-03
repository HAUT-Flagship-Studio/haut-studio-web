const TRUST_ITEMS = [
  '★ 5.0 Google Reviews',
  'Manufacturer Flagship Studio',
  '10-Year Nationwide Warranty',
  'Exotic & Supercar Specialists',
]

export default function TrustBar() {
  return (
    <section
      className="bg-[#1A292E] border-y border-[#DADADA]/10 py-5 px-4 sm:px-6 lg:px-8"
      aria-label="Trust indicators"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {TRUST_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="text-[#9FFE0A] text-sm leading-none">✦</span>
            <span className="font-roboto text-[#DADADA] text-sm tracking-wide whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
