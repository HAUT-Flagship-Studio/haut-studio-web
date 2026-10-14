'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureAttribution } from '@/lib/attribution'
import {
  flushServerEvents,
  pageTypeOf,
  resetPageOnce,
  serviceOfPage,
  track,
  trackAddressClick,
  trackContact,
} from '@/lib/analytics'

/**
 * Everything the site reports to Meta that is not part of a form: page views,
 * scrolling, time on page, sections, FAQ, video, and every click on a link or
 * button. One listener per kind on the document, rather than code in each
 * component — new links and sections are tracked by their markup alone:
 *
 *   data-track-section="faq"     a section worth knowing was seen (SectionViewed)
 *   data-track-location="hero"   where the CTAs inside it sit (hero/sticky/section/footer)
 *   data-cta="…"                 a button that counts as a CTA without the btn-* class
 *   data-video-id="…"            a <video>'s name in VideoPlay/VideoProgress
 *
 * Specified by the marketers on 2026-10-14. Everything here is passive and
 * deferred: listeners never block a click or a scroll, and the Pixel itself
 * sends asynchronously.
 */

const SERVICE_TITLE = { ppf: 'Paint Protection Film', ceramic: 'Ceramic Coating', tint: 'Window Tint' } as const
const ENGAGED_MARKS = [30, 60, 120]
const SCROLL_MARKS = [50, 90]
const IDLE_AFTER_MS = 30_000
const VIDEO_MARKS = [25, 50, 75, 100]

function text(el: Element, max = 100) {
  return (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, max)
}

/** hero, sticky (the fixed header), footer, or any other section. */
function ctaLocation(el: Element) {
  const marked = el.closest('[data-track-location]')?.getAttribute('data-track-location')
  if (marked) return marked
  if (el.closest('header')) return 'sticky'
  if (el.closest('footer')) return 'footer'
  return 'section'
}

function onClick(e: MouseEvent) {
  const target = e.target as Element | null
  if (!target?.closest) return
  const el = target.closest('a, button')
  if (!el) return
  // The calculator and the assessment report their own steps.
  const inDialog = !!el.closest('[role="dialog"]')
  const location = ctaLocation(el)

  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute('href') || ''
    if (href.startsWith('tel:')) return trackContact('phone', location)
    if (href.startsWith('sms:')) return trackContact('sms', location)
    if (href.startsWith('mailto:')) return trackContact('email', location)

    let url: URL
    try {
      url = new URL(el.href)
    } catch {
      return
    }
    const external = url.origin !== window.location.origin
    const host = url.hostname.replace(/^www\./, '')
    const isMaps =
      host === 'maps.app.goo.gl' || host === 'maps.google.com' || (/^google\./.test(host) && url.pathname.startsWith('/maps'))

    if (/\/reviews$/.test(url.pathname) && !external) track('ReviewsClick', { destination: 'site', location })
    if (external && /google\./.test(host) && /review/i.test(url.href)) track('ReviewsClick', { destination: 'google', location })

    if (isMaps) {
      trackAddressClick(location, /direction/i.test(text(el)) || /directions/.test(location))
    } else if (external) {
      track('OutboundClick', { destination: host, location })
    }
    if (!external && el.closest('header, footer')) {
      if (!el.matches('.btn-green, .btn-outline')) track('NavClick', { target: url.pathname, location })
    }
  }

  // FAQ: a question opened (aria-expanded flips after this listener runs).
  if (el instanceof HTMLButtonElement && el.closest('[data-track-section="faq"]') && el.getAttribute('aria-expanded') === 'false') {
    // The button holds the question and a +/− marker; the marker is dropped.
    return track('FAQExpand', { question: text(el, 150).replace(/[\s+−–-]+$/, '') })
  }

  if (!inDialog && (el.matches('.btn-green, .btn-outline, [data-cta]'))) {
    const href = el instanceof HTMLAnchorElement ? el.getAttribute('href') || '' : ''
    if (/^(tel|sms|mailto):/.test(href)) return
    track('CTAClick', { cta_id: el.getAttribute('data-cta') || el.id || text(el, 60), location })
  }
}

