import type { MDXComponents } from 'mdx/types';

// https://nextjs.org/docs/app/guides/mdx#global-styles-and-components
const components: MDXComponents = {
  code: (props) => <code className="rounded-lg" {...props} />,
};

// https://nextjs.org/docs/pages/guides/mdx#add-an-mdx-componentstsx-file
export function useMDXComponents(): MDXComponents {
  return components;
}
