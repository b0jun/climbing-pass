'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { passKeys } from '@/shared/lib/react-query/factory';

import { PassDetailParams } from '../types/pass-detail.type';

export function usePassDetail(queryParams: PassDetailParams) {
  const query = useSuspenseQuery(passKeys.detail(queryParams));
  return query;
}
