import useTitle from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';
import BlogPostCard from '../components/BlogPostCard/BlogPostCard';
import {
  blogPosts as allBlogPosts,
  type BlogPostType,
} from '../utils/blogPosts';

export interface BlogRouteProps {
  blogPosts?: BlogPostType[];
}

export default function BlogRoute({
  // Load all blog posts by default if not specified
  blogPosts = allBlogPosts,
}: BlogRouteProps) {
  const { t } = useTranslation('app', {
    keyPrefix: 'features.blog.routes.BlogRoute',
  });
  useTitle(t('title'));

  return (
    <ul className="max-w-3xl mx-auto">
      {blogPosts.map((blogPost, i) => (
        <li
          key={blogPosts.length - i - 1}
          className="not-last:border-b border-zinc-900 mb-4"
        >
          <BlogPostCard index={blogPosts.length - i - 1} blogPost={blogPost} />
        </li>
      ))}
    </ul>
  );
}
