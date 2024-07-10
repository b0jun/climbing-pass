import { Pathnames, LocalePrefix } from 'next-intl/routing';

export const pathnames: Pathnames<typeof locales> = {
	'/': '/',
};
export const defaultLocale = 'ko' as const;
export const locales = ['ko', 'en'] as const;
export const localePrefix: LocalePrefix<typeof locales> = 'as-needed';
