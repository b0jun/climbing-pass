import cn from 'classnames';
import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';
import Head from 'next/head';

import { BuildTime, Toast } from '@/shared/components';

import { Providers } from './Providers';

import '../../globals.css';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700', '900'] });

interface DocumentProps {
  children: React.ReactNode;
  locale: string;
}

export default function Document({ children, locale }: DocumentProps) {
  return (
    <html lang={locale}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={cn(notoSansKr.className, notoSans.className)}>
        <BuildTime />
        <Providers>{children}</Providers>
        <Toast />
      </body>
    </html>
  );
}
