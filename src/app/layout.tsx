import Root from '@/app/components/root';
import { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import './globals.css';

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return {
    title: {
      template: `｢%s｣ · ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
  };
}

// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
export const viewport: Viewport = {
  themeColor: '#000000',
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Barebones app layout that only includes providers and global styles. Subroutes
 * can define their own layouts.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default async function RootLayout({ children }: RootLayoutProps) {
  // https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <Root as="body">
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </Root>
    </html>
  );
}
