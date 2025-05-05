'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { passAnalyticsQueries } from '@/shared/lib/react-query/factory';

export function useCurrentMonthStats(queryParams: string) {
  const query = useSuspenseQuery(passAnalyticsQueries.currentMonthStat(queryParams));
  return query;
}
