import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={`${notoSansKr.className} ${notoSans.className}`}>
				<ReactQuery>
					<NextAuth>
						<Providers>{children}</Providers>
					</NextAuth>
				</ReactQuery>
				{/* <Analytics /> */}
				<Toast />
			</body>
		</html>
	);
}
