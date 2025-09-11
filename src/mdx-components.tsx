import { HCustom } from '@/components/mdx-components/h-custom';
import { PreCustom } from '@/components/mdx-components/pre-custom';
import { YouTubeEmbed } from '@next/third-parties/google';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Script from 'next/script';

// https://nextjs.org/docs/app/guides/mdx#global-styles-and-components
const components: MDXComponents = {
  a: (props) => <Link target="_blank" {...props} />,
  h1: (props) => <HCustom as="h1" {...props} />,
  h2: (props) => <HCustom as="h2" {...props} />,
  h3: (props) => <HCustom as="h3" {...props} />,
  h4: (props) => <HCustom as="h4" {...props} />,
  h5: (props) => <HCustom as="h5" {...props} />,
  h6: (props) => <HCustom as="h6" {...props} />,
  pre: PreCustom,
  Script,
  YouTubeEmbed,
};

// https://nextjs.org/docs/pages/guides/mdx#add-an-mdx-componentstsx-file
export function useMDXComponents(): MDXComponents {
  return components;
}
