import '../globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';

import type { Metadata } from 'next';

const inter = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700'] });

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
	const currentLocale = useLocale();
	if (locale !== currentLocale) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
