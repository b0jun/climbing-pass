import { BadgeCheck, Sprout } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { PassHeader, PassLink } from './components';

interface PassPageProps {
  params: Promise<{ gym: string }>;
}

export default async function PassPage({ params }: PassPageProps) {
  const { gym } = await params;
  const tCommon = await getTranslations('Common');
  const tPass = await getTranslations('Pass');

  const locale = await getLocale();
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
    <div className="relative flex w-full flex-1 flex-col bg-gradient-to-b from-blue-100 via-contents to-blue-100">
      <PassHeader gym={gym} isKo={isKo} />
      <div className="flex flex-1 flex-col px-4 xs:px-10">
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex min-h-[80px] items-center justify-center">{prompt}</div>
          <div className="mt-6 flex w-full justify-between gap-4">
            <PassLink label={tCommon('day-pass')} subLabel="Day Pass" icon={<BadgeCheck size={36} />} type="day-pass" />
            <PassLink
              label={tCommon('day-experience')}
              subLabel="Day Experience"
              icon={<Sprout size={36} />}
              type="day-experience"
              extraText={`${tPass('firstVisit')}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
