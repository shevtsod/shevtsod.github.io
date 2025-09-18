'use client';

import BlogPostMetadata from '@/app/blog/components/blog-post-metadata';
import Button from '@/components/button';
import Icon from '@/components/icon';
import { HCustom } from '@/components/mdx-components/h-custom';
import { useTheme } from '@/components/theme';
import type { BlogPostType, ReadingTime } from '@/utils/blog';
import Giscus from '@giscus/react';
import { Toc } from '@stefanprobst/rehype-extract-toc';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ScrambledText from '../../../../../components/scrambled-text';
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
  const invertedHalfScrollY = useTransform(scrollY, (val) => val * -0.5 - 250);
  const { frontmatter } = blogPost;
  const { imageUrl } = frontmatter;

  // Append more headings to automatically generated table of contents
  const [tableOfContents] = useState(
    originalTableOfContents
      ? [
          ...originalTableOfContents,
          {
            depth: 1,
            value: t('comments'),
            id: 'comments',
          },
        ]
      : [],
  );

  return (
    <article className="grow font-sans flex flex-col">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full max-h-96">
          {/* Background blur */}
          <motion.div
            className="absolute h-full w-full bg-cover bg-repeat-y"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundPositionY: invertedHalfScrollY,
            }}
            transition={{ ease: 'linear' }}
          />
          {/* Foreground image */}
          <Image
            src={imageUrl}
            width={1280}
            height={720}
            alt={t('image')}
            className="z-1 w-full h-auto max-h-96 object-contain backdrop-blur-xl bg-white/75 dark:bg-black/75"
          />
        </div>
      )}

      <div className="relative mt-8 mb-12">
        <div className="flex-1 px-4 lg:px-0 flex flex-col gap-4 w-full max-w-4xl 2xl:max-w-5xl mx-auto">
          {/* Metadata */}
          <BlogPostMetadata
            className="w-full max-w-3xl mx-auto xl:mb-4"
            frontmatter={frontmatter}
            readingTime={readingTime}
          />

          {/* Table of Contents */}
          <div className="xl:h-full xl:absolute top-0 left-1/2 xl:ml-112 2xl:ml-128">
            <div className="max-w-3xl mx-auto text-sm xl:text-base sticky top-22 z-1 overflow-y-auto xl:max-h-[calc(100svh-4.25em)] xl:px-4">
              <TableOfContents tableOfContents={tableOfContents} />
            </div>
          </div>

          {/* Content */}
          <div className="stretch grow-1 w-full prose dark:prose-invert max-w-4xl 2xl:max-w-5xl">
            {children}
          </div>

          <div className="w-full max-w-3xl mx-auto">
            {/* Links */}
            <div className="my-4 flex gap-2 justify-between items-center text-center [&>*]:flex-1">
              <div>
                {prevBlogPost && (
                  <Link
                    href={`/blog/${prevBlogPost.slug}`}
                    className="text-theme-red-400 underline flex justify-center items-center"
                  >
                    <Icon
                      icon="ChevronDown"
                      className="shrink-0 h-4 w-auto rotate-90"
                    />
                    <span className="flex-1 font-bold">
                      {prevBlogPost.frontmatter.title}
                    </span>
                  </Link>
                )}
              </div>

              <Button as={Link} href="/blog" className="self-stretch font-bold">
                <ScrambledText className="w-full h-full flex justify-center items-center">
                  {t('backToBlog')}
                </ScrambledText>
              </Button>

              <div>
                {nextBlogPost && (
                  <Link
                    href={`/blog/${nextBlogPost.slug}`}
                    className="text-theme-red-400 underline flex justify-center items-center"
                  >
                    <span className="flex-1 font-bold">
                      {nextBlogPost.frontmatter.title}
                    </span>
                    <Icon
                      icon="ChevronDown"
                      className="shrink-0 h-4 w-auto rotate-270"
                    />
                  </Link>
                )}
              </div>
            </div>

            {/* Comments */}
            <HCustom as="h1" id="comments" className="text-4xl font-bold">
              {t('comments')}
            </HCustom>

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
                    <Link
                      href="https://giscus.app/"
                      target="_blank"
                      className="text-theme-red-400 underline"
                    >
                      giscus
                    </Link>
                  ),
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
