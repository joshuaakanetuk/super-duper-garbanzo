import { getPosts } from '@/lib/ghost'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://computeforhumans.com'

export const revalidate = 3600

export async function GET() {
  let posts: any[] = []
  try {
    posts = (await getPosts()) as any[]
  } catch {
    posts = []
  }

  const postLines = posts
    .filter((p: any) => p?.slug)
    .map((p: any) => {
      const excerpt = (p.custom_excerpt || p.excerpt || '')
        .replace(/\s+/g, ' ')
        .trim()
      const url = `${BASE_URL}/blog/${p.slug}`
      return excerpt
        ? `- [${p.title}](${url}): ${excerpt}`
        : `- [${p.title}](${url})`
    })

  const body = `# Compute for Humans

> Privacy tips, self-hosting guides, and homelab tutorials. Learn to take control of your digital life with open-source software.

The clean Markdown version of any post is available by appending \`/raw\` to its URL
(e.g. ${BASE_URL}/blog/example-slug/raw).

## Posts

${postLines.join('\n')}

## More

- [Blog index](${BASE_URL}/blog)
- [Consulting](${BASE_URL}/consulting)
- [RSS feed](${BASE_URL}/feed.xml)
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
