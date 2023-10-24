import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

const inter = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
	title: 'Pass',
};
const locales = ['ko', 'en'];

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
			<body className={inter.className}>{children}</body>
		</html>
	);
}
