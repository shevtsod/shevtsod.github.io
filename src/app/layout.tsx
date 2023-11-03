import 'devicon/devicon.min.css';
import { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Layout from '../components/layout/Layout';
import { Providers } from './providers';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: {
    default: '@shevtsod',
    template: '%s | @shevtsod',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export interface RootLayoutParams {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutParams) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
