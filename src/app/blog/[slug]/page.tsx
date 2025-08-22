import { blogPosts } from '@/utils/blog';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import BlogPost from './components/blog-post';

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export function generateStaticParams() {
  return blogPosts;
}

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const t = await getTranslations('app.blog.[slug].page');
  const { slug } = await params;
  const blogPost = blogPosts.find((post) => post.slug === slug);

  return {
    title: blogPost?.frontmatter.title ?? t('title'),
    description: blogPost?.frontmatter.description,
  };
}

export interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Renders a blog post.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogPostIndex = blogPosts.findIndex((post) => post.slug === slug);
  const prevBlogPost = blogPosts[blogPostIndex - 1];
  const blogPost = blogPosts[blogPostIndex];
  const nextBlogPost = blogPosts[blogPostIndex + 1];

  if (!blogPost) {
    notFound();
  }

  const { filename } = blogPost;
  const { default: Component, tableOfContents } = await import(
    `../../../content/blog/${filename}`
  );

  return (
    <BlogPost
      blogPost={blogPost}
      tableOfContents={tableOfContents}
      prevBlogPost={prevBlogPost}
      nextBlogPost={nextBlogPost}
    >
      <Component />
    </BlogPost>
  );
}
