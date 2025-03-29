'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { passKeys } from '@/shared/lib/react-query/factory';

export function usePassDetail() {
  const { gym, id } = useParams();

  const query = useSuspenseQuery(passKeys.detail({ gym: gym as string, id: id as string }));
  return query;
}
