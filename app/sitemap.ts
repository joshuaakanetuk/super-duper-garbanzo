import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/ghost'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/consulting`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  let posts: any[] = []
  try {
    posts = (await getPosts()) as any[]
  } catch {
    posts = []
  }

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p: any) => p?.slug)
    .map((post: any) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  return [...staticRoutes, ...postRoutes]
}