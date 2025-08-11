import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import useFadeInView from '../../../../hooks/use-fade-in-view';
import Heading from '../heading';

export type ProjectsProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Renders the projects section.
 */
export default function Projects<T extends ElementType>({
  as,
  className,
  ...props
}: ProjectsProps<T>) {
  const Component = as ?? 'div';
  const t = useTranslations('app.(home).components.projects');
  const ref = useRef(null);
  useFadeInView(ref, { once: true });

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames('container mx-auto', className)}
    >
      <Heading as="h2" className="uppercase text-center" href={`#${props.id}`}>
        {t('title')}
      </Heading>
    </Component>
  );
}
