import Icon from '@/components/Icon/Icon';
import ScrambledText from '@/components/ScrambledText/ScrambledText';
import footerLinkSections, {
  type FooterLink,
  type FooterLinksSection,
} from '@/config/footer';
import classNames from 'classnames';
import { type ComponentProps } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router';
import Logo from '../../Logo/Logo';

interface FooterLinkComponentProps extends ComponentProps<'div'> {
  footerLinksSection: FooterLinksSection;
  footerLink: FooterLink;
}

function FooterLinkComponent({
  footerLinksSection: { key: footerLinksSectionKey },
  footerLink: { to, target, icon, key },
  ...props
}: FooterLinkComponentProps) {
  const { t } = useTranslation('app', {
    keyPrefix: 'components.Layout.Footer',
  });

  return (
    <div {...props}>
      <Link
        rel="noreferrer noopener"
        to={to}
        target={target}
        className="inline-flex items-center gap-2 hover:text-theme-orange-200"
      >
        {icon && <Icon icon={icon} className="inline-block" />}
        <ScrambledText>
          {t(
            `footerLinksSections.${footerLinksSectionKey}.footerLinks.${key}.title`
          )}
        </ScrambledText>
      </Link>
    </div>
  );
}

export interface FooterProps extends React.ComponentProps<'footer'> {}

export default function Footer({ className, ...props }: FooterProps) {
  const { t } = useTranslation('app', {
    keyPrefix: 'components.Layout.Footer',
  });

  return (
    <footer
      {...props}
      className={classNames('border-t-theme-red-400 border-t', className)}
    >
      <div className="max-w-xs md:container mx-auto flex flex-col align-middle">
        <div className="py-8 px-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <NavLink to="/">
            <Logo className="h-24 aspect-square" />
          </NavLink>

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
            <Trans
              t={t}
              i18nKey="copyright"
              components={{
                icon: (
                  <Icon
                    icon="heart"
                    className="h-[16px] w-auto inline align-text-top text-theme-red-400"
                    viewBox="0 0 16 16"
                  />
                ),
              }}
            />
          </p>
          <p className="text-theme-red-400">▃ ▃ ▃</p>
        </div>
      </div>
    </footer>
  );
}
