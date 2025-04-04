'use client';

import cn from 'classnames';
import { LucideIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import React from 'react';

import { Link, usePathname } from '@/i18n/navigation.public';

interface PassLinkProps {
  label: string;
  subLabel: string;
  icon: React.ReactElement<LucideIcon>;
  type: 'day-pass' | 'day-experience';
  extraText?: string;
  onClick?: () => void;
}

export function PassLink({ label, subLabel, icon, type, extraText, onClick }: PassLinkProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const isKo = locale === 'ko';

  const buttonStyles = {
    'day-pass':
      'border-blue-200 bg-gradient-to-b from-blue-400 via-blue-400 to-blue-500 shadow-[inset_0_1px_0px_0px_#93c5fd]',
    'day-experience':
      'border-blue-300 bg-gradient-to-b from-blue-500 via-blue-500 to-blue-600 shadow-[inset_0_1px_0px_0px_#60a5fa]',
  };

  const className = cn(
    'relative flex h-[200px] flex-1 flex-col rounded-xl border p-3 text-neutral-50 transition-transform duration-150 ease-in-out active:scale-[0.98] active:bg-opacity-100 active:[box-shadow:none] xs:p-4',
    buttonStyles[type],
  );
  return (
    <Link href={`${pathname}/${type}/consent`} onClick={onClick} className={className}>
      <div className={cn('font-bold tracking-tight', isKo ? 'text-xl xs:text-2xl' : 'text-lg xs:text-xl')}>{label}</div>
      {isKo && <div className="mt-1 text-[13px] tracking-tighter opacity-80 xs:text-[15px]">{subLabel}</div>}
      {extraText && <div className="mt-1 whitespace-pre-wrap text-[11px] tracking-tight opacity-60">{extraText}</div>}
      <div className="absolute bottom-3 right-3 opacity-20 xs:bottom-4 xs:right-4">{icon}</div>
    </Link>
  );
}

export default PassLink;
