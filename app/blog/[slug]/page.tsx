import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_ARTICLES, SERVICES_OVERVIEW, STUDIO } from '@/lib/data'
import { PhoneLink } from '@/components/TrackedLinks'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = BLOG_ARTICLES.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} | HAUT Flagship Studio`,
    description: article.metaDescription,
    alternates: {
      canonical: `https://hautppfstudio.com/blog/${slug}`,
    },
  }
}

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = BLOG_ARTICLES.find((a) => a.slug === slug)
  if (!article) notFound()

  // Send readers (and link equity) to the service page this article is about,
  // rather than pointing every post at PPF packages.
  const articleService = SERVICES_OVERVIEW.find((s) => s.id === article.service)!

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: 'HAUT Flagship Studio',
      url: 'https://hautppfstudio.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HAUT Flagship Studio',
      url: 'https://hautppfstudio.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="bg-[#1A292E] min-h-screen precision-grid pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back */}
          <Link
            href="/blog"
            className="text-[#9FFE0A] font-roboto text-sm hover:underline mb-8 inline-flex items-center gap-1"
          >
            ← All Articles
          </Link>

          {/* Meta */}
          <div className="mt-6 mb-4">
            <span className="inline-block bg-[#9FFE0A] text-[#1A292E] font-roboto text-xs font-semibold tracking-wider uppercase px-2.5 py-1">
              {article.category}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-kanit font-bold text-white text-3xl sm:text-4xl leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-[#DADADA]/50 font-roboto text-sm mb-8 border-b border-[#DADADA]/10 pb-8">
            <span>HAUT Flagship Studio</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          {/* Article content */}
          <article className="prose-haut space-y-6">
            {article.content.map((paragraph, i) => (
              <p key={i} className="font-roboto text-[#DADADA]/80 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </article>

          {/* CTA */}
          <div className="card-folded mt-16 bg-[#1A292E]/90 backdrop-blur border border-[#9FFE0A]/30 p-8">
            <h3 className="font-kanit font-bold text-white text-2xl mb-2">
              Ready to get started?
            </h3>
            <p className="font-roboto text-[#DADADA]/70 text-sm mb-6">
              HAUT Flagship Studio is at {STUDIO.address}. Same-week consultations available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <PhoneLink
                location="blog_post_cta"
                className="btn-green px-6 py-3 text-sm text-center rounded-none"
              >
                Call {STUDIO.phone}
              </PhoneLink>
              <Link
                href={articleService.href}
                className="btn-outline px-6 py-3 text-sm text-center rounded-none"
              >
                View {articleService.name} Packages →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
