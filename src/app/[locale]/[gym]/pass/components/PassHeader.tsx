import Image from 'next/image';

import { LanguageSelector } from '@/shared/components';
import { capitalizeFirstLetter } from '@/shared/utils';

import { getGymInfo } from '../actions/getGymInfo';

import BackButton from './BackButton';
import GymInfo from './GymInfo';

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
      <GymInfo name={name} location={location} isKo={isKo} />
    </div>
  );
};

export default PassHeader;
