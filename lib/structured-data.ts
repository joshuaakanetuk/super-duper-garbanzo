import { PostOrPage } from '@tryghost/content-api';

const SITE_URL = 'https://computeforhumans.com';

interface HowToStep {
  name: string;
  text: string;
}

function decodeEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Pull ordered steps out of a post's HTML. Prefers <h2>/<h3> headings (each
 * heading is a step, with the following text as its body); falls back to the
 * items of the first ordered list.
 */
export function extractHowToSteps(html: string | null | undefined): HowToStep[] {
  if (!html) return [];

  const steps: HowToStep[] = [];

  // 1) Heading-based steps: <h2>Step name</h2> ...body until next heading
  const headingRegex = /<h[23][^>]*>([\s\S]*?)<\/h[23]>([\s\S]*?)(?=<h[23][^>]*>|$)/gi;
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(html)) !== null) {
    const name = stripTags(match[1]);
    const text = stripTags(match[2]);
    if (name) {
      steps.push({ name, text: text || name });
    }
  }
  if (steps.length > 0) return steps;

  // 2) Fallback: items of the first ordered list
  const olMatch = html.match(/<ol[^>]*>([\s\S]*?)<\/ol>/i);
  if (olMatch) {
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let li: RegExpExecArray | null;
    let i = 1;
    while ((li = liRegex.exec(olMatch[1])) !== null) {
      const text = stripTags(li[1]);
      if (text) {
        steps.push({ name: `Step ${i++}`, text });
      }
    }
  }

  return steps;
}

export function isHowToPost(page: PostOrPage): boolean {
  const taggedHowTo = page.tags?.some(
    (tag) => tag.slug === 'howto' || tag.slug === 'how-to' || tag.slug === 'tutorial'
  );
  const titledHowTo = /^how to\b/i.test(page.title ?? '');
  return Boolean(taggedHowTo || titledHowTo);
}

/**
 * Build the JSON-LD for a post: a HowTo when the post is a how-to guide with
 * extractable steps, otherwise the default BlogPosting.
 */
export function buildPostJsonLd(page: PostOrPage, slug: string) {
  const url = `${SITE_URL}/blog/${slug}`;
  const description = page.meta_description || page.excerpt || undefined;

  if (isHowToPost(page)) {
    const steps = extractHowToSteps(page.html);
    if (steps.length > 0) {
      return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: page.title,
        description,
        image: page.feature_image || undefined,
        datePublished: page.published_at || undefined,
        dateModified: page.updated_at || undefined,
        url,
        step: steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${url}#step-${i + 1}`,
        })),
      };
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.title,
    description,
    image: page.feature_image || undefined,
    datePublished: page.published_at || undefined,
    dateModified: page.updated_at || undefined,
    url,
    author: {
      '@type': 'Person',
      name: page.primary_author?.name || 'Compute for Humans',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Compute for Humans',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}
