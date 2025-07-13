import useTitle from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';
import BlogPostCard from '../components/BlogPostCard/BlogPostCard';
import { blogPosts } from '../utils/blogPosts';

export default function BlogRoute() {
  const { t } = useTranslation('app', {
    keyPrefix: 'features.blog.routes.BlogRoute',
  });
  useTitle(t('title'));

  return (
    <ul className="max-w-3xl mx-auto">
      {blogPosts.map((blogPost, i) => (
        <li key={i} className="not-last:border-b border-zinc-900 mb-4">
          <BlogPostCard index={i} blogPost={blogPost} />
        </li>
      ))}
    </ul>
  );
}
