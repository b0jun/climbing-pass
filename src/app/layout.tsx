import './globals.css';
import { Noto_Sans, Noto_Sans_KR, Inter } from 'next/font/google';
import { getLocale } from 'next-intl/server';

import { Providers } from './components/Providers';

import type { Metadata, Viewport } from 'next';
import { Toast } from '@/shared/components';

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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${notoSansKr.className} ${notoSans.className}`}>
        <Providers>{children}</Providers>
        <Toast />
      </body>
    </html>
  );
}
