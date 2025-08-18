import Icon from '@/components/icon';
import ScrambledText from '@/components/scrambled-text';
import { FooterLinkSectionType, FooterLinkType } from '@/content/footer';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ComponentProps } from 'react';

interface FooterLinkProps extends ComponentProps<'div'> {
  footerLinkSection: FooterLinkSectionType;
  footerLink: FooterLinkType;
}

/**
 * Renders one link in the footer.
 */
export default function FooterLink({
  footerLinkSection: { key: footerLinksSectionKey },
  footerLink: { href, target, icon, key },
  ...props
}: FooterLinkProps) {
  const t = useTranslations('components.layout.footer');

  return (
    <div {...props}>
      <Link
        rel="noreferrer noopener"
        href={href}
        target={target}
        className="inline-flex items-center gap-2 hover:text-theme-orange-600 dark:hover:text-theme-orange-200"
      >
        {icon && <Icon icon={icon} className="inline-block h-[16px] w-auto" />}
        <ScrambledText>
          {t(
            `footerLinksSections.${footerLinksSectionKey}.footerLinks.${key}.title`,
          )}
        </ScrambledText>
      </Link>
    </div>
  );
}
