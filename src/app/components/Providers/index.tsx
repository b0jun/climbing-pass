import { ClientProviders } from './ClientProviders';
// import { NextIntlProvider } from './NextIntl';

interface ProviderProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    // <NextIntlProvider>
    <ClientProviders>{children}</ClientProviders>
    // </NextIntlProvider>
  );
}
