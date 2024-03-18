import ChevronDown from 'pixelarticons/svg/chevron-down.svg?react';
import { useTranslation } from 'react-i18next';
import Typewriter from '../typewriter/Typewriter';
import styles from './Hero.module.css';

export interface TitleProps {
  className?: string;
}

export function Title({ className = '' }: TitleProps) {
  const { t } = useTranslation(undefined, { keyPrefix: 'components.Hero' });

  return (
    <h1
      className={`${styles.title} my-20 text-[5em] sm:text-[10em] md:text-[12em] lg:text-[16em] xl:text-[20em] [transform:perspective(400px)_rotateX(45deg)] sm:[transform:perspective(800px)_rotateX(45deg)] leading-[0.75] whitespace-break-spaces text-primary font-retro opacity-0 ${className} `}
    >
      {t('title')}
    </h1>
  );
}

export interface HeroProps {
  className?: string;
}

export default function Hero({ className = '' }: HeroProps) {
  const { t } = useTranslation(undefined, { keyPrefix: 'components.Hero' });

  return (
    <section
      id="hero"
      className={`min-h-[100svh] py-10 relative flex flex-col justify-center text-center overflow-hidden bg-black text-white ${className}`}
    >
      <Title />
      <h2 className="lg:text-lg  font-mono">
        <Typewriter text={t('subtitle')} duration={2} delay={3.5} />
      </h2>

      <div
        className={`${styles.chevron} absolute bottom-0 right-0 mx-10 my-10 flex flex-col opacity-0`}
      >
        <span className="font-retro">SCROLL</span>
        <ChevronDown className="h-[32px] w-auto" />
      </div>
    </section>
  );
}
