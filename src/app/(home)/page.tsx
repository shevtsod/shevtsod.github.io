import Contact from '@/app/(home)/components/contact';
import Hero from '@/app/(home)/components/hero';
import Summary from '@/app/(home)/components/summary';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Experience from './components/experience';
import Projects from './components/projects';
import Skills from './components/skills';

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('app.(home).page');

  return {
    title: t('title'),
  };
}

/**
 * Renders the home page.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero as="section" id="hero" className="min-h-[100svh]" />
      <Summary as="section" id="summary" />
      <div className="image-pixelated bg-repeat bg-[length:768px_768px] bg-[url('/images/ui/stacks-light.gif')] dark:bg-[url('/images/ui/stacks-dark.gif')]">
        <Skills as="section" id="skills" />
        <Experience as="section" id="experience" />
      </div>
      <Projects as="section" id="projects" />
      <Contact as="section" id="contact" />
    </div>
  );
}
