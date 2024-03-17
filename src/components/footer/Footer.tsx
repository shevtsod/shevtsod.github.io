import { useTranslation } from 'react-i18next';
import socials from '../../data/socials';

export default function Footer() {
  const { t } = useTranslation(undefined, { keyPrefix: 'components.Footer' });

  return (
    <footer className=" bg-black border-t-primary border-t font-mono">
      <div className="container mx-auto py-10 px-10 grid grid-flow-row md:grid-flow-col gap-4 justify-center md:justify-normal">
        <div>
          <p className="text-lg font-black text-primary">
            {t('sections.social')}
          </p>

          {socials.map(({ href, icon: Icon, title }, i) => (
            <div>
              <a
                key={i}
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
      <div className="container mx-auto py-6 text-center">
        <p>{t('copyright')}</p>
      </div>
    </footer>
  );
}
