/**
 * SEO / structured-data contract check — runs before every build and fails it.
 *
 * Every rule here exists because the thing it checks was already broken in
 * production, and nothing in the project noticed. They share one shape: the
 * defect is invisible in a single-file diff, because it only exists in the
 * relationship between two things — markup versus rendered text, one page's
 * metadata versus another's, a sitemap versus the routes that exist.
 *
 * Reviewing a diff cannot catch that. A check can.
 *
 * Run: `node scripts/check-seo.mjs` (wired to `prebuild`).
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const failures = []
const fail = (rule, detail) => failures.push({ rule, detail })

const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null)

/** Every app/**\/page.tsx, as a route path plus its source. */
function pages(dir = 'app', route = '') {
  const out = []
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, name.name)
    if (name.isDirectory()) {
      if (name.name === 'api') continue
      // [slug] segments are dynamic; their metadata is generated per item.
      out.push(...pages(path, route + '/' + name.name))
    } else if (name.name === 'page.tsx') {
      out.push({ route: route || '/', file: path, src: readFileSync(path, 'utf8') })
    }
  }
  return out
}

const ALL = pages()
const STATIC = ALL.filter((p) => !p.route.includes('['))

/* ------------------------------------------------------------------ *
 * 1. FAQ markup only where the questions are rendered.
 *
 * The FAQPage schema used to live in the root layout, so all eight pages
 * shipped the homepage's six questions — including four pages that render no
 * FAQ at all. Google requires FAQ structured data to describe content visible
 * on the page serving it, and the penalty reaches the whole site.
 * ------------------------------------------------------------------ */
for (const page of ALL) {
  const buildsFaq = /buildFaqSchema\(\s*(\w+)\s*\)/.exec(page.src)
  const rendersFaq = /<(FAQSection|PPFFaq|CeramicFaq|TintFaq)\b/.test(page.src)

  if (buildsFaq && !rendersFaq) {
    fail(
      'faq-markup-without-content',
      `${page.file} builds FAQ markup from ${buildsFaq[1]} but renders no FAQ component. ` +
        `Structured data must describe what the visitor can read.`
    )
  }
  if (rendersFaq && !buildsFaq) {
    fail(
      'faq-content-without-markup',
      `${page.file} renders an FAQ but emits no FAQPage markup, so those questions are invisible to search.`
    )
  }
}

