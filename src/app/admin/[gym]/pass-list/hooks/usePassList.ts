'use client';

import { PassType } from '@prisma/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { passKeys } from '@/shared/lib/react-query/factory';

export function usePassList(gym: string) {
  const searchParams = useSearchParams();
  const passType = (searchParams.get('passType') as PassType) || undefined;
  const passDate = searchParams.get('passDate') || undefined;

  const query = useSuspenseQuery(passKeys.list({ gym, passType, passDate }));
  return query;
}
