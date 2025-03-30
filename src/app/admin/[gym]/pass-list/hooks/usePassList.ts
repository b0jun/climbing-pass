'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { passKeys } from '@/shared/lib/react-query/factory';

import { PassListParams } from '../types/pass-list.type';

export function usePassList(queryParams: PassListParams) {
  const query = useSuspenseQuery(passKeys.list(queryParams));
  return query;
}
