'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { passAnalyticsKeys } from '@/shared/lib/react-query/factory';

export function useCurrentMonthStats(queryParams: string) {
  const query = useSuspenseQuery(passAnalyticsKeys.currentMonthStat(queryParams));
  return query;
}
