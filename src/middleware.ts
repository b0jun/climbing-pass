import createMiddleware from 'next-intl/middleware';

import { localePrefix, defaultLocale, locales, pathnames } from './config';

export default createMiddleware({
	locales,
	defaultLocale,
	localePrefix,
	pathnames,
});

export const config = {
	matcher: ['/', '/en/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
