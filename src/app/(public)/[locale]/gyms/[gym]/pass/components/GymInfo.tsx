'use client';

import cn from 'classnames';
import { Roboto } from 'next/font/google';
import { useLocale } from 'next-intl';
import { useRef, useEffect, useState } from 'react';

import { capitalizeFirstLetter } from '@/shared/utils';

import { useGymInfo } from '../../hooks/useGymInfo';

const roboto = Roboto({ subsets: ['latin'], weight: ['700'] });

export function GymInfo() {
  const { names, locations } = useGymInfo();

  const locale = useLocale();
  const isKo = locale === 'ko';
  const name = isKo ? names.ko : capitalizeFirstLetter(names.en);
  const location = isKo ? locations.ko : capitalizeFirstLetter(locations.en);

  const [barWidth, setBarWidth] = useState(0);
  const locationRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (locationRef.current) {
      const newWidth = locationRef.current.offsetWidth;
      if (newWidth !== barWidth) {
        setBarWidth(newWidth);
      }
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
    }
  }, [location, isKo, barWidth]);

  return (
    <div className="xs:px-10 mt-3 flex flex-1 flex-col px-4">
      <p className={cn('text-xl leading-relaxed font-bold text-[#121619]', { [roboto.className]: !isKo })}>
        <span className="text-3xl text-blue-600">{name}</span>
        <br />
        <span ref={locationRef} className="text-xl font-medium text-[#121619]/60">
          {location}
        </span>
      </p>
      <div
        className="my-2 h-1 rounded-sm bg-linear-to-r from-blue-400 to-blue-500 transition-[width] duration-300 ease-linear"
        style={{ width: `${barWidth}px` }}
      />
    </div>
  );
}

export default GymInfo;
