import Icon from '@/components/icon';
import { YouTubeEmbed } from '@next/third-parties/google';
import classNames from 'classnames';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

const customH = (
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  {
    id,
    className,
    children,
    ...props
  }: { id?: string; className?: string; children: React.ReactNode },
) => {
  const Component = component ?? 'h1';

  return (
    <Component
      id={id}
      className={classNames(
        'group flex flex-row items-start gap-1 scroll-mt-20',
        className,
      )}
      {...props}
    >
      <Link href={`#${id}`} className="no-underline">
        {children}
      </Link>
      <Icon
        icon="Link"
        className="w-6 h-auto opacity-0 group-hover:opacity-100 ease-[steps(2,end)] duration-200"
      />
    </Component>
  );
};

// https://nextjs.org/docs/app/guides/mdx#global-styles-and-components
const components: MDXComponents = {
  code: (props) => (
    <code className="rounded-lg p-1 bg-zinc-400 dark:bg-zinc-800" {...props} />
  ),
  pre: (props) => (
    <pre
      className="bg-transparent m-0 px-0! max-h-200 overflow-auto"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-theme-blue-200 dark:text-theme-blue-100"
      target="_blank"
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={classNames(
        'px-2 py-4 bg-theme-blue-100/50 dark:bg-theme-blue-600/50',
        className,
      )}
      {...props}
    />
  ),
  h1: (props) => customH('h1', props),
  h2: (props) => customH('h2', props),
  h3: (props) => customH('h3', props),
  h4: (props) => customH('h4', props),
  h5: (props) => customH('h5', props),
  h6: (props) => customH('h6', props),
  YouTubeEmbed,
};

// https://nextjs.org/docs/pages/guides/mdx#add-an-mdx-componentstsx-file
export function useMDXComponents(): MDXComponents {
  return components;
}
