import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/ghost';
import { GhostPageComponent } from '@/components/ghost-page';
import { PostOrPage } from '@tryghost/content-api';

interface PageParams {
  params: {
    slug: string;
  };
}
export const revalidate = 60;

// Generate metadata for the page
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPostBySlug(slug);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }
  
  return {
    title: page.meta_title || page.title,
    description: page.meta_description || page.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: page.og_title || page.title,
      description: page.og_description || page.excerpt,
      type: 'article',
      publishedTime: page.published_at || undefined,
      modifiedTime: page.updated_at || undefined,
      images: page.og_image ? [{ url: page.og_image }] : page.feature_image ? [{ url: page.feature_image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.twitter_title || page.title,
      description: page.twitter_description || page.excerpt,
      images: page.twitter_image ? [page.twitter_image] : page.feature_image ? [{ url: page.feature_image }] : undefined,
    },
  };
}

// Generate static paths for all pages
export async function generateStaticParams() {
  const pages = await getPosts();
  
  return pages.map((page: PostOrPage) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const page = await getPostBySlug(slug);
  
  if (!page) {
    notFound();
  }
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: page.title,
    description: page.meta_description || page.excerpt,
    image: page.feature_image || undefined,
    datePublished: page.published_at || undefined,
    dateModified: page.updated_at || undefined,
    url: `https://computeforhumans.com/blog/${slug}`,
    author: {
      "@type": "Person",
      name: page.primary_author?.name || "Compute for Humans",
    },
    publisher: {
      "@type": "Organization",
      name: "Compute for Humans",
      url: "https://computeforhumans.com",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <GhostPageComponent page={page} />
      </main>
    </div>
  );
}
