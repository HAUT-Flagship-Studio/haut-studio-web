import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage, { type LegalSection } from '@/components/LegalPage'
import { STUDIO } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Terms of Service | HAUT Flagship Studio',
  description:
    'Terms for using the HAUT Flagship Studio website and booking work at the studio: how online estimates relate to the final price, scheduling, payment, warranties and text messages.',
  alternates: {
    canonical: 'https://hautppfstudio.com/terms',
  },
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'Acceptance',
    body: (
      <p>
        By using this website or booking work with {STUDIO.name}, you agree to these terms. If you do not agree, please
        do not use the site.
      </p>
    ),
  },
  {
    heading: 'Our services',
    body: (
      <p>
        Installation work is performed at our studio at {STUDIO.address}, by appointment and subject to availability.
      </p>
    ),
  },
  {
    heading: 'Estimates on this website',
    body: (
      <p>
        Prices shown on this site, in the price calculator and in the assessment are starting estimates for the vehicle
        category you select. The final price is confirmed after we see the vehicle and may differ with its exact model,
        size, paint condition and the materials chosen. An estimate is not a binding offer until we confirm it with you.
      </p>
    ),
  },
  {
    heading: 'Scheduling and appointments',
    body: <p>Appointments may be rescheduled by either party with reasonable notice.</p>,
  },
  {
    heading: 'Payment',
    body: (
      <p>
        Payment terms and accepted methods are given when you book, and payment is due on completion of the work unless
        agreed otherwise in writing.
      </p>
    ),
  },
  {
    heading: 'Warranties',
    body: (
      <p>
        Manufacturer warranties on film and coating products are provided by the manufacturer under its own terms.
        Installation is performed to the manufacturer&apos;s installation standards.
      </p>
    ),
  },
  {
    heading: 'Text messages',
    body: (
      <>
        <p>
          If you give us your number on this site, we text you about your estimate and appointments as described in our{' '}
          <Link href="/privacy">Privacy Policy</Link>. Message frequency varies. Msg &amp; data rates may apply. Reply{' '}
          <strong>STOP</strong> to opt out at any time and <strong>HELP</strong> for help, or call {STUDIO.phone}.
        </p>
        <p>Carriers are not liable for delayed or undelivered messages.</p>
      </>
    ),
  },
  {
    heading: 'Use of this website',
    body: (
      <p>
        Do not submit requests in someone else&apos;s name or with someone else&apos;s contact details, and do not
        attempt to disrupt the site. Photos and text on this site belong to {STUDIO.name} or are used with permission.
      </p>
    ),
  },
  {
    heading: 'Limitation of liability',
    body: (
      <p>
        To the fullest extent permitted by law, {STUDIO.name} is not liable for indirect, incidental or consequential
        damages arising from use of this website.
      </p>
    ),
  },
  {
    heading: 'Governing law',
    body: <p>These terms are governed by the laws of the State of New Jersey.</p>,
  },
  {
    heading: 'Changes',
    body: <p>When these terms change, the new version is published here with a new date at the top.</p>,
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 9, 2026"
      intro={<p>These terms cover this website and work booked through it.</p>}
      sections={SECTIONS}
    />
  )
}
