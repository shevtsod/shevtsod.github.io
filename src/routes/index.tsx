import { Helmet } from 'react-helmet-async';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';
import Hero from '../components/hero/Hero';
import Projects from '../components/projects/Projects';
import Summary from '../components/summary/Summary';
import Technologies from '../components/technologies/Technologies';
import useTitle from '../hooks/useTitle';

export default function IndexRoute() {
  return (
    <main>
      <Helmet>
        <title>{useTitle('Home')}</title>
      </Helmet>

      <section id="hero">
        <Hero className="min-h-[100svh]" />
      </section>
      <section id="summary">
        <Summary />
      </section>
      <section id="technologies">
        <Technologies />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
