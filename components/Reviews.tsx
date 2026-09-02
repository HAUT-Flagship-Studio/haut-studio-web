'use client'

import Link from 'next/link'

const REVIEWS = [
  {
    id: 1,
    name: 'Andrei K.',
    vehicle: 'Mercedes-Maybach (x2)',
    rating: 5,
    text: 'Had both of my Maybachs fully polished and ceramic coated here — the results are absolutely stunning. Best work in the area, just minutes from Manhattan. Professional, detailed, and truly top-notch service!',
    date: 'September 2025',
  },
  {
    id: 2,
    name: 'Alex A.',
    vehicle: 'Range Rover',
    rating: 5,
    text: 'Vadim and his team did a phenomenal job with my new Range Rover when I was looking for a very high quality PPF. Protecting the car and the original gloss black paint and gave it a truly incredible authentic deep Matte/Satin finish look. I was also very impressed with his advanced computerized system which precuts the high end PPF material using a special machine into every single precisely fitting piece — no manual cutting whatsoever, and the final fit was to perfection. No bubbles or uneven spots or anything, really clean job.',
    date: 'February 2026',
  },
  {
    id: 3,
    name: 'Myth P.',
    vehicle: 'BMW M5 & X5M',
    rating: 5,
    text: "I have had the pleasure of using this team for two of my BMWs (M5C and now an X5M). From end to end, I've been impressed with their attention to detail, their responsiveness to my requests, and the overall quality of their work and the materials used. My M5 was fully PPF'd (exterior and interior) and my X5M is PPF'd on the full front end. If for any reason I had issues or small imperfections, the team never hesitated to take me in right away and get it fixed.",
    date: 'March 2025',
  },
  {
    id: 4,
    name: 'Saumil P.',
    vehicle: 'BMW — Full PPF, Tint & Ceramic',
    rating: 5,
    text: "This was an absolutely incredible experience. The team here is excellent. Great line of communication, and the work is absolutely flawless. Brought my new car to the shop, and had a full PPF, tints and ceramic coating of the wheels performed. You can tell the level of detail with the work. I'm very happy with how things turned out and I will definitely be referring my friends and family here.",
    date: 'June 2026',
  },
  {
    id: 5,
    name: 'Ignatius A.',
    vehicle: 'BMW X4',
    rating: 5,
    text: "I couldn't be happier with the service I received! From start to finish, the team was professional, friendly, and incredibly knowledgeable. I came in to get my car wrapped, and they exceeded my expectations. The quality of their work is outstanding, and the attention to detail is second to none. My car looks absolutely stunning!",
    date: 'October 2024',
  },
  {
    id: 6,
    name: 'Grigory',
    vehicle: 'Mercedes-AMG CLE53',
    rating: 5,
    text: 'He did a great job with the blue matte wrap on my new 2026 Mercedes AMG CLE53! I highly recommend this shop!',
    date: 'August 2026',
  },
  {
    id: 7,
    name: 'Gregory D.',
    vehicle: 'Tesla Cybertruck',
    rating: 5,
    text: "I recently had my Cybertruck wrapped and I couldn't be happier with the results! The price was competitive, the quality of the vinyl wrap is top-notch, and the installation was flawless and done on schedule as promised. The color and finish are exactly what I wanted, and the wrap has held up beautifully over the past few months.",
    date: 'July 2024',
  },
  {
    id: 8,
    name: 'Philip C.',
    vehicle: 'Tesla Model Y',
    rating: 5,
    text: "Vadim and his crew are top notch. They did an excellent and careful job with the Model Y. Communication from the start was seamless and easy. He didn't try to sell you on anything extra and tells you the truth on what could look the best and give you options. Definitely would recommend.",
    date: 'January 2024',
  },
  {
    id: 9,
    name: 'Gianna D.',
    vehicle: 'Repeat PPF Client',
    rating: 5,
    text: "This is our third time using Vadim for PPF, and we've had a great experience every single time. Vadim is professional, reliable, and his attention to detail is amazing. We've never had any issues, and the quality of the work is always top notch. It's hard to trust just anyone with your cars, but we know they're in great hands.",
    date: 'August 2026',
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
        {showHeader && (
          <Link
            href="/reviews"
            className="inline-block mt-3 font-roboto text-[#9FFE0A] text-sm hover:underline"
          >
            Read All Client Reviews →
          </Link>
        )}
      </div>
    </section>
  )
}
