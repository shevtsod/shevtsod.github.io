import Icon from '@/components/icon';
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

export interface CustomPreProps extends ComponentProps<'pre'> {
  __rawString__: string;
}

export function CustomPre({
  children,
  className,
  __rawString__ = '',
  ...props
}: CustomPreProps) {
  return (
    <pre className={classNames('relative', className)} {...props}>
      <CopyButton className="absolute top-0 right-0 z-1 p-1.5 mr-5 mt-1 rounded-lg opacity-50" />
      {children}
    </pre>
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
