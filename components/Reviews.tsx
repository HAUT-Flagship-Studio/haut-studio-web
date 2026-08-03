'use client'

const REVIEWS = [
  {
    id: 1,
    name: 'Marcus T.',
    vehicle: '2023 BMW M4 Competition',
    rating: 5,
    text: 'The precision of the cut is something else. Every edge on my M4 was wrapped flush — zero lifting at the door handles, not even near the hood scoop. Three months in and it still looks like it came off a factory line.',
    date: 'March 2025',
  },
  {
    id: 2,
    name: 'Dmitri K.',
    vehicle: '2022 Porsche 911 GT3',
    rating: 5,
    text: 'I drove from Brooklyn specifically because of the reputation. Full vehicle wrap on a GT3 is not a job most shops take seriously. HAUT spent two days making sure every panel was perfect. The film is invisible. Genuinely invisible.',
    date: 'January 2025',
  },
  {
    id: 3,
    name: 'Sarah M.',
    vehicle: '2024 Range Rover Sport',
    rating: 5,
    text: 'Highway package plus ceramic coating. The water sheeting behavior alone is worth the price of the ceramic. Cleaning my Rover is now a 15-minute rinse — nothing sticks anymore. Absolutely worth it.',
    date: 'April 2025',
  },
  {
    id: 4,
    name: 'Anthony R.',
    vehicle: '2021 Chevrolet Corvette C8',
    rating: 5,
    text: 'They use HAUT’s own precision-scan patterns so the cuts are vehicle-specific — no trimming on the car. The shop is clean, the techs are meticulous, and they gave me a full walkthrough of every panel before I drove off.',
    date: 'February 2025',
  },
  {
    id: 5,
    name: 'Priya S.',
    vehicle: '2023 Tesla Model S Plaid',
    rating: 5,
    text: 'My Model S had two small rock chips on the hood from a month of driving. They repaired those first, then applied the full vehicle PPF. The self-healing film is real — I watched it erase a light scratch in direct sunlight.',
    date: 'May 2025',
  },
  {
    id: 6,
    name: 'James L.',
    vehicle: '2024 Lamborghini Urus S',
    rating: 5,
    text: 'A Urus has more complex panel geometry than most cars people wrap. The front bumper alone has 12 separate sections. Everything was perfect on delivery. I have used four PPF shops in my life — HAUT is the only one I would come back to.',
    date: 'June 2025',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-[#9FFE0A]' : 'text-[#DADADA]/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews({ limit, showHeader = true }: { limit?: number; showHeader?: boolean }) {
  // Duplicate reviews for seamless infinite loop
  const sourceReviews = limit ? REVIEWS.slice(0, limit) : REVIEWS
  const allReviews = [...sourceReviews, ...sourceReviews]

  return (
    <section
      id="reviews"
      className="bg-[#1A292E] precision-grid py-16 md:py-24 overflow-hidden"
      aria-label="Customer reviews"
    >
      {showHeader && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 text-left">
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">
            ✦ Client Reviews
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            What Clients
            <br />
            <span className="text-[#9FFE0A]">Say About the Work</span>
          </h2>
        </div>
      )}

      {/* Infinite-scroll review track */}
      <div className="relative" aria-label="Review carousel">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1A292E] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1A292E] to-transparent z-10 pointer-events-none" />

        <div className="reviews-track px-4">
          {allReviews.map((review, i) => (
            <article
              key={`${review.id}-${i}`}
              className="card-folded flex-shrink-0 w-[340px] mx-3 bg-[#1A292E]/90 backdrop-blur border border-slate-800 p-6"
              aria-label={`Review by ${review.name}`}
            >
              {/* Rating + Date */}
              <div className="flex items-center justify-between mb-4">
                <StarRating count={review.rating} />
                <span className="font-roboto text-[#DADADA]/40 text-xs">{review.date}</span>
              </div>

              {/* Review text */}
              <blockquote className="text-sm text-gray-400 leading-relaxed mb-5">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              {/* Reviewer */}
              <div className="border-t border-[#DADADA]/10 pt-4">
                <p className="text-lg md:text-xl font-bold text-white tracking-tight">{review.name}</p>
                <p className="font-roboto text-[#9FFE0A] text-xs mt-0.5">{review.vehicle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Google badge */}
      <div className="text-center mt-12">
        <p className="font-roboto text-[#DADADA]/50 text-sm">
          ★ 5.0 · Verified Google Reviews · Hackensack, NJ
        </p>
      </div>
    </section>
  )
}
