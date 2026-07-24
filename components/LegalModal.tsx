'use client'

import { STUDIO } from '@/lib/data'

const PRIVACY_SECTIONS = [
  {
    heading: 'Information We Collect',
    body: 'When you request a quote, book a consultation, or contact us through this website, we may collect your name, phone number, email address, vehicle details, and any message you provide. We also automatically collect standard technical information, such as browser type and pages visited, through cookies and similar tracking technologies.',
  },
  {
    heading: 'How We Use Your Information',
    body: 'We use the information you provide to respond to quote requests, schedule appointments, communicate about your service, and improve our website and offerings. We may also use aggregated, non-identifying data to measure advertising performance.',
  },
  {
    heading: 'Cookies & Analytics',
    body: 'Our site uses cookies and pixel-based tracking tools, including the Meta (Facebook) Pixel, to understand how visitors use our site and to measure the effectiveness of our advertising. You can control cookies through your browser settings.',
  },
  {
    heading: 'Sharing of Information',
    body: 'We do not sell your personal information. We may share information with service providers who help us operate our business — such as scheduling, customer communication, and analytics tools — and when required by law.',
  },
  {
    heading: 'Data Security & Retention',
    body: 'We use reasonable administrative and technical safeguards to protect the information you share with us, and retain it only as long as necessary to fulfill the purposes described in this policy.',
  },
  {
    heading: 'Your Rights',
    body: 'You may contact us at any time to request access to, correction of, or deletion of your personal information.',
  },
  {
    heading: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page.',
  },
]

const TERMS_SECTIONS = [
  {
    heading: 'Acceptance of Terms',
    body: 'By using this website or booking a service with HAUT Flagship Studio, you agree to these Terms of Service.',
  },
  {
    heading: 'Services',
    body: 'HAUT Flagship Studio provides paint protection film, ceramic coating, and window tinting installation services at our Hackensack, NJ studio. Service availability is subject to appointment scheduling.',
  },
  {
    heading: 'Quotes & Pricing',
    body: 'Prices listed on this website are starting estimates. Final pricing is confirmed after a vehicle-specific assessment and may vary based on vehicle size, condition, and selected materials.',
  },
  {
    heading: 'Scheduling & Appointments',
    body: 'Appointments are subject to availability and may be rescheduled by either party with reasonable notice.',
  },
  {
    heading: 'Payment',
    body: 'Payment terms and accepted methods are provided at the time of booking and are due upon completion of service unless otherwise agreed in writing.',
  },
  {
    heading: 'Warranties',
    body: 'Where applicable, manufacturer warranties on film and coating products are provided directly by the manufacturer. Workmanship is performed in accordance with industry-standard installation practices.',
  },
  {
    heading: 'Limitation of Liability',
    body: 'To the fullest extent permitted by law, HAUT Flagship Studio is not liable for indirect, incidental, or consequential damages arising from use of this website or our services.',
  },
  {
    heading: 'Governing Law',
    body: 'These Terms are governed by the laws of the State of New Jersey, without regard to conflict-of-law principles.',
  },
  {
    heading: 'Changes to These Terms',
    body: 'We may update these Terms at any time. Continued use of our services after changes are posted constitutes acceptance of the revised Terms.',
  },
]

export type LegalModalType = 'privacy' | 'terms' | null

export default function LegalModal({
  type,
  onClose,
}: {
  type: LegalModalType
  onClose: () => void
}) {
  if (!type) return null

  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'
  const sections = type === 'privacy' ? PRIVACY_SECTIONS : TERMS_SECTIONS

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="card-folded bg-[#1A292E]/95 backdrop-blur border border-slate-800 w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#DADADA]/15 sticky top-0 bg-[#1A292E]/95 backdrop-blur">
          <div>
            <h3 className="font-kanit font-bold text-white text-xl">{title}</h3>
            <p className="font-roboto text-[#DADADA]/50 text-xs mt-1">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#DADADA] hover:text-[#9FFE0A] transition-colors p-1 flex-shrink-0"
            aria-label={`Close ${title}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {sections.map((s) => (
            <div key={s.heading}>
              <h4 className="font-kanit font-semibold text-white text-sm mb-2">{s.heading}</h4>
              <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
          <div className="pt-4 border-t border-[#DADADA]/10">
            <p className="font-roboto text-[#DADADA]/50 text-xs leading-relaxed">
              Questions about this {title.toLowerCase()}? Contact {STUDIO.name} at {STUDIO.phone} or visit us at{' '}
              {STUDIO.address}.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
