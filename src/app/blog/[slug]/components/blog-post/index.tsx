'use client';

import Button from '@/components/button';
import Icon from '@/components/icon';
import ScrambledText from '@/components/scrambled-text';
import { useTheme } from '@/components/theme';
import type { BlogPostType } from '@/utils/blog';
import Giscus from '@giscus/react';
import { run } from '@mdx-js/mdx';
import { Toc } from '@stefanprobst/rehype-extract-toc';
import { format } from 'date-fns';
import { MDXModule } from 'mdx/types';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import TableOfContents from '../table-of-contents';

export interface BlogPostProps {
  children: React.ReactNode;
  blogPost: BlogPostType;
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
  tableOfContents,
  prevBlogPost,
  nextBlogPost,
}: BlogPostProps) {
  const locale = useLocale();
  const t = useTranslations('app.blog.[slug].components.blog-post');
  const { theme } = useTheme();
  const {
    frontmatter: { title, description, author, date },
  } = blogPost;
  const [descriptionMdx, setDesccriptionMdx] = useState<MDXModule | undefined>(
    undefined,
  );
  const Description = descriptionMdx ? descriptionMdx.default : Fragment;

  // https://mdxjs.com/guides/mdx-on-demand/
  useEffect(() => {
    if (description) {
      (async function () {
        setDesccriptionMdx(
          await run(description, { ...runtime, baseUrl: import.meta.url }),
        );
      })();
    }
  }, [description]);
  return (
    <article className="grow w-full max-w-3xl prose dark:prose-invert mx-auto py-8 px-4 md:px-0 flex flex-col font-sans">
      <div className="mb-10 flex flex-col gap-2 text-zinc-500 text-sm">
        <h1 className="mb-0! font-bold text-theme-red-400 font-mono">
          {title}
        </h1>

        <h2 className="prose-xl text-zinc-500! [&>*]:my-0">
          <Description />
        </h2>

        <span className="inline-flex gap-4 flex-wrap">
          {author && (
            <span>
              {t.rich('postedBy', {
                b: (chunks) => <b>{chunks}</b>,
                author,
              })}
            </span>
          )}

          {date && (
            <span className="inline-flex gap-2">
              <Icon icon="Clock" className="w-[1em] h-auto inline-block" />
              {format(date, 'PP')}
            </span>
          )}
        </span>

        {/* Table of Contents */}
        <TableOfContents tableOfContents={tableOfContents} className="mx-6" />
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
