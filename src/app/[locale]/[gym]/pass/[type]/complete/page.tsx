import cn from 'classnames';
import { CalendarCheck, UserRoundPlus } from 'lucide-react';
import { Oswald } from 'next/font/google';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import { Link } from '@/i18n/navigation';

import { PassValidType } from '../types/passType.type';

const oswald = Oswald({ subsets: ['latin'], weight: ['500'] });

interface CompletePageProps {
  params: Promise<{ gym: string; type: PassValidType }>;
}
export default function CompletePage({ params }: CompletePageProps) {
  const { gym, type } = use(params);

  const isDayPass = type === 'day-pass';
  const t = useTranslations('Complete');

  const currentDate = new Date().toLocaleDateString('ko-KR');

  return (
    <div className="relative flex flex-1 items-center justify-center bg-gradient-to-b from-blue-100 to-contents to-50%">
      <div className="absolute right-4 top-4">
        <Link
          href={`/${gym}/pass`}
          replace
          className="flex items-center gap-2 rounded-md bg-main px-3 py-2 text-white transition-transform duration-150 ease-in-out active:scale-95"
        >
          <UserRoundPlus size={16} />
          추가 등록하기
        </Link>
      </div>
      <section className="flex w-full flex-col items-center px-4 text-center">
        <Image src="/images/complete.png" width={128} height={128} alt="complete" className="animate-bounce" />
        <h3 className="my-3 text-2xl font-bold tracking-tight">{t(isDayPass ? 'titlePass' : 'titleExperience')}</h3>
        <div className="mx-auto mb-6 h-1 w-16 rounded bg-gradient-to-r from-blue-400 to-blue-500"></div>
        <h4 className="text-lg tracking-tight text-gray-500">{t('description')}</h4>
        <div className={cn('mt-6 flex items-center gap-2 text-sm font-medium text-blue-900', oswald.className)}>
          <CalendarCheck size={16} /> {currentDate}
        </div>
      </section>
    </div>
  );
}
