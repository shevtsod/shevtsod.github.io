'use client';

import rehypeExtractToc from '@stefanprobst/rehype-extract-toc';
import rehypeExtractTocMdx from '@stefanprobst/rehype-extract-toc/mdx';
import type { StorybookConfig } from '@storybook/nextjs';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { RuleSetCondition, RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      // https://storybook.js.org/addons/@storybook/addon-docs
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            // https://mdxjs.com/guides/frontmatter/
            remarkPlugins: [
              // https://github.com/remarkjs/remark-gfm
              remarkGfm,
              // https://mdxjs.com/guides/frontmatter/
              remarkFrontmatter,
              remarkMdxFrontmatter,
            ],
            rehypePlugins: [
              // https://mdxjs.com/guides/syntax-highlighting/
              rehypeHighlight,
              // https://github.com/rehypejs/rehype-slug
              rehypeSlug,
              // https://github.com/stefanprobst/rehype-extract-toc
              rehypeExtractToc,
              rehypeExtractTocMdx,
            ],
          },
        },
      },
    },
    // https://storybook.js.org/addons/@storybook/addon-a11y
    '@storybook/addon-a11y',
    // https://storybook.js.org/addons/storybook-next-intl
    'storybook-next-intl',
    // https://storybook.js.org/recipes/tailwindcss
    '@storybook/addon-styling-webpack',
    // https://storybook.js.org/addons/@storybook/addon-themes
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: [
    '../public',
    // https://storybook.js.org/docs/get-started/frameworks/nextjs#nextfontlocal
    {
      from: '../public/fonts',
      to: 'public/fonts',
    },
  ],

  // https://react-svgr.com/docs/next/
  webpackFinal: async (config) => {
    // https://github.com/storybookjs/storybook/issues/18557xa
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module?.rules?.find(
      (rule): rule is RuleSetRule =>
        typeof rule === 'object' &&
        rule !== null &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test.test('.svg'),
    ) as RuleSetRule;

    config.module?.rules?.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [
            ...((fileLoaderRule.resourceQuery as { not?: RuleSetCondition[] })
              ?.not ?? []),
            /url/,
          ],
        }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};
export default config;
