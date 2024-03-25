import classNames from 'classnames';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import socials from '../../../data/socials';
import Icon from '../../icon/Icon';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export default function Footer({ className, ...props }: FooterProps) {
  const { t } = useTranslation('app', { keyPrefix: 'components.Footer' });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer
      {...props}
      ref={ref}
      className={classNames('border-t-theme-red-400 border-t', className)}
    >
      <div
        className={classNames(
          {
            'animate-fade-in': isInView,
            invisible: !isInView,
          },
          'container mx-auto',
        )}
      >
        <div className="py-8 px-8 grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
          <div className="flex flex-col">
            <div className="text-lg font-bold text-theme-red-400">
              {t('sections.social')}
            </div>

            {socials.map(({ href, icon, title }, i) => (
              <div key={i}>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={href}
                  className="inline-flex items-center gap-2 hover:text-theme-orange-200"
                >
                  <Icon icon={icon} className="inline-block" /> {title}
                </a>
              </div>
            ))}
          </div>
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
