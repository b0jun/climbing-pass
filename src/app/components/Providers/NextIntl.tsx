import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { use } from 'react';

interface NextIntlProviderProps {
  children: React.ReactNode;
}

export function NextIntlProvider({ children }: NextIntlProviderProps) {
  const messages = use(getMessages());

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
