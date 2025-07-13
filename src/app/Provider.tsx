import i18n from '@/lib/i18next';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router';
import { router } from './router';

export interface ProviderProps {
  children?: React.ReactNode;
}

export default function Provider({
  // Default to the router, but allow app to specify children instead (e.g. for tests)
  children = <RouterProvider router={router} />,
}: ProviderProps) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
