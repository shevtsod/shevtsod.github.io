'use client';

import Button from '@/components/button';
import ScrambledText from '@/components/scrambled-text';
import useFadeInView from '@/hooks/use-fade-in-view';
import { useIntro } from '@/hooks/use-intro';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ComponentProps, useRef } from 'react';

export interface BlogPromoProps extends ComponentProps<'div'> {}

/**
 * Renders the blog promo section.
 */
export default function BlogPromo({ className, ...props }: BlogPromoProps) {
  const t = useTranslations('app.(home).components.contact.blog-promo');
  const ref = useRef(null);
  const [intro] = useIntro();
  useFadeInView(ref, { once: true, skip: !intro });

  return (
    <div {...props} ref={ref} className={classNames('pt-12 pb-8', className)}>
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
    </div>
  );
}
