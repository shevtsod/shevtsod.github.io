import { Helmet } from 'react-helmet';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';
import Hero from '../components/hero/Hero';
import Projects from '../components/projects/Projects';
import Summary from '../components/summary/Summary';
import Technologies from '../components/technologies/Technologies';
import useTitle from '../hooks/useTitle';

export default function IndexRoute() {
  return (
    <>
      <Helmet>
        <title>{useTitle('Home')}</title>
      </Helmet>
      <main>
        <Hero />
        <Summary />
        <Technologies />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}
