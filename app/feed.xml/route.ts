import { getPosts } from '@/lib/ghost'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://computeforhumans.com'
const SITE_TITLE = 'Compute for Humans'
const SITE_DESCRIPTION =
  'Privacy tips, self-hosting guides, and homelab tutorials. Learn to take control of your digital life with open-source software.'

export const revalidate = 3600

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  let posts: any[] = []
  try {
    posts = (await getPosts()) as any[]
  } catch {
    posts = []
  }

  const published = posts.filter((p: any) => p?.slug && p?.published_at)
  const lastBuild = published[0]?.updated_at || published[0]?.published_at || new Date().toISOString()

  const items = published
    .map((p: any) => {
      const url = `${BASE_URL}/blog/${p.slug}`
      const excerpt = (p.custom_excerpt || p.excerpt || '').replace(/\s+/g, ' ').trim()
      const html = p.html || excerpt
      const categories = (p.tags ?? [])
        .map((t: any) => t?.name)
        .filter(Boolean)
        .map((name: string) => `      <category>${escapeXml(name)}</category>`)
        .join('\n')

      return `    <item>
      <title>${escapeXml(p.title ?? '')}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
${p.primary_author?.name ? `      <dc:creator>${escapeXml(p.primary_author.name)}</dc:creator>\n` : ''}${categories ? categories + '\n' : ''}      <description>${escapeXml(excerpt)}</description>
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
