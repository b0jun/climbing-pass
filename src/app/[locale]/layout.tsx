import './globals.css';
import { Inter, Nanum_Gothic, Noto_Sans, Noto_Sans_KR, Noto_Serif } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import Providers from '@/components/Providers';
import { locales } from '@/constants/locales';

import type { Metadata } from 'next';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
	title: 'Pass',
};

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: 'ko' | 'en' };
}) {
	const messages = useMessages();
	const isValidLocale = locales.some((cur) => cur === locale);
	if (!isValidLocale) notFound();

	return (
		<html lang={locale}>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={`${notoSansKr.className} ${notoSans.className}`}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
