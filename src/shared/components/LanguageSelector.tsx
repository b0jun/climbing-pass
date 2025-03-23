'use client';

import cn from 'classnames';
import { useLocale } from 'next-intl';
import { memo, useCallback } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';

const LANGUAGE_OPTIONS = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
] as const;
type Locale = (typeof LANGUAGE_OPTIONS)[number]['value'];

const LanguageSelector = memo(() => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleToggleLanguage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const newLocale = event.currentTarget.value as Locale;
      router.replace({ pathname }, { locale: newLocale });
    },
    [pathname, router],
  );

  return (
    <div className="flex gap-2">
      {LANGUAGE_OPTIONS.map(({ value, label }) => {
        const isActive = locale === value;
        return (
          <button
            key={value}
            type="button"
            value={value}
            onClick={handleToggleLanguage}
            className={cn(
              'flex rounded-2xl px-2 py-1 text-xs font-medium transition-colors duration-200',
              isActive ? 'bg-[#0066ff] text-white' : 'text-[#121619] hover:bg-gray-100',
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
