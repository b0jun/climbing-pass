import cn from 'classnames';
import { getTranslations, getLocale } from 'next-intl/server';

import { db } from '@/shared/lib/prisma';

import { PassHeader } from '../../components';
import { PassValidType } from '../types/passType.type';

import { ConsentForm } from './components';

interface ConsentPageProps {
  params: Promise<{ type: PassValidType; gym: string }>;
}

export default async function ConsentPage({ params }: ConsentPageProps) {
  const { gym, type } = await params;

  const gymData = await db.gym.findFirst({
    where: { domain: gym },
    select: { name: true, name_en: true },
  });

  if (!gymData) {
    throw new Error(`${gym} 데이터를 찾을 수 없습니다.`);
  }

  const tCommon = await getTranslations('Common');
  const tConsent = await getTranslations('Consent');

  const locale = await getLocale();
  const isKo = locale === 'ko';

  return (
    <div className="relative flex w-full flex-1 flex-col bg-gradient-to-b from-blue-100 to-contents to-30%">
      <PassHeader gym={gym} isKo={isKo} hasBack />
      <div className="px-4 xs:px-10">
        <div
          className={cn(
            'mb-4 mt-2 flex flex-col items-center gap-2 text-[#121619]',
            isKo ? 'tracking-tight' : 'tracking-tighter',
          )}
        >
          <p className="text-xl font-bold opacity-80">{tConsent('title', { type: tCommon(type) })}</p>
          <p className="text-sm opacity-30">{tConsent('subTitle')}</p>
        </div>
        <ConsentForm type={type} gymData={gymData} />
      </div>
    </div>
  );
}
