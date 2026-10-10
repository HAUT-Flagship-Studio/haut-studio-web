import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/components/LegalPage'
import { STUDIO } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Privacy Policy | HAUT Flagship Studio',
  description:
    'What HAUT Flagship Studio collects when you request an estimate, how the Meta Pixel and Google Analytics are used, what is shared with advertising platforms, and how to stop calls, texts and email.',
  alternates: {
    canonical: 'https://hautppfstudio.com/privacy',
  },
}

// Written to match what the code actually does — app/api/lead/route.ts,
// app/api/meta-event/route.ts and lib/metaCapi.ts. If either changes what it
// sends or to whom, this page changes with it.
const SECTIONS: LegalSection[] = [
  {
    heading: 'What we collect',
    body: (
      <>
        <p>
          <strong>What you give us.</strong> When you use the price calculator, the 2-minute assessment or call us:
          your name, phone number, email address, vehicle details, your answers, the services you selected, the
          estimate shown to you, and any notes you write.
        </p>
        <p>
          <strong>What is collected automatically.</strong> Your IP address, browser and device type, the pages you
          visit, the site that referred you, and the tags on the link you arrived from (such as utm parameters and
          the click identifiers fbclid and gclid that Meta and Google add to ad links).
        </p>
      </>
    ),
  },
  {
    heading: 'How we use it',
    body: (
      <ul>
        <li>To prepare your estimate, contact you about it, and schedule and carry out the work.</li>
        <li>To honor warranties and answer later questions about work we performed.</li>
        <li>To understand which ads and pages bring enquiries, and to improve them.</li>
      </ul>
    ),
  },
  {
    heading: 'Cookies, the Meta Pixel and Google Analytics',
    body: (
      <>
        <p>
          This site uses the Meta Pixel and Google Analytics. Both set cookies in your browser (for Meta, <code>_fbp</code>{' '}
          and, when you arrive from a Meta ad, <code>_fbc</code>) and record events such as page views, starting the
          assessment, viewing an estimate, submitting a request, and tapping our phone number.
        </p>
        <p>
          You can block or delete cookies in your browser settings. Google offers an opt-out at{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            tools.google.com/dlpage/gaoptout
          </a>
          , and Meta lets you control ad personalisation at{' '}
          <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">
            facebook.com/adpreferences
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: 'What we share with advertising platforms',
    body: (
      <>
        <p>
          When you submit a request, our server reports it to Meta Platforms through Meta&apos;s Conversions API.
          Your email address, phone number and name are converted to a one-way SHA-256 hash on our server before they
          are sent; we also send your IP address, your browser&apos;s user-agent string, the Meta cookie identifiers
          above, the services and estimate involved, and the page you were on. When you view an estimate without
          submitting contact details, we report that event without any contact information.
        </p>
        <p>
          Meta uses this to measure whether our ads led to an enquiry and to show our ads to people likely to be
          interested, under Meta&apos;s own terms and data policy. We never send advertising platforms your contact
          details in readable form.
        </p>
      </>
    ),
  },
  {
    heading: 'Service providers',
    body: (
      <p>
        Your request is delivered to the people who answer it through our customer-management system (HighLevel), an
        internal staff notification channel (Telegram) and an internal enquiry log (Google Sheets). The site is hosted
        by Vercel. These providers process information on our behalf and only to run those services.
      </p>
    ),
  },
  {
    heading: 'Calls, text messages and email',
    body: (
      <>
        <p>
          Under each phone field on this site you will find this notice: &ldquo;By submitting, you agree that{' '}
          {STUDIO.name} may call and text you at the number provided about your estimate and appointment, including
          by automated means. Consent is not a condition of purchase. Msg &amp; data rates may apply; frequency varies.
          Reply STOP to opt out, HELP for help.&rdquo;
        </p>
        <p>
          We use your phone number and email to send your estimate, follow up on it, confirm and remind you of
          appointments, and tell you when your vehicle is ready. Reply <strong>STOP</strong> to any text to stop
          texts, or <strong>HELP</strong> for help. Ask us to stop calls or email by phone or in person and we will.
        </p>
        <p>
          We do not sell your mobile number or your text-message consent, and we do not share them with third parties
          for their own marketing.
        </p>
      </>
    ),
  },
  {
    heading: 'Selling and targeted advertising',
    body: (
      <p>
        We do not sell personal information for money. Sharing the event data described above with Meta to measure
        and target our ads can count as &ldquo;targeted advertising&rdquo; under some state privacy laws, including New
        Jersey&apos;s. You can opt out of it by contacting us; we will stop including your information in what we
        send.
      </p>
    ),
  },
  {
    heading: 'How long we keep it',
    body: (
      <p>
        Enquiries and client records are kept while we are quoting or working with you, and afterwards for as long as
        a warranty on our work may need them — no longer than three years after our last contact unless you are an
        active client. Analytics data is kept according to the retention settings of Google Analytics (14 months) and
        Meta&apos;s own policy.
      </p>
    ),
  },
  {
    heading: 'Your rights',
    body: (
      <p>
        You can ask to see the personal information we hold about you, to correct it, or to delete it, and to opt out
        of targeted advertising as described above. Contact us by phone or at the studio; we answer within 30 days
        and may need to confirm it is you before acting.
      </p>
    ),
  },
  {
    heading: 'Security',
    body: (
      <p>
        The site is served only over HTTPS, delivery credentials are kept in server-side configuration and never in
        the page, and access to enquiries is limited to the people who handle them. No system is perfectly secure, but
        these are the measures we keep.
      </p>
    ),
  },
  {
    heading: 'Children',
    body: <p>This site is not directed to children under 16, and we do not knowingly collect their information.</p>,
  },
  {
    heading: 'Changes',
    body: <p>When this policy changes, the new version is published here with a new date at the top.</p>,
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 9, 2026"
      intro={
        <p>
          This policy explains what {STUDIO.name} ({STUDIO.address}) collects through this website, why, who it is
          shared with, and how to stop it.
        </p>
      }
      sections={SECTIONS}
    />
  )
}
