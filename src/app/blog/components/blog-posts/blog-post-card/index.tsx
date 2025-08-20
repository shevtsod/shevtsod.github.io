'use client';

import Icon from '@/components/icon';
import ScrambledText from '@/components/scrambled-text';
import type { BlogPostType } from '@/utils/blog';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { ComponentProps } from 'react';

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
  const t = useTranslations('app.blog.components.blog-posts.blog-post-card');

  const {
    frontmatter: { title, author, date },
    slug,
  } = blogPost;

  return (
    <Link {...props} href={`/blog/${slug}`} className="group">
      <div className="text-sm my-4">
        <div className="flex flex-row">
          <div className="text-right flex-1 self-center text-9xl italic font-pixel mr-4 text-zinc-400 dark:text-zinc-900 group-hover:text-gray-400 dark:group-hover:text-zinc-800">
            {index}
          </div>

          <div className="flex-3 flex flex-col justify-center text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
            <h1 className="text-xl md:text-3xl mb-3 font-bold text-theme-red-400 group-hover:underline decoration-6 [text-decoration-skip-ink:_none]">
              <ScrambledText>{title}</ScrambledText>
            </h1>

            <span className="inline-flex gap-4">
              <span>
                {t.rich('postedBy', {
                  b: (chunks) => <b>{chunks}</b>,
                  author,
                })}
              </span>

              <span className="inline-flex gap-2 flex-wrap">
                <Icon
                  icon="Clock"
                  className="w-[1em] aspect-square inline-block"
                />
                {format(date, 'PP')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
