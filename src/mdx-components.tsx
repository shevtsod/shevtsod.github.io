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
    ...props
  }: { id?: string; className?: string; children: React.ReactNode },
) => {
  const Component = component ?? 'h1';

  return (
    <Link
      id={id}
      href={`#${id}`}
      className={classNames(
        'group flex flex-row items-start gap-1 scroll-mt-20 no-underline text-black! dark:text-white!',
        className,
      )}
    >
      <Component {...props} />
      <Icon
        icon="Link"
        className="w-6 h-auto opacity-0 group-hover:opacity-100 ease-[steps(2,end)] duration-200"
      />
    </Link>
  );
};

// https://nextjs.org/docs/app/guides/mdx#global-styles-and-components
const components: MDXComponents = {
  a: (props) => <a target="_blank" {...props} />,
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