/** Video: play, then 25/50/75/100% of it watched — once per video per page. */
function videoId(v: HTMLVideoElement) {
  return v.dataset.videoId || (v.currentSrc || v.src).split('/').pop()?.split('?')[0] || 'video'
}
function onPlay(e: Event) {
  if (!(e.target instanceof HTMLVideoElement)) return
  track('VideoPlay', { video_id: videoId(e.target) }, { once: videoId(e.target) })
}
function onTimeUpdate(e: Event) {
  const v = e.target
  if (!(v instanceof HTMLVideoElement) || !v.duration) return
  const pct = (v.currentTime / v.duration) * 100
  for (const mark of VIDEO_MARKS) {
    if (pct >= mark - (mark === 100 ? 1 : 0)) track(`VideoProgress${mark}`, { video_id: videoId(v) }, { once: videoId(v) })
  }
}

export default function SiteTracking() {
  const pathname = usePathname()

  // Document-wide listeners: set once for the life of the tab.
  useEffect(() => {
    document.addEventListener('click', onClick, { capture: true, passive: true })
    // media events do not bubble; a capturing listener still sees them.
    document.addEventListener('play', onPlay, true)
    document.addEventListener('timeupdate', onTimeUpdate, true)
    const onHide = () => document.visibilityState === 'hidden' && flushServerEvents()
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flushServerEvents)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('play', onPlay, true)
      document.removeEventListener('timeupdate', onTimeUpdate, true)
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flushServerEvents)
    }
  }, [])

  // Per page, client-side navigations included.
  useEffect(() => {
    captureAttribution()
    resetPageOnce()

    const pageType = pageTypeOf(pathname)
    const service = serviceOfPage(pathname, window.location.search)
    track('PageView', {}, { standard: true, capi: true })
    if (pageType === 'ppf' || pageType === 'ceramic' || pageType === 'tint') {
      track('ViewContent', { content_name: SERVICE_TITLE[pageType], service }, { standard: true, capi: true })
    }
    // One page covers every town; ?town= is there for ads that name one.
    if (pageType === 'location') {
      track('LocationPageView', { town: new URLSearchParams(window.location.search).get('town') || 'all' })
    }
    if (pageType === 'process') track('ProcessViewed')

    // Scroll depth.
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const doc = document.documentElement
        const pct = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100
        for (const mark of SCROLL_MARKS) if (pct >= mark) track(`ScrollDepth${mark}`, {}, { once: 'page' })
      })
    }
    // Armed a moment late: right after a client-side navigation the browser
    // still reports the previous page's scroll position.
    const armScroll = window.setTimeout(() => window.addEventListener('scroll', onScroll, { passive: true }), 800)

    // Active time: the tab is visible and the visitor did something in the last 30 s.
    let activeSeconds = 0
    let lastActivity = Date.now()
    const markActive = () => {
      lastActivity = Date.now()
    }
    const activity = ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'] as const
    activity.forEach((t) => window.addEventListener(t, markActive, { passive: true }))
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible' || Date.now() - lastActivity > IDLE_AFTER_MS) return
      activeSeconds++
      for (const mark of ENGAGED_MARKS) if (activeSeconds === mark) track(`Engaged${mark}s`, {}, { once: 'page' })
      if (activeSeconds >= ENGAGED_MARKS[ENGAGED_MARKS.length - 1]) window.clearInterval(timer)
    }, 1000)

    // Sections on screen: the top of one has risen past 65% of the viewport
    // height — works the same for a short banner and a FAQ three screens long.
    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue
                const section = (entry.target as HTMLElement).dataset.trackSection
                if (section) track('SectionViewed', { section }, { once: section })
                observer?.unobserve(entry.target)
              }
            },
            { rootMargin: '0px 0px -35% 0px', threshold: 0 }
          )
        : null
    document.querySelectorAll('[data-track-section]').forEach((el) => observer?.observe(el))

    return () => {
      window.clearTimeout(armScroll)
      window.removeEventListener('scroll', onScroll)
      activity.forEach((t) => window.removeEventListener(t, markActive))
      window.clearInterval(timer)
      observer?.disconnect()
    }
  }, [pathname])

  return null
}
