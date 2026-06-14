import { getPostBySlug } from '@/lib/ghost'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://computeforhumans.com'

export const revalidate = 60

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(_req: Request, { params }: RouteParams) {
  const { slug } = await params
  const post = (await getPostBySlug(slug)) as any

  if (!post) {
    return new Response('Not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const tags = (post.tags ?? [])
    .map((t: any) => t?.name)
    .filter(Boolean)
    .join(', ')

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(post.title ?? '')}`,
    post.published_at ? `date: ${post.published_at}` : null,
    post.updated_at ? `updated: ${post.updated_at}` : null,
    post.primary_author?.name ? `author: ${JSON.stringify(post.primary_author.name)}` : null,
    tags ? `tags: ${JSON.stringify(tags)}` : null,
    `canonical: ${BASE_URL}/blog/${slug}`,
    '---',
  ]
    .filter(Boolean)
    .join('\n')

  const excerpt = post.custom_excerpt || post.excerpt || ''
  const content = post.plaintext || post.excerpt || ''

  const body = `${frontmatter}

# ${post.title ?? ''}

${excerpt ? `> ${excerpt.replace(/\s+/g, ' ').trim()}\n\n` : ''}${content}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
    },
  })
}
