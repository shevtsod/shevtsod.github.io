import { blogPosts } from '@/utils/blog';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BlogPosts from './components/blog-posts';

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('app.blog.page');

  return {
    title: t('title'),
  };
}

/**
 * Show a listing of blog posts
 */
export default function BlogPage() {
  return (
    <section>
      <BlogPosts blogPosts={blogPosts} />
    </section>
  );
}
