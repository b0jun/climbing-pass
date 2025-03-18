'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';

const LanguageSelector = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const isKo = locale === 'ko';

  const toggleLanguage = (newLocale: string) => {
    router.replace({ pathname }, { locale: newLocale });
  };
  return (
    <div className="flex gap-2">
      <button
        onClick={() => toggleLanguage('ko')}
        className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
          isKo ? 'bg-[#0066ff] text-white' : 'text-[#121619]'
        }`}
      >
        한국어
      </button>
      <button
        onClick={() => toggleLanguage('en')}
        className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
          !isKo ? 'bg-[#0066ff] text-white' : 'text-[#121619]'
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSelector;
