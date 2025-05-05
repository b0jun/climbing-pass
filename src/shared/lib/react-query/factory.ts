import { queryOptions } from '@tanstack/react-query';

import { getCurrentMonthStats } from '@/app/admin/[gym]/pass-analytics/@currentMonthStats/lib/getCurrentMonthStats';
import { getPassDetail } from '@/app/admin/[gym]/pass-list/[id]/actions/getPassDetail';
import { PassDetailParams } from '@/app/admin/[gym]/pass-list/[id]/types/pass-detail.type';
import { getPassList, getVisitorStats } from '@/app/admin/[gym]/pass-list/actions';
import { PassListParams, VisitorStatsParams } from '@/app/admin/[gym]/pass-list/types/pass-list.type';

const passQueries = {
  base: [{ scope: 'pass' }] as const,
  lists: () => [{ ...passQueries.base[0], entity: 'passList' }] as const,
  list: (params: PassListParams) =>
    queryOptions({
      queryKey: [{ ...passQueries.lists()[0], ...params }] as const,
      queryFn: async () => {
        const response = await getPassList(params);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      },
      // TODO: SSE
    }),
  visitorStats: () => [{ ...passQueries.base[0], entity: 'visitorStats' }] as const,
  visitorStat: (params: VisitorStatsParams) =>
    queryOptions({
      queryKey: [{ ...passQueries.visitorStats()[0], ...params }] as const,
      queryFn: async () => {
        const response = await getVisitorStats(params);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      },
    }),
  details: () => [{ ...passQueries.base[0], entity: 'passDetail' }] as const,
  detail: (params: PassDetailParams) =>
    queryOptions({
      queryKey: [{ ...passQueries.details()[0], ...params }] as const,
      queryFn: () => getPassDetail(params),
    }),
};

const passAnalyticsQueries = {
  base: [{ scope: 'pass-analytics' }] as const,
  currentMonthStats: () => [{ ...passAnalyticsQueries.base[0], entity: 'currentMonthStats' }] as const,
  currentMonthStat: (params: string) =>
    queryOptions({
      queryKey: [{ ...passAnalyticsQueries.currentMonthStats()[0], params }] as const,
      queryFn: () => getCurrentMonthStats(params),
    }),
};

export { passQueries, passAnalyticsQueries };
