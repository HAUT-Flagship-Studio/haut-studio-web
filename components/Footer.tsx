'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useQuiz } from './QuizProvider'
import { STUDIO } from '@/lib/data'
import { PhoneLink, AddressLink } from './TrackedLinks'

const FOOTER_LINKS = {
  Services: [
    { label: 'Paint Protection Film', href: '/ppf' },
    { label: 'Ceramic Coating', href: '/ceramic' },
    { label: 'Window Tinting', href: '/window-tint' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'PPF vs Ceramic', href: '/blog/ppf-vs-ceramic-coating-hackensack' },
    { label: 'Client Reviews', href: '/reviews' },
    { label: 'Get a Custom Estimate', href: 'quiz' },
  ],
  Company: [
    { label: 'About the Studio', href: '/about' },
    { label: 'Service Area', href: '/service-area' },
    { label: 'Our Process', href: '/our-process' },
    { label: 'Contact Us', href: '/#contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  const { openQuiz } = useQuiz()
  const pathname = usePathname()

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer
      className="bg-[#1A292E] border-t border-[#DADADA]/10 precision-grid"
      aria-label="Site footer"
    >
      {/* CTA Banner */}
      <div className="border-b border-[#DADADA]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl mb-2">
              Ready to Stop Washing
              <br />
              <span className="text-[#9FFE0A]">and Start Driving?</span>
            </h2>
            <p className="font-roboto text-[#DADADA]/70 text-sm">
              Schedule a consultation with Bergen County&apos;s certified master installers. Same-week appointments available.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <button
              type="button"
              onClick={openQuiz}
              className="btn-green px-8 py-4 text-sm tracking-wider rounded-none whitespace-nowrap"
              id="footer-cta-quiz"
            >
              Get Custom Estimate →
            </button>
            <PhoneLink
              location="footer_cta_banner"
              className="btn-outline px-8 py-4 text-sm tracking-wider rounded-none whitespace-nowrap text-center"
            >
              {STUDIO.phone}
            </PhoneLink>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 mb-6 w-fit group" aria-label="HAUT Flagship Studio Home">
              <Image
                src="/assets/logo.png"
                alt="HAUT"
                width={1699}
                height={500}
                className="h-10 w-auto group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col leading-none">
                <span className="font-kanit font-semibold text-white text-xs tracking-[0.18em] uppercase">
                  Flagship Studio
                </span>
                <span className="text-[#DADADA] text-[9px] tracking-widest uppercase font-roboto">
                  Hackensack, NJ
                </span>
              </div>
            </Link>
            <p className="font-roboto text-[#DADADA]/60 text-sm leading-relaxed mb-6 max-w-xs">
              Precision Paint Protection Film, ceramic coatings, and window tinting — applied with
              digital-cut accuracy for every panel.
            </p>

            {/* Contact Info */}
            <address className="not-italic space-y-3">
              <AddressLink
                location="footer_contact_info"
                className="flex items-start gap-2 text-[#DADADA]/70 hover:text-[#9FFE0A] transition-colors text-sm font-roboto"
              >
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#9FFE0A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {STUDIO.address}
              </AddressLink>
              <PhoneLink
                location="footer_contact_info"
                className="flex items-center gap-2 text-[#DADADA]/70 hover:text-[#9FFE0A] transition-colors text-sm font-roboto"
              >
                <svg className="w-4 h-4 flex-shrink-0 text-[#9FFE0A]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {STUDIO.phone}
              </PhoneLink>
              <div className="flex items-start gap-2 text-[#DADADA]/70 text-sm font-roboto">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#9FFE0A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {STUDIO.hours}
              </div>
            </address>
          </div>

          {/* Footer Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-kanit font-semibold text-white text-sm tracking-wider uppercase mb-5">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href === 'quiz' ? (
                      <button
                        type="button"
                        onClick={openQuiz}
                        className="font-roboto text-[#DADADA]/60 hover:text-[#9FFE0A] text-sm transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-roboto text-[#DADADA]/60 hover:text-[#9FFE0A] text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#DADADA]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-roboto text-[#DADADA]/40 text-xs">
            © {new Date().getFullYear()} HAUT Flagship Studio. All rights reserved.
          </p>
          <p className="font-roboto text-[#DADADA]/40 text-xs">
            {STUDIO.address} · {STUDIO.phone}
          </p>
        </div>
      </div>
    </footer>
  )
}
