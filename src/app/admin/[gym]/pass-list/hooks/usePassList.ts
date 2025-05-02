'use client';

import { useQuery } from '@tanstack/react-query';

import { passKeys } from '@/shared/lib/react-query/factory';

import { PassListParams } from '../types/pass-list.type';

export function usePassList(queryParams: PassListParams) {
  const query = useQuery(passKeys.list(queryParams));
  return query;
}
