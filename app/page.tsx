import { getPosts } from '@/lib/ghost';
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
          <p className="text-xl text-gray-600">An hand-me-down guide to digital independence and tech exploration.</p>
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
                          <img 
                            src={post.feature_image} 
                            alt={post.title} 
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
        
        <div className="mt-4">
        <form
          method="post"
          action="https://list.computeforhumans.com/subscription/form"
          className="listmonk-form w-full max-w-prose mx-auto space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Subscribe to newsletter</label>
            <div className="mt-2 flex">
              <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
                <input 
                  id="email" 
                  type="email" 
                  name="email" 
                  required
                  placeholder="john@example.com" 
                  className="col-start-1 row-start-1 block w-full rounded-l-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6" 
                />
                <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4">
                  <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z" />
                </svg>
              </div>
              <input
                type="submit"
                value="Subscribe"
                className="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 border-l hover:bg-gray-50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <input type="hidden" name="nonce" />
          <input type="hidden" name="l" value="0b4cda7c-c534-45a0-831e-b66b9942ca44" />
        </form>
        </div>
      </main>
    </div>
  )
}
