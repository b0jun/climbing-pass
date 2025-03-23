import cn from 'classnames';
import { Roboto } from 'next/font/google';
import Image from 'next/image';

import { LanguageSelector } from '@/shared/components';
import { capitalizeFirstLetter } from '@/shared/utils';

import { getGymInfo } from '../actions/getGymInfo';

import BackButton from './BackButton';

const roboto = Roboto({ subsets: ['latin'], weight: ['700'] });

interface PassHeaderProps {
  hasBack?: boolean;
  gym: string;
  isKo: boolean;
}

const PassHeader = async ({ hasBack = false, gym, isKo }: PassHeaderProps) => {
  const gymInfo = await getGymInfo(gym);
  const name = isKo ? gymInfo.names.ko : capitalizeFirstLetter(gymInfo.names.en);
  const location = isKo ? gymInfo.locations.ko : capitalizeFirstLetter(gymInfo.locations.en);
  return (
    <div>
      <header className="flex h-14 w-full max-w-xl items-center justify-between px-2">
        <div className="flex gap-1">
          {hasBack && <BackButton />}
          {gymInfo.logo ? (
            <div className="relative aspect-video h-8 w-full">
              <Image
                key="pass-logo"
                priority
                loading="eager"
                src={gymInfo.logo}
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
          ) : null}
        </div>
        <LanguageSelector />
      </header>
      <div className="mt-3 flex flex-1 flex-col px-4 xs:px-10">
        <p className={cn('text-xl font-bold leading-relaxed text-[#121619]', { [roboto.className]: !isKo })}>
          <span className="text-3xl text-blue-600">{name}</span>
          <br />
          <span className="text-xl font-medium text-[#121619]/60">{location}</span>
        </p>
        <div className="my-2 h-1 w-16 rounded bg-gradient-to-r from-blue-400 to-blue-500" />
      </div>
    </div>
  );
};

export default PassHeader;
