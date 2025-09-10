import Icon, { IconKey } from '@/components/icon';
import { YouTubeEmbed } from '@next/third-parties/google';
import classNames from 'classnames';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Script from 'next/script';
import { ComponentProps, ElementType } from 'react';
import CopyButton from './components/copy-button';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
} from './components/polymorphic-component';

export type CustomHProps<T extends ElementType> = PolymorphicComponentProps<T>;

export function CustomH<T extends ElementType>({
  as = 'h1',
  id,
  className,
  ...props
}: CustomHProps<T>) {
  return (
    <Link
      href={`#${id}`}
      className={classNames(
        'group flex flex-row items-start gap-1 no-underline text-black! dark:text-white!',
        className,
      )}
    >
      <PolymorphicComponent
        {...props}
        as={as}
        id={id}
        className="scroll-mt-22"
      />
      <Icon
        icon="Link"
        className="w-6 h-auto opacity-0 group-hover:opacity-100 ease-[steps(2,end)] duration-200"
      />
    </Link>
  );
}

const languageIconMap: Map<string, { icon: IconKey; className?: string }> =
  new Map([
    ['sh', { icon: 'Bash', className: 'bg-black' }],
    ['bash', { icon: 'Bash', className: 'bg-black' }],
    ['shell', { icon: 'Bash', className: 'bg-black' }],
    ['code', { icon: 'Code', className: 'bg-zinc-700' }],
    ['html', { icon: 'Html', className: 'bg-orange-800' }],
    ['js', { icon: 'Javascript', className: 'bg-yellow-800' }],
    ['typescript', { icon: 'Typescript', className: 'bg-theme-blue-400' }],
    ['tsx', { icon: 'Typescript', className: 'bg-theme-blue-400' }],
  ]);

export interface CustomPreProps extends ComponentProps<'pre'> {}

export function CustomPre({ children, className, ...props }: CustomPreProps) {
  const classes = className?.split(' ') ?? [];
  const languageClass = classes.find((c) => c.startsWith('language-'));
  const language = languageClass?.slice('language-'.length);
  const { icon, className: iconClassName } =
    language && languageIconMap.has(language)
      ? languageIconMap.get(language)!
      : languageIconMap.get('code')!;

  return (
    <div className="relative pt-5 rounded-lg">
      <pre className={className} {...props}>
        {children}
        <div
          className={classNames(
            'absolute top-0 left-0 w-full h-6.5 px-1.5 flex justify-start items-center text-white rounded-t-lg',
            iconClassName,
          )}
          title={language}
        >
          <Icon icon={icon} className="w-4 h-auto" />
        </div>
        <CopyButton className="absolute top-0 right-0 z-1 w-6.5 h-6.5 flex justify-center items-center text-white rounded-tr-lg" />
      </pre>
    </div>
  );
}

// https://nextjs.org/docs/app/guides/mdx#global-styles-and-components
const components: MDXComponents = {
  a: (props) => <a target="_blank" {...props} />,
  h1: (props) => <CustomH as="h1" {...props} />,
  h2: (props) => <CustomH as="h2" {...props} />,
  h3: (props) => <CustomH as="h3" {...props} />,
  h4: (props) => <CustomH as="h4" {...props} />,
  h5: (props) => <CustomH as="h5" {...props} />,
  h6: (props) => <CustomH as="h6" {...props} />,
  pre: CustomPre,
  Script,
  YouTubeEmbed,
};

// https://nextjs.org/docs/pages/guides/mdx#add-an-mdx-componentstsx-file
export function useMDXComponents(): MDXComponents {
  return components;
}
