import './globals.css';
// import { Analytics } from '@vercel/analytics/react';
import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import NextAuth from '@/components/Provider/NextAuth';
import ReactQuery from '@/components/Provider/ReactQuery';
import Providers from '@/components/Providers';
import Toast from '@/components/Toast';

import type { Metadata, Viewport } from 'next';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: 'Pass',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${notoSansKr.className} ${notoSans.className}`}>
        <ReactQuery>
          <NextAuth>
            <NextIntlClientProvider messages={messages}>
              <Providers>{children}</Providers>
            </NextIntlClientProvider>
          </NextAuth>
        </ReactQuery>
        {/* <Analytics /> */}
        <Toast />
      </body>
    </html>
  );
}
