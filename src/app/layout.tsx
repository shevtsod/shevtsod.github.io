import { ThemeProvider } from '@/components/theme';
import { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import './globals.css';
import { rootClassName } from './root';

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
    // suppressHydrationWarning due to ThemeProvider
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body className={rootClassName}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
