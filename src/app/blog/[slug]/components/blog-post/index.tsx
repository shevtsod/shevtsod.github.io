'use client';

import Button from '@/components/button';
import Icon from '@/components/icon';
import ScrambledText from '@/components/scrambled-text';
import { useTheme } from '@/components/theme';
import type { BlogPostType, ReadingTime } from '@/utils/blog';
import { UTCDate } from '@date-fns/utc';
import Giscus from '@giscus/react';
import { run } from '@mdx-js/mdx';
import { Toc } from '@stefanprobst/rehype-extract-toc';
import { format } from 'date-fns';
import { MDXModule } from 'mdx/types';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import TableOfContents from '../table-of-contents';

export interface BlogPostProps {
  children: React.ReactNode;
  blogPost: BlogPostType;
  readingTime: ReadingTime;
  tableOfContents: Toc;
  prevBlogPost?: BlogPostType;
  nextBlogPost?: BlogPostType;
}

/**
 * Renders the given components as a blog post.
 */
export default function BlogPost({
  children,
  blogPost,
  readingTime,
  tableOfContents,
  prevBlogPost,
  nextBlogPost,
}: BlogPostProps) {
  const locale = useLocale();
  const t = useTranslations('app.blog.[slug].components.blog-post');
  const { theme } = useTheme();
  const {
    frontmatter: { title, description, author, created, updated, tags },
  } = blogPost;
  const [descriptionMdx, setDescriptionMdx] = useState<MDXModule | undefined>(
    undefined,
  );
  const Description = descriptionMdx ? descriptionMdx.default : undefined;

  // https://mdxjs.com/guides/mdx-on-demand/
  useEffect(() => {
    if (description) {
      (async function () {
        setDescriptionMdx(
          await run(description, { ...runtime, baseUrl: import.meta.url }),
        );
      })();
    }
  }, [description]);

  return (
    <article className="grow w-full max-w-3xl prose dark:prose-invert mx-auto py-8 px-4 md:px-0 flex flex-col font-sans">
      <div className="flex flex-col text-zinc-500 text-sm">
        <h1 className="mb-0! font-bold text-theme-red-400 font-retro">
          {title}
        </h1>

        <h2 className="prose-xl text-zinc-500 my-4!">
          {Description ? (
            <Description />
          ) : (
            <p className="h-8 w-full rounded bg-theme-gray-200 dark:bg-theme-gray-800" />
          )}
        </h2>

        <span className="inline-flex gap-4 flex-wrap my-4">
          {author && (
            <span>
              {t.rich('postedBy', {
                b: (chunks) => <b>{chunks}</b>,
                author,
              })}
            </span>
          )}

          {readingTime && (
            <span className="inline-flex gap-2 flex-wrap">
              <Icon icon="Clock" className="w-[1em] h-auto inline-block" />
              {t('readingTime', { minutes: Math.ceil(readingTime.minutes) })}
            </span>
          )}

          {created && (
            <span className="inline-flex gap-2 flex-wrap">
              <Icon icon="Plus" className="w-[1em] h-auto inline-block" />
              {format(new UTCDate(created), 'PP')}
            </span>
          )}

          {updated && (
            <span className="inline-flex gap-2 flex-wrap">
              <Icon icon="Pencil" className="w-[1em] h-auto inline-block" />
              {format(new UTCDate(updated), 'PP')}
            </span>
          )}

          {tags.length > 0 && (
            <span className="inline-flex gap-2 flex-wrap">
              <Icon icon="Tag" className="w-[1em] h-auto inline-block" />
              {tags.map((tag, i) => (
                <span key={i}>
                  {tag}
                  {i < tags.length - 1 && <span>, </span>}
                </span>
              ))}
            </span>
          )}
        </span>

        {/* Table of Contents */}
        <TableOfContents
          tableOfContents={tableOfContents}
          className="mx-6 mt-2 mb-6"
        />
      </div>

      <div className="stretch grow-1 w-full">{children}</div>

      <div className="my-4 flex gap-2 justify-between items-stretch text-center [&>*]:flex-1">
        <div>
          {prevBlogPost && (
            <Link
              href={`/blog/${prevBlogPost.slug}`}
              className="text-theme-red-400"
            >
              🡠 {prevBlogPost.frontmatter.title}
            </Link>
          )}
        </div>

        <div>
          <Button
            as={Link}
            href="/blog"
            className="h-full w-full flex items-center justify-center"
          >
            <ScrambledText className="block">{t('backToBlog')}</ScrambledText>
          </Button>
        </div>

        <div>
          {nextBlogPost && (
            <Link
              href={`/blog/${nextBlogPost.slug}`}
              className="text-theme-red-400"
            >
              {nextBlogPost.frontmatter.title} 🡢
            </Link>
          )}
        </div>
      </div>

      {/* https://giscus.app/ */}
      <div className="overflow-x-auto">
        <Giscus
          id="comments"
          repo="shevtsod/shevtsod.github.io"
          repoId="R_kgDOI0bUEA"
          category="Announcements"
          categoryId="DIC_kwDOI0bUEM4CudQg"
          mapping="pathname"
          strict="1"
          reactionsEnabled="1"
          inputPosition="top"
          theme={theme}
          lang={locale}
          loading="lazy"
        />
      </div>
    </article>
  );
}
