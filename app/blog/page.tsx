import Link from 'next/link';
import { Metadata } from 'next';
import { getPosts } from '@/lib/ghost';
import { PostOrPage } from '@tryghost/content-api';

export const metadata: Metadata = {
  title: 'Compute for Humans',
  description: 'Browse all pages from our Ghost CMS',
};

export default async function PostsIndex() {
  const pages = await getPosts();
  
  return (
    <div className="fill-available bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <main className="max-w-prose mx-auto px-4 py-6">
        {pages.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          <div>
            {pages.map((page: PostOrPage) => (
              <article key={page.id} className="pb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link 
                    href={`/blog/${page.slug}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {page.title}
                  </Link>
                </h2>
                
                {page.excerpt && (
                  <p className="text-gray-600 mb-4">{page.excerpt}</p>
                )}
                
                <div className="flex items-center text-sm text-gray-500">
                  <span>
                    Published: {page.published_at ? new Date(page.published_at).toLocaleDateString() : 'Unknown date'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
