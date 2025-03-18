'use client';

import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import React from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';

interface PassHeaderProps {
  left: React.ReactNode;
  right?: React.ReactNode;
}

const PassHeader = ({ left, right }: PassHeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const locale = useLocale();
  const isKo = locale === 'ko';

  const toggleLanguage = (newLocale: string) => {
    router.replace({ pathname }, { locale: newLocale });
  };

  return (
    <header className="fixed top-0 z-10 flex h-14 w-full max-w-xl items-center justify-between px-2">
      <div>{left}</div>
      {right && <div>{right}</div>}
      {/* <div className="flex items-center gap-1 rounded-full bg-stone-300/60 p-1">
        <Globe className="ml-1 h-3 w-3 text-[#0066ff]" />
        <button
          onClick={() => toggleLanguage('ko')}
          className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
            isKo ? 'bg-[#0066ff] text-white' : 'text-[#121619] hover:text-black'
          }`}
        >
          한국어
        </button>
        <button
          onClick={() => toggleLanguage('en')}
          className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
            !isKo ? 'bg-[#0066ff] text-white' : 'text-[#121619] hover:text-black'
          }`}
        >
          English
        </button>
      </div> */}
    </header>
  );
};

export default PassHeader;

{
  /* <Link
href={pathname}
locale="ko"
replace
className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
  isKo ? 'bg-[#0066ff] text-white' : 'text-[#121619] hover:text-black'
}`}
>
한국어
</Link>
<Link
href={pathname}
locale="en"
replace
className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
  !isKo ? 'bg-[#0066ff] text-white' : 'text-[#121619] hover:text-black'
}`}
>
English
</Link> */
}
