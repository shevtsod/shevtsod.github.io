'use client';

import Button from '@/components/button';
import Icon from '@/components/icon';
import ScrambledText from '@/components/scrambled-text';
import { useTheme } from '@/components/theme';
import { CustomH } from '@/mdx-components';
import type { BlogPostType, ReadingTime } from '@/utils/blog';
import { UTCDate } from '@date-fns/utc';
import Giscus from '@giscus/react';
import { run } from '@mdx-js/mdx';
import { Toc } from '@stefanprobst/rehype-extract-toc';
import { format } from 'date-fns';
import { MDXModule } from 'mdx/types';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
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
  tableOfContents: originalTableOfContents,
  prevBlogPost,
  nextBlogPost,
}: BlogPostProps) {
  const locale = useLocale();
  const t = useTranslations('app.blog.[slug].components.blog-post');
  const { theme } = useTheme();

  const { scrollY } = useScroll();
  const halfScrollY = useTransform(scrollY, (val) => val * 0.5 - 200);

  const {
    frontmatter: {
      title,
      descriptionMdx,
      author,
      created,
      updated,
      tags,
      imageUrl,
    },
  } = blogPost;
  const [description, setDescription] = useState<MDXModule | undefined>(
    undefined,
  );
  const Description = description?.default;

  // https://mdxjs.com/guides/mdx-on-demand/
  useEffect(() => {
    if (descriptionMdx) {
      (async function () {
        setDescription(
          await run(descriptionMdx, { ...runtime, baseUrl: import.meta.url }),
        );
      })();
    }
  }, [descriptionMdx]);

  // Append more headings to automatically generated table of contents
  const tableOfContents: Toc = [
    ...originalTableOfContents,
    {
      depth: 1,
      value: t('comments'),
      id: 'comments',
    },
  ];

  return (
    <article className="grow font-sans">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full max-h-84">
          {/* Background blur */}
          <motion.div
            className="absolute h-full w-full bg-cover opacity-25"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundPositionY: halfScrollY,
            }}
            transition={{ ease: 'linear' }}
          />
          {/* Foreground image */}
          <Image
            src={imageUrl}
            width={1280}
            height={720}
            alt={t('image')}
            className="z-1 w-full h-auto max-h-84 object-contain backdrop-blur-xl"
          />
        </div>
      )}

      <div className="w-full max-w-3xl prose dark:prose-invert mx-auto my-8 px-4 md:px-0 flex flex-col">
        {/* Metadata */}
        <div className="flex flex-col text-zinc-500 text-sm">
          <h1 className="mb-0! font-bold text-theme-red-400 font-retro">
            {title}
          </h1>

          <h2 className="prose-xl text-inherit my-4!">
            {Description ? (
              <Description />
            ) : (
              <p className="h-8 w-full rounded bg-theme-gray-100 dark:bg-theme-gray-600" />
            )}
          </h2>

          <span className="inline-flex gap-4 flex-wrap">
            {author && author !== 'shevtsod' && (
              <span>
                {t.rich('postedBy', {
                  b: (chunks) => <b>{chunks}</b>,
                  author,
                })}
              </span>
            )}

            {readingTime && (
              <span className="inline-flex gap-2">
                <Icon icon="Clock" className="w-[1em] h-auto inline-block" />
                {t('readingTime', {
                  minutes: Math.ceil(readingTime.minutes),
                })}
              </span>
            )}

            {created && (
              <span className="inline-flex gap-2">
                <Icon icon="Plus" className="w-[1em] h-auto inline-block" />
                {format(new UTCDate(created), 'PP')}
              </span>
            )}

            {updated && (
              <span className="inline-flex gap-2">
                <Icon icon="Pencil" className="w-[1em] h-auto inline-block" />
                {format(new UTCDate(updated), 'PP')}
              </span>
            )}

            {tags.length > 0 && (
              <span className="inline-flex gap-1">
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
          <div className="my-4">
            <TableOfContents tableOfContents={tableOfContents} />
          </div>
        </div>

        {/* Content */}
        <div className="stretch grow-1 w-full">{children}</div>

        {/* Links */}
        <div className="my-4 flex gap-2 justify-between items-center text-center [&>*]:flex-1">
          <div>
            {prevBlogPost && (
              <Link
                href={`/blog/${prevBlogPost.slug}`}
                className="text-theme-red-400 flex justify-center items-center"
              >
                <Icon
                  icon="ArrowDown"
                  className="shrink-0 h-4 w-auto rotate-90"
                />
                <span className="flex-1">{prevBlogPost.frontmatter.title}</span>
              </Link>
            )}
          </div>

          <Button
            as={Link}
            href="/blog"
            className="h-full w-full flex items-center justify-center"
          >
            <ScrambledText className="block">{t('backToBlog')}</ScrambledText>
          </Button>

          <div>
            {nextBlogPost && (
              <Link
                href={`/blog/${nextBlogPost.slug}`}
                className="text-theme-red-400 flex justify-center items-center"
              >
                <span className="flex-1">{nextBlogPost.frontmatter.title}</span>
                <Icon
                  icon="ArrowDown"
                  className="shrink-0 h-4 w-auto rotate-270"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Comments */}
        <CustomH as="h1" id="comments">
          {t('comments')}
        </CustomH>

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
            loading="eager"
          />

          <div className="text-sm italic text-right">
            {t.rich('commentsAttribution', {
              link: () => (
                <a href="https://giscus.app/" target="_blank">
                  giscus
                </a>
              ),
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
