import Icon from '@/components/icon';
import Logo from '@/components/logo';
import { footerLinksSections } from '@/content/footer';
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
      className={classNames(
        'z-50 bg-white dark:bg-black border-t-theme-red-400 border-t-8 md:border-t-12',
        className,
      )}
    >
      <div className="max-w-xs md:container mx-auto flex flex-col align-middle">
        <div className="py-8 px-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href={{ pathname: '/', hash: 'top ' }}
            className="flex justify-center md:justify-start"
          >
            <Logo className="h-16 md:h-24 w-auto aspect-square" />
          </Link>

          {footerLinksSections.map((footerLinkSection, i) => (
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
                  icon="16x/heart"
                  className="h-[16px] w-auto inline align-text-top text-theme-red-400"
                  viewBox="0 0 16 16"
                />
              ),
            })}
          </p>
          <div className="flex flex-row justify-center gap-3 py-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className="inline-block bg-theme-red-400 w-6 md:w-8 h-2 md:h-3"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
