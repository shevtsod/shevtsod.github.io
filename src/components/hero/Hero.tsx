import ChevronDown from 'pixelarticons/svg/chevron-down.svg?react';
import { useTranslation } from 'react-i18next';
import TypewriterText from '../typewriter-text/TypewriterText';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useTranslation(undefined, { keyPrefix: 'components.Hero' });

  return (
    <section
      id="hero"
      className={`${styles.hero} h-screen flex flex-col justify-center text-center overflow-hidden bg-black text-white`}
    >
      <h1
        className={`${styles.title} my-10 text-[8em] md:text-[12em] lg:text-[16em] xl:text-[20em] leading-[0.75] whitespace-break-spaces text-primary font-retro`}
      >
        {t('title')}
      </h1>
      <h2 className="lg:text-lg  font-mono">
        <TypewriterText text={t('subtitle')} duration={2} delay={3.5} />
      </h2>

      <div
        className={`${styles.chevron} absolute bottom-0 right-0 mx-10 my-10 flex flex-col`}
      >
        <span className="font-retro">SCROLL</span>
        <ChevronDown className="h-[32px] w-auto" />
      </div>
    </section>
  );
}
