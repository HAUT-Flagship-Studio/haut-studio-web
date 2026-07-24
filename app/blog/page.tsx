import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_ARTICLES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'PPF & Ceramic Coating Guides | HAUT Flagship Studio Blog',
  description:
    'Process-driven articles on Paint Protection Film, ceramic coatings, and vehicle detailing — written by the technicians at HAUT Flagship Studio in Hackensack, NJ.',
  alternates: {
    canonical: 'https://hautppfstudio.com/blog',
  },
}

export default function BlogPage() {
  return (
    <main className="bg-[#1A292E] min-h-screen precision-grid pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="text-[#9FFE0A] font-roboto text-sm hover:underline mb-6 inline-flex items-center gap-1"
          >
            ← Back to Studio
          </Link>
          <h1 className="font-kanit font-bold text-white text-5xl lg:text-6xl mt-4 mb-4">
            Process Over
            <br />
            <span className="text-[#9FFE0A]">Marketing</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#9FFE0A] mb-6" />
          <p className="font-roboto text-[#DADADA]/70 max-w-xl">
            Technical guides, maintenance advice, and honest breakdowns of what PPF and ceramic
            coating actually do — written by our technicians.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="card-folded flex flex-col bg-[#1A292E]/90 backdrop-blur border border-slate-800 hover:border-[#9FFE0A]/40 transition-all duration-300 group"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                  unoptimized
                />
                <div className="absolute top-4 left-4 bg-[#9FFE0A] px-2.5 py-1">
                  <span className="font-roboto text-[#1A292E] text-xs font-semibold tracking-wider uppercase">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 mb-3 text-xs font-roboto text-[#DADADA]/50">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="font-kanit font-bold text-white text-lg leading-tight mb-3 group-hover:text-[#9FFE0A] transition-colors">
                  {article.title}
                </h2>
                <p className="font-roboto text-[#DADADA]/70 text-sm leading-relaxed flex-1 mb-5">
                  {article.excerpt}
                </p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-[#9FFE0A] font-roboto text-sm hover:gap-3 transition-all"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
