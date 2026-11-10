import { getPosts } from '@/lib/ghost';
import Image from 'next/image';
import Link from 'next/link';
import { PostOrPage } from '@tryghost/content-api';

export default async function Home() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 2);
  
  return (
    <div className="fill-available bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <main className="max-w-prose mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy tips, self-hosting, homelabbing and more!</h1>
          <p className="text-xl text-gray-600">A hand-me-down guide to digital independence and tech exploration.</p>
        </div>

        <div className="w-full mb-8">
          {latestPosts.length === 0 ? (
            <p className="text-gray-500 text-center">No posts available.</p>
          ) : (
            <div className="space-y-6">
              {latestPosts.map((post: PostOrPage) => (
                <article key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    {post.feature_image && (
                      <div className="sm:w-1/3 mb-4 sm:mb-0 flex-shrink-0">
                        <Link href={`/blog/${post.slug}`}>
                          <Image
                            src={post.feature_image}
                            alt={post.title || "Blog post image"}
                            width={400}
                            height={225}
                            className="w-full h-auto object-cover rounded-md shadow-sm aspect-video"
                          />
                        </Link>
                      </div>
                    )}
                    
                    <div className={post.feature_image ? "sm:w-2/3" : "w-full"}>
                      <h3 className="text-xl font-medium mb-2">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <span>
                          Published: {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Unknown date'}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
              
              <div className="text-center mt-4">
                <Link 
                  href="/blog" 
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                >
                  View all posts →
                </Link>
              </div>
            </div>
          )}
        </div>
        
      </main>
    </div>
  )
}
