import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import About from '../components/routes/index/about/About';
import Contact from '../components/routes/index/contact/Contact';
import Hero from '../components/routes/index/hero/Hero';
import Projects from '../components/routes/index/projects/Projects';
import Summary from '../components/routes/index/summary/Summary';
import Technologies from '../components/routes/index/technologies/Technologies';
import { useAppStore } from '../hooks/useAppStore';
import useTitle from '../hooks/useTitle';

export default function IndexRoute() {
  const { t } = useTranslation('app', { keyPrefix: 'routes.index' });
  const setShowBoot = useAppStore((state) => state.setShowBoot);
  const setShowHeaderOnScroll = useAppStore(
    (state) => state.setShowHeaderOnScroll
  );
  useTitle(t('title'));

  useEffect(() => {
    setShowHeaderOnScroll(true);
    setShowBoot(true);
  }, [setShowBoot, setShowHeaderOnScroll]);

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
