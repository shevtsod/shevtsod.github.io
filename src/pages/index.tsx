import Hero from '@/components/hero/Hero';
import Technologies from '@/components/technologies/Technologies';
import useTitle from '@/hooks/useTitle';
import Head from 'next/head';

export default function Home() {
  const title = useTitle('Home');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Homepage of Daniel Shevtsov" />
      </Head>
      <Hero />
      <Technologies />
    </>
  );
}
