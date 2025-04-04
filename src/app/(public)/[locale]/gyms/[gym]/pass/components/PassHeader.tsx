'use client';

import cn from 'classnames';
import Image from 'next/image';

import { usePathname } from '@/i18n/navigation.public';
import { LanguageSelector } from '@/shared/components';

import { useGymInfo } from '../../hooks/useGymInfo';

import { BackButton } from './BackButton';
import GymInfo from './GymInfo';

export function PassHeader() {
  const { logo } = useGymInfo();
  const pathname = usePathname();
  if (pathname.includes('complete')) return null;

  const showBackButton = pathname.includes('consent');

  return (
    <div className="bg-blue-100">
      <header className="flex h-14 w-full max-w-xl items-center justify-between px-2">
        <div className="relative flex min-w-0 items-center gap-1">
          <div
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300',
              showBackButton ? 'visible translate-x-0 opacity-100' : 'invisible -translate-x-2 opacity-0',
            )}
          >
            <BackButton />
          </div>
          {logo && (
            <div
              className={cn(
                'relative aspect-video h-8 w-full transition-all duration-300 ease-in-out',
                showBackButton ? 'ml-8' : 'ml-0',
              )}
            >
              <Image key="pass-logo" priority loading="eager" src={logo} alt="logo" fill className="object-contain" />
            </div>
          )}
        </div>
        <LanguageSelector />
      </header>
      <GymInfo />
    </div>
  );
}

export default PassHeader;
