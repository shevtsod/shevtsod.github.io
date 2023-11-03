import { Metadata } from 'next';
import Hero from '../components/hero/Hero';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Homepage of Daniel Shevtsov',
};

export default function Index() {
  return (
    <>
      <Hero />
      {/* <Technologies /> */}
    </>
  );
}
