import { PostOrPage } from '@tryghost/content-api';
import React from 'react';
 
 
export function GhostPageComponent({ page }: { page: PostOrPage }) {
  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <article className="max-w-prose mx-auto px-4 py-6">
      {page.feature_image && (
        <div className="mb-8">
          <img 
            src={page.feature_image} 
            alt={page.title} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      
      <div 
        className="ghost-content prose prose-gray"
        dangerouslySetInnerHTML={{ __html: page.html || '' }} 
      />
    </article>
  );
}
