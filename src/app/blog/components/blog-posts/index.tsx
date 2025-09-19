import { BlogPostType } from '@/utils/blog';
import BlogPostCard from '../blog-post-card';

export interface BlogPostsProps {
  blogPosts: BlogPostType[];
}

/**
 * Renders a list of {@link BlogPostCard}s.
 */
export default function BlogPosts({ blogPosts }: BlogPostsProps) {
  return (
    <ul className="container max-w-3xl mx-auto px-2 mt-6 mb-24">
      {blogPosts.map((blogPost, i) => (
        <li
          key={blogPosts.length - i - 1}
          className="not-last:border-b border-zinc-900"
        >
          <BlogPostCard index={blogPosts.length - i - 1} blogPost={blogPost} />
        </li>
      ))}
    </ul>
  );
}
