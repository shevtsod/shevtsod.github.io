import LayoutContext from '@/components/Layout/LayoutContext';
import useTitle from '@/hooks/useTitle';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Contact from '../components/Contact/Contact';
import Hero from '../components/Hero/Hero';
import Summary from '../components/Summary/Summary';

export default function IndexRoute() {
  const { t } = useTranslation('app', {
    keyPrefix: 'features.home.routes.IndexRoute',
  });
  const { setLayoutOptions } = useContext(LayoutContext);
  useTitle(t('title'));

  useEffect(() => {
    setLayoutOptions((value) => ({
      ...value,
      showBoot: true,
      showHeaderOnScroll: true,
    }));
  }, [setLayoutOptions]);

  return (
    <>
      <Hero as="section" id="hero" className="min-h-[100svh]" />
      <Summary as="section" id="summary" />
      {/* <Skills as="section" id="skills" /> */}
      {/* <Experience as="section" id="experience" /> */}
      {/* <Projects as="section" id="projects" /> */}
      <Contact as="section" id="contact" />
    </>
  );
}
