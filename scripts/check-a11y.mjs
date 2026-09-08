/**
 * Keyboard accessibility smoke test — drives a real browser against a running
 * build.
 *
 * Every assertion here is one that correct-looking markup passed while the
 * behaviour was broken. The quote modal carried role="dialog", aria-modal and
 * an aria-label, so a code review saw accessibility done; meanwhile focus
 * stayed on the button behind the overlay, one Tab left the dialog entirely,
 * and Escape did nothing. Attributes are visible in a diff. Behaviour is not.
 *
 * Run: `npm run start` in one shell, then `node scripts/check-a11y.mjs`.
 * Override the target with A11Y_URL.
 */

import { chromium } from 'playwright'

const BASE = process.env.A11Y_URL ?? 'http://localhost:3000'
const failures = []
const fail = (rule, detail) => failures.push({ rule, detail })
const ok = (name) => console.log(`  ok  ${name}`)

const browser = await chromium.launch()

try {
  /* ---------------------------------------------------------------- *
   * Skip link: pages here run past 10,000px behind an identical nav.
   * ---------------------------------------------------------------- */
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(BASE, { waitUntil: 'networkidle' })

  await page.keyboard.press('Tab')
  const first = await page.evaluate(() => {
    const el = document.activeElement
    return { text: (el?.textContent ?? '').trim(), href: el?.getAttribute('href') }
  })
  if (!/skip/i.test(first.text)) {
    fail('skip-link-missing', `First tab stop is "${first.text}", expected a skip link.`)
  } else if (!first.href?.startsWith('#')) {
    fail('skip-link-target', `Skip link href is "${first.href}", expected an in-page anchor.`)
  } else {
    const target = await page.evaluate((h) => !!document.querySelector(h), first.href)
    if (!target) fail('skip-link-target', `Skip link points at ${first.href}, which does not exist.`)
    else ok('skip link is the first tab stop and resolves')
  }

  /* ---------------------------------------------------------------- *
   * Focus must be visible. The browser default is a 1px hairline that
   * all but disappears on this site's dark ground.
   * ---------------------------------------------------------------- */
  await page.keyboard.press('Tab')
  const ring = await page.evaluate(() => {
    const cs = getComputedStyle(document.activeElement)
    return { style: cs.outlineStyle, width: parseFloat(cs.outlineWidth) || 0, shadow: cs.boxShadow }
  })
  if ((ring.style === 'none' || ring.width < 2) && ring.shadow === 'none') {
    fail(
      'focus-not-visible',
      `Focused element has outline ${ring.style} ${ring.width}px and no box-shadow.`
    )
  } else ok(`focus ring is visible (${ring.style} ${ring.width}px)`)

  /* ---------------------------------------------------------------- *
   * The quote modal is the form this site books work through.
   * ---------------------------------------------------------------- */
  const trigger = page.locator('header button, header a').filter({ hasText: /Get Estimate/i }).first()
  await trigger.click()
  await page.waitForSelector('[role="dialog"]', { timeout: 5000 })

  const inside = await page.evaluate(() => {
    const el = document.activeElement
    const d = document.querySelector('[role="dialog"]')
    return !!(d && el && (d === el || d.contains(el)))
  })
  if (!inside) fail('dialog-initial-focus', 'Opening the dialog left focus outside it.')
  else ok('dialog takes focus on open')

  let escaped = false
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press('Tab')
    const still = await page.evaluate(() => {
      const el = document.activeElement
      const d = document.querySelector('[role="dialog"]')
      return !!(d && el && d.contains(el))
    })
    if (!still) {
      escaped = true
      break
    }
  }
  if (escaped) fail('dialog-focus-not-trapped', 'Tab moved focus out of the open dialog.')
  else ok('dialog traps focus across 30 tabs')

  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  if ((await page.locator('[role="dialog"]').count()) > 0) {
    fail('dialog-no-escape', 'Escape did not close the dialog.')
  } else {
    ok('dialog closes on Escape')
    const restored = await page.evaluate(() => (document.activeElement?.textContent ?? '').trim())
    if (!/get estimate/i.test(restored)) {
      fail('dialog-focus-not-restored', `After close, focus is on "${restored}", not the trigger.`)
    } else ok('focus returns to the trigger on close')
  }

  /* ---------------------------------------------------------------- *
   * Touch targets on the phone viewport.
   * ---------------------------------------------------------------- */
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await mobile.goto(BASE, { waitUntil: 'networkidle' })

  const toggle = mobile.locator('button[aria-label="Toggle menu"]')
  const box = await toggle.boundingBox()
  if (!box) fail('menu-toggle-missing', 'No mobile menu toggle found at 390px.')
  else if (box.width < 44 || box.height < 44) {
    fail('touch-target-too-small', `Menu toggle is ${Math.round(box.width)}x${Math.round(box.height)}px, minimum is 44x44.`)
  } else ok(`menu toggle is ${Math.round(box.width)}x${Math.round(box.height)}px`)

  await toggle.click()
  await mobile.waitForTimeout(300)
  await mobile.keyboard.press('Escape')
  await mobile.waitForTimeout(300)
  if ((await toggle.getAttribute('aria-expanded')) !== 'false') {
    fail('menu-no-escape', 'Escape did not close the open mobile menu.')
  } else ok('mobile menu closes on Escape')
} finally {
  await browser.close()
}

if (failures.length > 0) {
  console.error(`\nAccessibility smoke test failed — ${failures.length} problem(s):\n`)
  for (const { rule, detail } of failures) {
    console.error(`  [${rule}]`)
    console.error(`    ${detail}\n`)
  }
  process.exit(1)
}

console.log('\nAccessibility smoke test passed.')
