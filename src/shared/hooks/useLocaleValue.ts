'use client';

import { useLocale } from 'next-intl';

export function useLocaleValue<T extends Record<string, any>>(obj: T, fallback: string = 'en') {
  const locale = useLocale();
  const short = locale.split('-')[0];
  return obj[short] ?? obj[fallback];
}
