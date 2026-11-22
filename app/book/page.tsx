import type { Metadata } from 'next'
import BookingForm from '@/components/BookingForm'
import { AddressLink, PhoneLink } from '@/components/TrackedLinks'
import { STUDIO } from '@/lib/data'

// The booking link on the Google Business Profile points here. It describes
// booking, not the service menu — the service pages own that (check-seo rule 4).
export const metadata: Metadata = {
  title: 'Book a Drop-off | HAUT Flagship Studio',
  description:
    'Request a drop-off day and time at HAUT Flagship Studio, 361 NJ-17. Pick a weekday between 10 AM and 6 PM; the studio calls to confirm before you come in.',
  alternates: {
    canonical: 'https://hautppfstudio.com/book',
  },
}

export default function BookPage() {
  return (
    <main className="bg-[#1A292E] precision-grid pt-36 pb-20 md:pt-44 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#9FFE0A] font-roboto text-xs tracking-widest uppercase mb-3">✦ Booking</p>
        <h1 className="font-kanit font-black text-white text-4xl sm:text-5xl leading-tight mb-4">
          Book a Drop-off at the Studio
        </h1>
        <p className="font-roboto text-[#DADADA] text-base leading-relaxed mb-2">
          Choose the car, the service, a weekday and a time. The studio calls you to confirm the day before you come
          in.
        </p>
        <p className="font-roboto text-[#DADADA]/70 text-sm mb-10">
          <AddressLink location="book_page" className="underline underline-offset-2 hover:text-[#9FFE0A]">
            {STUDIO.address}
          </AddressLink>
          {' · '}
          {STUDIO.hours}
          {' · '}
          <PhoneLink location="book_page" className="underline underline-offset-2 hover:text-[#9FFE0A]">
            {STUDIO.phone}
          </PhoneLink>
        </p>

        <div className="card-folded bg-[#1A292E]/90 border border-[#DADADA]/15 p-6 sm:p-8">
          <BookingForm />
        </div>
      </div>
    </main>
  )
}
