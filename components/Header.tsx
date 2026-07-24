'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useQuiz } from './QuizProvider'
import { STUDIO } from '@/lib/data'

const NAV_LINKS = [
  { href: '/ppf', label: 'PPF' },
  { href: '/our-process', label: 'Our Process' },
  { href: '/ceramic', label: 'Ceramic' },
  { href: '/window-tint', label: 'Window Tint' },
  { href: '/blog', label: 'Blog' },
  { href: '/reviews', label: 'Reviews' },
]

export default function Header() {
  const { openQuiz } = useQuiz()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1A292E]/95 backdrop-blur-md border-b border-[#DADADA]/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-x-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="HAUT Flagship Studio Home">
          <Image
            src="/assets/logo.png"
            alt="HAUT"
            width={1699}
            height={500}
            priority
            className="h-9 w-auto group-hover:scale-105 transition-transform duration-200"
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

        {/* Desktop Navigation — centered between logo and CTAs */}
        <nav className="hidden xl:flex items-center gap-x-6 2xl:gap-x-8 flex-1 justify-center min-w-0" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-roboto font-medium tracking-wide transition-colors duration-200 relative group whitespace-nowrap ${
                pathname === link.href ? 'text-[#9FFE0A]' : 'text-[#DADADA] hover:text-[#9FFE0A]'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-[#9FFE0A] transition-all duration-250 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden xl:flex items-center gap-x-3 flex-shrink-0">
          <a
            href={STUDIO.phoneHref}
            className="btn-green px-5 py-2.5 text-sm rounded-none font-kanit font-700 tracking-wide whitespace-nowrap"
            aria-label="Call HAUT Flagship Studio"
          >
            ☎ {STUDIO.phone}
          </a>
          <button
            onClick={openQuiz}
            className="btn-outline px-5 py-2.5 text-sm rounded-none whitespace-nowrap"
            aria-label="Get your custom estimate"
          >
            Get Estimate
          </button>
        </div>

        {/* Mobile / tablet hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="xl:hidden flex flex-col gap-1.5 p-2 flex-shrink-0"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-[#9FFE0A] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#9FFE0A] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#9FFE0A] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile / tablet Menu */}
      <div
        className={`xl:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="bg-[#1A292E] border-t border-[#DADADA]/10 px-4 py-4 flex flex-col gap-4"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-roboto text-sm py-1 border-b border-[#DADADA]/10 transition-colors ${
                pathname === link.href ? 'text-[#9FFE0A]' : 'text-[#DADADA] hover:text-[#9FFE0A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={STUDIO.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#DADADA] text-xs hover:text-[#9FFE0A] transition-colors pb-1"
            aria-label="Studio location"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-roboto">{STUDIO.address}</span>
          </a>
          <a
            href={STUDIO.phoneHref}
            className="btn-green px-4 py-3 text-sm text-center rounded-none"
          >
            ☎ {STUDIO.phone}
          </a>
          <button
            onClick={() => { setMenuOpen(false); openQuiz() }}
            className="btn-outline px-4 py-3 text-sm rounded-none"
          >
            Get Estimate
          </button>
        </nav>
      </div>
    </header>
  )
}
