import type { MetadataRoute } from 'next'
import { BLOG_ARTICLES } from '@/lib/data'

const BASE_URL = 'https://hautppfstudio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/ppf`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/ceramic`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/window-tint`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/our-process`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/service-area`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/reviews`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = BLOG_ARTICLES.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...blogRoutes]
}
