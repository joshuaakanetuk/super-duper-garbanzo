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
    openGraph: {
      title: page.og_title || page.title,
      description: page.og_description || page.excerpt,
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <main>
        <GhostPageComponent page={page} />
      </main>
    </div>
  );
}
