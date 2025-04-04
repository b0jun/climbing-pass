'use client';

import { BadgeCheck, Sprout } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import PassLink from './PassLink';

export function PassClient() {
  const tCommon = useTranslations('Common');
  const tPass = useTranslations('Pass');
  const locale = useLocale();
  const isKo = locale === 'ko';

  const prompt = isKo ? (
    <p className="text-center text-xl leading-snug text-[#393E46]/40">
      클라이밍 <span className="font-bold text-[#393E46]/90">이용권</span>을
      <br />
      선택해주세요.
    </p>
  ) : (
    <p className="text-center text-xl leading-snug text-[#393E46]/40">
      Choose your climbing <span className="font-bold text-[#393E46]/90">Pass</span>.
    </p>
  );

  return (
    <>
      <div className="flex min-h-[80px] items-center justify-center">{prompt}</div>
      <div className="mt-6 flex w-full justify-between gap-4">
        <PassLink label={tCommon('day-pass')} subLabel="Day Pass" icon={<BadgeCheck size={36} />} type="day-pass" />
        <PassLink
          label={tCommon('day-experience')}
          subLabel="Day Experience"
          icon={<Sprout size={36} />}
          type="day-experience"
          extraText={tPass('firstVisit')}
        />
      </div>
    </>
  );
}
