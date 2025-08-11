/* eslint-disable @typescript-eslint/no-explicit-any */
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { Configuration, RuleSetCondition, RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {
  // https://nextjs.org/docs/app/guides/static-exports
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // https://react-svgr.com/docs/next/
  webpack(config: Configuration) {
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
  // https://github.com/vercel/next.js/discussions/50337
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        // customize default plugin options
                        removeViewBox: false,
                      },
                    },
                  },
                  'removeDimensions',
                ],
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

// https://nextjs.org/docs/pages/guides/mdx
const withMDX = createMDX({
  // https://nextjs.org/docs/pages/guides/mdx#handling-md-files
  extension: /\.(md|mdx)$/,
  // https://nextjs.org/docs/pages/guides/mdx#using-plugins-with-turbopack
  options: {
    remarkPlugins: [
      // https://github.com/remarkjs/remark-gfm
      ['remark-gfm'] as unknown as any,
      // https://mdxjs.com/guides/frontmatter/
      ['remark-frontmatter'] as unknown as any,
      ['remark-mdx-frontmatter'] as unknown as any,
    ],
    rehypePlugins: [
      // https://mdxjs.com/guides/syntax-highlighting/
      ['rehype-highlight'] as unknown as any,
    ],
  },
});

//next-intl.dev/docs/getting-started/app-router/without-i18n-routing
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
