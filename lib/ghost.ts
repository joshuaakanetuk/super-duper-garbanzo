import GhostContentAPI from '@tryghost/content-api';

// Initialize the Ghost Content API client
const api = GhostContentAPI({
  url: process.env.GHOST_API_URL || 'https://your-ghost-blog.com',
  key: process.env.GHOST_CONTENT_API_KEY || '',
  version: 'v5.0'
});

// Get all posts
export async function getPosts() {
  return await api.posts
    .browse({
      limit: 'all',
      include: ['tags', 'authors'],
      filter: 'tag:compute',
    })
    .catch(err => {
      console.error(err);
      return [];
    });
}

// Get a single post by slug
export async function getPostBySlug(slug: string) {
  return await api.posts
    .read({
      slug,
    })
    .catch(err => {
      console.error(err);
      return null;
    });
}

// Get all tags
export async function getTags() {
  return await api.tags
    .browse({
      limit: 'all',
    })
    .catch(err => {
      console.error(err);
      return [];
    });
}

// Get posts by tag
export async function getPostsByTag(tag: string) {
  return await api.posts
    .browse({
      filter: `tag:${tag}`,
      include: ['tags', 'authors'],
    })
    .catch(err => {
      console.error(err);
      return [];
    });
}
