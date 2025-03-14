import './globals.css';
// import { Analytics } from '@vercel/analytics/react';
import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';

import Toast from '@/components/Toast';

import type { Metadata, Viewport } from 'next';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Providers } from './components/Providers';

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${notoSansKr.className} ${notoSans.className}`}>
        <Providers>{children}</Providers>
        {/* <Analytics /> */}
        <Toast />
      </body>
    </html>
  );
}
