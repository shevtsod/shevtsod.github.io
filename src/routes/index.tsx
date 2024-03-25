import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import About from '../components/routes/index/about/About';
import Contact from '../components/routes/index/contact/Contact';
import Hero from '../components/routes/index/hero/Hero';
import Projects from '../components/routes/index/projects/Projects';
import Summary from '../components/routes/index/summary/Summary';
import Technologies from '../components/routes/index/technologies/Technologies';
import useTitle from '../hooks/useTitle';
import { ContextType } from './root';

export default function IndexRoute() {
  const { setShowHeaderOnScroll } = useOutletContext<ContextType>();

  useEffect(() => {
    setShowHeaderOnScroll(true);
  }, []);

  return (
    <main>
      <Helmet>
        <title>{useTitle('Home')}</title>
      </Helmet>

      <Hero as="section" id="hero" className="min-h-[100svh]" />
      <Summary as="section" id="summary" />
      <Projects as="section" id="projects" />
      <Technologies as="section" id="technologies" />
      <About as="section" id="about" />
      <Contact as="section" id="contact" />
    </main>
  );
}
