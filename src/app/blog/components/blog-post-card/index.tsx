'use client';

import type { BlogPostType } from '@/utils/blog';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import BlogPostMetadata from '../blog-post-metadata';

export interface BlogPostCardProps
  extends Partial<ComponentProps<typeof Link>> {
  index?: number;
  blogPost: BlogPostType;
}

/**
 * Renders a clickable card that summarizes a blog post.
 */
export default function BlogPostCard({
  index = 0,
  blogPost,
  ...props
}: BlogPostCardProps) {
  const { frontmatter, slug } = blogPost;

  return (
    <Link {...props} href={`/blog/${slug}`} className="group">
      <div className="text-sm my-4 font-sans">
        <div className="flex flex-row">
          <div className="text-right flex-1 self-center text-8xl md:text-9xl italic font-pixel mr-4 text-zinc-400 dark:text-zinc-900 group-hover:text-gray-400 dark:group-hover:text-zinc-800">
            {index}
          </div>

          <div className="flex-4 flex flex-col justify-center text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
            <BlogPostMetadata
              frontmatter={frontmatter}
              showDescription={false}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
