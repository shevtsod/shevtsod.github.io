import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LayoutContext from '../components/layout/layout/LayoutContext';
import About from '../components/routes/index/about/About';
import Contact from '../components/routes/index/contact/Contact';
import Hero from '../components/routes/index/hero/Hero';
import Projects from '../components/routes/index/projects/Projects';
import Summary from '../components/routes/index/summary/Summary';
import Technologies from '../components/routes/index/technologies/Technologies';
import useTitle from '../hooks/useTitle';

export default function IndexRoute() {
  const { t } = useTranslation('app', { keyPrefix: 'routes.index' });
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
      <Technologies as="section" id="technologies" />
      <Projects as="section" id="projects" />
      <About as="section" id="about" />
      <Contact as="section" id="contact" />
    </>
  );
}
