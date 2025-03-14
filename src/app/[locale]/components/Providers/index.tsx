import { QueryProvider } from './ReactQuery';
import { NextIntlProvider } from './NextIntl';
import { ClientProviders } from './ClientProviders';

interface ProviderProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    <NextIntlProvider>
      <ClientProviders>{children}</ClientProviders>
    </NextIntlProvider>
  );
}
