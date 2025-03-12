'use client';

import cn from 'classnames';
import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

import BackButton from '../BackButton';

const Header = ({ hasBack = false, bg }: { hasBack?: boolean; bg: string }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const isKo = locale !== 'en';
  return (
    <div className={cn('flex h-12 w-full items-center justify-between pl-3 pr-5', bg)}>
      <BackButton hasBack={hasBack} />
      <div className="flex gap-5">
        <Link href={`${pathname}`} locale="ko" replace>
          <p
            className={cn('flex h-12 items-center text-base text-gray-600', {
              ['underline']: isKo,
            })}
          >
            한국어
          </p>
        </Link>
        <Link href={`${pathname}`} locale="en" replace>
          <p
            className={cn('flex h-12 items-center text-base text-gray-600', {
              ['underline']: !isKo,
            })}
          >
            English
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