// The layout must not reintroduce sitewide FAQ markup.
const layout = read('app/layout.tsx') ?? ''
if (/['"]@type['"]:\s*['"]FAQPage['"]/.test(layout)) {
  fail(
    'faq-markup-in-layout',
    'app/layout.tsx emits FAQPage markup, which would ship it on every page again. ' +
      'FAQ markup belongs on the page that renders the questions.'
  )
}

/* ------------------------------------------------------------------ *
 * 2. The FAQ list a page marks up must be the list it renders.
 *
 * Marking up the right number of questions from the wrong list is the same
 * violation, and harder to spot.
 * ------------------------------------------------------------------ */
const FAQ_COMPONENT_LIST = {
  FAQSection: 'FAQ_ITEMS',
  PPFFaq: 'PPF_FAQ_ITEMS',
  CeramicFaq: 'CERAMIC_FAQ_ITEMS',
  TintFaq: 'TINT_FAQ_ITEMS',
}
for (const page of ALL) {
  const built = /buildFaqSchema\(\s*(\w+)\s*\)/.exec(page.src)
  if (!built) continue
  const rendered = Object.keys(FAQ_COMPONENT_LIST).find((c) =>
    new RegExp(`<${c}\\b`).test(page.src)
  )
  if (rendered && FAQ_COMPONENT_LIST[rendered] !== built[1]) {
    fail(
      'faq-list-mismatch',
      `${page.file} renders <${rendered}/> (${FAQ_COMPONENT_LIST[rendered]}) but marks up ${built[1]}.`
    )
  }
}

/* ------------------------------------------------------------------ *
 * 3. Every static page declares its own canonical.
 * ------------------------------------------------------------------ */
for (const page of STATIC) {
  if (page.route === '/') continue // the root canonical lives in the layout
  if (!/alternates:\s*\{[\s\S]*?canonical:/.test(page.src)) {
    fail('missing-canonical', `${page.file} declares no canonical URL.`)
  }
}

/* ------------------------------------------------------------------ *
 * 4. No two pages sell the same thing in their metadata.
 *
 * /about used to describe itself as a "paint protection film, ceramic coating,
 * and window tint installer in Hackensack" — the same promise as /, /ppf,
 * /ceramic and /window-tint. Google then had four candidates per query and
 * sometimes served /about, forty positions down. A page that is not a service
 * page may not claim the full service list plus the city.
 * ------------------------------------------------------------------ */
const SERVICE_ROUTES = new Set(['/', '/ppf', '/ceramic', '/window-tint'])
const SERVICE_WORDS = [/paint protection film|\bppf\b/i, /ceramic coating/i, /window tint/i]

for (const page of STATIC) {
  if (SERVICE_ROUTES.has(page.route)) continue
  const meta = /export const metadata[\s\S]*?\n\}/.exec(page.src)
  if (!meta) continue
  const text = meta[0]
  const hits = SERVICE_WORDS.filter((re) => re.test(text)).length
  const local = /hackensack|bergen county|new jersey|\bnj\b/i.test(text)
  if (hits === SERVICE_WORDS.length && local) {
    fail(
      'metadata-competes-with-service-pages',
      `${page.file} metadata names all three services plus the location, which is what the service ` +
        `pages target. Describe what this page uniquely covers instead.`
    )
  }
}

/* ------------------------------------------------------------------ *
 * 5. The sitemap lists routes that exist, and every static route is listed.
 * ------------------------------------------------------------------ */
const sitemap = read('app/sitemap.ts')
if (!sitemap) {
  fail('missing-sitemap', 'app/sitemap.ts does not exist.')
} else {
  const listed = [...sitemap.matchAll(/url:\s*[`'"]([^`'"]+)[`'"]/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, '').replace(/\$\{[^}]*\}/, '') || '/'
  )
  const known = new Set(STATIC.map((p) => p.route))
  for (const url of listed) {
    const clean = url.replace(/\/$/, '') || '/'
    // Blog posts come from generateStaticParams, so only check literal routes.
    if (clean.startsWith('/blog/')) continue
    if (!known.has(clean)) {
      fail('sitemap-lists-unknown-route', `app/sitemap.ts lists ${url}, which has no page.tsx.`)
    }
  }
  for (const route of known) {
    const present = listed.some((u) => (u.replace(/\/$/, '') || '/') === route)
    if (!present) fail('route-missing-from-sitemap', `${route} has a page but is not in app/sitemap.ts.`)
  }
}

/* ------------------------------------------------------------------ *
 * 6. The facts an assistant reads must come from the data the site renders.
 *
 * /llms.txt exists so a model can quote this studio's address and prices
 * without reassembling them. That is only true while it is generated.
 * ------------------------------------------------------------------ */
const llms = read('app/llms.txt/route.ts')
if (!llms) {
  fail('missing-llms-txt', 'app/llms.txt/route.ts does not exist.')
} else if (!/from '@\/lib\/(data|pricing)'/.test(llms)) {
  fail(
    'llms-txt-not-generated',
    'app/llms.txt/route.ts does not import from lib/data or lib/pricing, so its facts can drift from the site.'
  )
}

/* ------------------------------------------------------------------ *
 * 7. The published rating counts the reviews actually published.
 * ------------------------------------------------------------------ */
if (/aggregateRating/.test(layout) && !/CLIENT_REVIEWS\.length/.test(layout)) {
  fail(
    'hardcoded-review-count',
    'app/layout.tsx publishes an aggregateRating whose reviewCount is not derived from CLIENT_REVIEWS. ' +
      'A crawler must be able to count the reviews the rating claims.'
  )
}

/* ------------------------------------------------------------------ */

if (failures.length > 0) {
  console.error(`\nSEO contract check failed — ${failures.length} problem(s):\n`)
  for (const { rule, detail } of failures) {
    console.error(`  [${rule}]`)
    console.error(`    ${detail}\n`)
  }
  process.exit(1)
}

console.log(`SEO contract check passed (${ALL.length} pages).`)
