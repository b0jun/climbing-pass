'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { passKeys } from '@/shared/lib/react-query/factory';

import { VisitorStatsParams } from '../types/pass-list.type';

export function useVistorStats(queryParams: VisitorStatsParams) {
  const query = useSuspenseQuery(passKeys.visitorStat(queryParams));
  return query;
}
