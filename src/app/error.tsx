'use client';

import AppError from '@/components/app-error';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
}

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('app.error');

  return {
    title: {
      absolute: t('title'),
    },
  };
}

// https://nextjs.org/docs/app/api-reference/file-conventions/error
export default function ErrorPage({ error }: ErrorPageProps) {
  const t = useTranslations('app.error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AppError className="min-h-[100svh]" title={t('title')} error={error} />
  );
}
