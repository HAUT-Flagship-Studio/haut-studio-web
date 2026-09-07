import type { FAQItem } from './data'

/**
 * FAQ structured data has to describe questions the visitor can actually read
 * on the page it is served from — Google treats markup for content that is not
 * there as a violation, and the penalty lands on the whole site's rich results.
 *
 * This used to live in the root layout, which meant every page shipped the
 * homepage's six questions, including /about, /reviews and /blog, where none of
 * them appear. Each page now builds its own from the list it renders.
 */
export function buildFaqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
