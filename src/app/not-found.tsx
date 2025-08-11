import AppError from '@/components/app-error';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('app.not-found');

  return {
    title: {
      absolute: t('title'),
    },
  };
}

// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
export default async function NotFoundPage() {
  const t = await getTranslations('components.app-error.messages');
  return <AppError className="min-h-[100svh]" error={new Error(t('404'))} />;
}
