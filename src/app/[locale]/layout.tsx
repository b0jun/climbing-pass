import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { notFound } from 'next/navigation';

import Providers from '@/components/Providers';
import { locales } from '@/constants/locales';

import type { Metadata } from 'next';

const inter = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700', '900'] });

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
	const isValidLocale = locales.some((cur) => cur === locale);
	if (!isValidLocale) notFound();

	return (
		<html lang={locale}>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
