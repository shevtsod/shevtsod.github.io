import Icon from '@/components/icon';
import Logo from '@/components/logo';
import footerLinkSections from '@/content/footer';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import FooterLink from './footer-link';

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

          {footerLinkSections.map((footerLinkSection, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-lg font-bold text-theme-red-400">
                {t(`footerLinksSections.${footerLinkSection.key}.title`)}
              </div>

              <ul>
                {footerLinkSection.footerLinks.map((footerLink, j) => (
                  <li key={j}>
                    <FooterLink
                      footerLinkSection={footerLinkSection}
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
