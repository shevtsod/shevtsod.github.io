import useTitle from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import BlogPost from '../components/BlogPost/BlogPost';
import { blogPosts } from '../utils/blogPosts';

export default function BlogPostRoute() {
  const { t } = useTranslation('app', {
    keyPrefix: 'features.blog.routes.BlogPostRoute',
  });
  const { path } = useParams();
  const blogPost = blogPosts.find((el) => el.path === path);

  if (!blogPost) {
    throw new Error('Blog post not found!');
  }

  const { frontmatter } = blogPost;
  const { title } = frontmatter;

  useTitle(title ?? t('title'));

  return <BlogPost blogPost={blogPost} />;
}
