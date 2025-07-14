import classNames from 'classnames';
import { useRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import useFadeInView from '../../../../hooks/useFadeInView';
import Heading from '../Heading/Heading';

export type ExperienceProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Experience<T extends ElementType>({
  as,
  className,
  ...props
}: ExperienceProps<T>) {
  const Component = as ?? 'div';
  const { t } = useTranslation('app', {
    keyPrefix: 'features.home.components.Experience',
  });
  const ref = useRef(null);
  useFadeInView(ref, { once: true });

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames('container mx-auto', className)}
    >
      <Heading
        as="h2"
        className="mb-4 uppercase text-center"
        href={`#${props.id}`}
      >
        {t('title')}
      </Heading>
    </Component>
  );
}
