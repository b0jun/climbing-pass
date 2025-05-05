'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { passQueries } from '@/shared/lib/react-query/factory';

import { VisitorStatsParams } from '../types/pass-list.type';

export function useVistorStats(queryParams: VisitorStatsParams) {
  const query = useSuspenseQuery(passQueries.visitorStat(queryParams));
  return query;
}
