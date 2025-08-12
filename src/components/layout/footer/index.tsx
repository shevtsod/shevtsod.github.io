import Icon from '@/components/icon';
import Logo from '@/components/logo';
import ScrambledText from '@/components/scrambled-text';
import footerLinkSections, {
  type FooterLink,
  type FooterLinksSection,
} from '@/config/footer';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { type ComponentProps } from 'react';

interface FooterLinkComponentProps extends ComponentProps<'div'> {
  footerLinksSection: FooterLinksSection;
  footerLink: FooterLink;
}

function FooterLinkComponent({
  footerLinksSection: { key: footerLinksSectionKey },
  footerLink: { href, target, icon, key },
  ...props
}: FooterLinkComponentProps) {
  const t = useTranslations('components.layout.footer');

  return (
    <div {...props}>
      <Link
        rel="noreferrer noopener"
        href={href}
        target={target}
        className="inline-flex items-center gap-2 hover:text-theme-orange-200"
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

export interface FooterProps extends React.ComponentProps<'footer'> {}

/**
 * App footer.
 */
export default function Footer({ className, ...props }: FooterProps) {
  const t = useTranslations('components.layout.footer');

  return (
    <footer
      {...props}
      className={classNames('border-t-theme-red-400 border-t', className)}
    >
      <div className="max-w-xs md:container mx-auto flex flex-col align-middle">
        <div className="py-8 px-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href={{ pathname: '/', hash: 'top ' }}
            className="flex justify-center md:justify-start"
          >
            <Logo className="h-16 md:h-24 aspect-square" />
          </Link>

          {footerLinkSections.map((footerLinksSection, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-lg font-bold text-theme-red-400">
                {t(`footerLinksSections.${footerLinksSection.key}.title`)}
              </div>

              <ul>
                {footerLinksSection.footerLinks.map((footerLink, j) => (
                  <li key={j}>
                    <FooterLinkComponent
                      footerLinksSection={footerLinksSection}
                      footerLink={footerLink}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 text-center">
          <p className="align-middle">
            {t.rich('copyright', {
              icon: () => (
                <Icon
                  icon="heart"
                  className="h-[16px] w-auto inline align-text-top text-theme-red-400"
                  viewBox="0 0 16 16"
                />
              ),
            })}
          </p>
          <p className="text-theme-red-400">▃ ▃ ▃</p>
        </div>
      </div>
    </footer>
  );
}
