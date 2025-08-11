import Contact from '@/app/(home)/components/contact';
import Hero from '@/app/(home)/components/hero';
import Summary from '@/app/(home)/components/summary';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
    <div className="flex flex-col gap-8">
      <Hero as="section" id="hero" className="min-h-[100svh]" />
      <Summary as="section" id="summary" />
      {/* <Skills as="section" id="skills" /> */}
      {/* <Experience as="section" id="experience" /> */}
      {/* <Projects as="section" id="projects" /> */}
      <Contact as="section" id="contact" />
    </div>
  );
}
