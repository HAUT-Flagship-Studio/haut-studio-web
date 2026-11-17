/**
 * Search/AI-visibility check on the BUILT pages — runs after every build and fails it.
 *
 * check-seo.mjs reads source before the build; it cannot see a title that is
 * assembled from a template plus data, which is exactly how every over-length
 * title on this site was written (`${article.title} | HAUT Flagship Studio`
 * reached 145 characters). This reads the prerendered HTML Next.js produced,
 * so it checks what Google and the AI crawlers actually receive.
 *
 * For every URL in the sitemap:
 *   - a prerendered page exists, with no noindex
 *   - the canonical is the URL itself
 *   - exactly one <h1>
 *   - <title> at most 65 characters (search results cut it off beyond that)
 *   - meta description 70–160 characters
 *   - the URL is linked from /llms.txt
 * and for every article: Article markup whose author is the founder's @id.
 *
 * Run: `node scripts/check-meta.mjs` (wired to `postbuild`).
 */

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SITE = 'https://hautppfstudio.com'
const OUT = '.next/server/app'
const FOUNDER_ID = 'https://haut-usa.com/about-us/vadim-nedelenko#person'

const failures = []
const fail = (url, detail) => failures.push(`${url}: ${detail}`)

const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null)
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const sitemap = read(join(OUT, 'sitemap.xml.body'))
const llms = read(join(OUT, 'llms.txt.body'))
if (!sitemap || !llms) {
  console.error('check-meta: run after `next build` — sitemap.xml or llms.txt was not prerendered.')
  process.exit(1)
}

const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])

for (const url of urls) {
  const path = url.replace(SITE, '').replace(/\/$/, '')
  const html = read(join(OUT, (path || '/index') + '.html'))
  if (!html) {
    fail(url, 'in the sitemap but no prerendered page')
    continue
  }
  // Only the document head carries the page's own metadata.
  const head = html.slice(0, html.indexOf('</head>'))

  const title = decode(/<title>(.*?)<\/title>/s.exec(head)?.[1] ?? '')
  const desc = decode(/<meta name="description" content="(.*?)"/.exec(head)?.[1] ?? '')
  const canonical = /<link rel="canonical" href="(.*?)"/.exec(head)?.[1]
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length

  if (/<meta name="robots" content="[^"]*noindex/.test(head)) fail(url, 'noindex')
  if (canonical?.replace(/\/$/, '') !== url.replace(/\/$/, '')) fail(url, `canonical is ${canonical}`)
  if (h1s !== 1) fail(url, `${h1s} <h1> elements`)
  if (title.length > 65) fail(url, `title is ${title.length} chars (max 65): "${title}"`)
  if (desc.length < 70 || desc.length > 160)
    fail(url, `description is ${desc.length} chars (70–160): "${desc}"`)

  const listed = path === '' ? llms.includes(SITE) : llms.includes(`${SITE}${path})`) || llms.includes(`${SITE}${path}\n`)
  if (!listed) fail(url, 'not linked from /llms.txt')

  if (path.startsWith('/blog/')) {
    if (!html.includes('"@type":"Article"')) fail(url, 'no Article markup')
    if (!html.includes(`"@id":"${FOUNDER_ID}"`)) fail(url, `Article author is not ${FOUNDER_ID}`)
  }
}

if (failures.length) {
  console.error(`\ncheck-meta: ${failures.length} problem(s) in the built pages\n`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  console.error('')
  process.exit(1)
}
console.log(`check-meta: ${urls.length} sitemap URLs pass (title, description, canonical, H1, llms.txt).`)
