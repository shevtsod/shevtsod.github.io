import { useInView } from 'framer-motion';
import HeartIcon from 'pixelarticons/svg/heart.svg?react';
import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import socials from '../../data/socials';

export default function Footer() {
  const { t } = useTranslation(undefined, { keyPrefix: 'components.Footer' });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className=" bg-black border-t-primary border-t font-mono">
      <div
        className={`${isInView ? 'animate-fade-in' : 'invisible'} container mx-auto`}
      >
        <div className="py-10 px-10 grid grid-flow-row md:grid-flow-col gap-4 justify-center md:justify-normal">
          <div>
            <p className="text-lg font-black text-primary">
              {t('sections.social')}
            </p>

            {socials.map(({ href, icon: Icon, title }, i) => (
              <div key={i}>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={href}
                  className="hover:text-secondary"
                >
                  <Icon className="inline" /> {title}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="py-6 text-center">
          <p>
            <Trans
              t={t}
              i18nKey="copyright"
              components={{
                icon: <HeartIcon className="inline h-5 w-5 text-primary" />,
              }}
            />
          </p>
          <p className="text-primary">▃ ▃ ▃</p>
        </div>
      </div>
    </footer>
  );
}
