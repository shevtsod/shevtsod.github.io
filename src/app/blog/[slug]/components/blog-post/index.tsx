'use client';

import Button from '@/components/button';
import Icon from '@/components/icon';
import ScrambledText from '@/components/scrambled-text';
import type { BlogPostType } from '@/utils/blog';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export interface BlogPostProps {
  children: React.ReactNode;
  blogPost: BlogPostType;
}

/**
 * Renders the given components as a blog post.
 */
export default function BlogPost({ children, blogPost }: BlogPostProps) {
  const t = useTranslations('app.blog.[slug].components.blog-post');
  const {
    frontmatter: { title, description, author, date },
  } = blogPost;

  return (
    <article className="prose xl:prose-xl dark:prose-invert mx-auto pb-6 px-4 md:px-0 py-4">
      <div className="text-sm">
        <div className="mb-10 flex flex-col text-zinc-500">
          <h1 className="text-2xl sm:text-3xl xl:text-4xl mb-0! font-bold text-theme-red-400">
            {title}
          </h1>

          <p className="prose-xl font-bold mb-6">{description}</p>

          <span>
            {t.rich('postedBy', {
              b: (chunks) => <b>{chunks}</b>,
              author,
            })}
          </span>

          <span className="inline-flex gap-2">
            <Icon
              icon="16x/clock"
              className="w-[1em] aspect-square inline-block"
            />
            {format(date, 'PP')}
          </span>
        </div>
      </div>

      {children}

      <div className="my-4">
        <Button as={Link} href="/blog" className="font-bold">
          <ScrambledText>{t('backToBlog')}</ScrambledText>
        </Button>
      </div>
    </article>
  );
}
