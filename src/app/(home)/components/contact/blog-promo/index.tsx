'use client';

import Button from '@/components/button';
import ScrambledText from '@/components/scrambled-text';
import useFadeInView from '@/hooks/use-fade-in-view';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ComponentPropsWithoutRef, ElementType, useRef } from 'react';

export type BlogPromoProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Renders the blog promo section.
 */
export default function BlogPromo<T extends ElementType>({
  as,
  className,
  ...props
}: BlogPromoProps<T>) {
  const Component = as ?? 'div';
  const t = useTranslations('app.(home).components.contact.blog-promo');
  const ref = useRef(null);
  useFadeInView(ref, { once: true });

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames('pt-20 pb-8', className)}
    >
      <div className="container mx-auto px-8 text-center text-2xl font-bold">
        {t.rich('callout', {
          blog: () => (
            <Button as={Link} href="/blog" className="px-2 py-1">
              <ScrambledText>{t('blog')}</ScrambledText>
            </Button>
          ),
        })}
      </div>
    </Component>
  );
}
