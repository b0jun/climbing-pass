'use client';

import cn from 'classnames';
import { motion } from 'framer-motion';
import { Locale, useLocale } from 'next-intl';
import { memo, useCallback } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation.public';

const LANGUAGE_OPTIONS = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
] as const;

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
    <div className="relative flex gap-2">
      {LANGUAGE_OPTIONS.map(({ value, label }) => {
        const isActive = locale === value;
        return (
          <motion.button
            key={value}
            type="button"
            value={value}
            onClick={handleToggleLanguage}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={cn(
              'relative z-10 rounded-2xl px-3 py-1 text-xs font-medium transition-colors',
              isActive ? 'text-white' : 'text-[#121619]',
            )}
          >
            {label}
            {isActive && (
              <motion.div
                layoutId="language-indicator"
                className="absolute inset-0 -z-10 rounded-2xl bg-[#0066ff]"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
