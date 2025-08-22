'use client';

import Button from '@/components/button';
import ScrambledText from '@/components/scrambled-text';
import useFadeInView from '@/hooks/use-fade-in-view';
import { useIntro } from '@/hooks/use-intro';
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
  const [intro, setIntro] = useIntro();
  useFadeInView(ref, { once: true, skip: !intro });

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames('pt-12 pb-8', className)}
    >
      <div className="container mx-auto px-8 text-center md:text-lg lg:text-xl font-bold">
        <Link href="/blog">
          {t.rich('callout', {
            blog: () => (
              <Button className="px-1 py-0.5 cursor-pointer">
                <ScrambledText>{t('blog')}</ScrambledText>
              </Button>
            ),
          })}
        </Link>
      </div>
    </Component>
  );
}
