import { queryOptions } from '@tanstack/react-query';

import { getCurrentMonthStats } from '@/app/admin/[gym]/pass-analytics/@currentMonthStats/lib/getCurrentMonthStats';
import { getPassDetail } from '@/app/admin/[gym]/pass-list/[id]/actions/getPassDetail';
import { PassDetailParams } from '@/app/admin/[gym]/pass-list/[id]/types/pass-detail.type';
import { getPassList, getVisitorStats } from '@/app/admin/[gym]/pass-list/actions';
import { PassListParams, VisitorStatsParams } from '@/app/admin/[gym]/pass-list/types/pass-list.type';

const passKeys = {
  base: [{ scope: 'pass' }] as const,
  lists: () => [{ ...passKeys.base[0], entity: 'passList' }] as const,
  list: (params: PassListParams) =>
    queryOptions({
      queryKey: [{ ...passKeys.lists()[0], ...params }] as const,
      queryFn: async () => {
        const response = await getPassList(params);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      },
      // TODO: SSE
    }),
  visitorStats: () => [{ ...passKeys.base[0], entity: 'visitorStats' }] as const,
  visitorStat: (params: VisitorStatsParams) =>
    queryOptions({
      queryKey: [{ ...passKeys.visitorStats()[0], ...params }] as const,
      queryFn: async () => {
        const response = await getVisitorStats(params);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      },
    }),
  details: () => [{ ...passKeys.base[0], entity: 'passDetail' }] as const,
  detail: (params: PassDetailParams) =>
    queryOptions({
      queryKey: [{ ...passKeys.details()[0], ...params }] as const,
      queryFn: () => getPassDetail(params),
    }),
};

const passAnalyticsKeys = {
  base: [{ scope: 'pass-analytics' }] as const,
  currentMonthStats: () => [{ ...passAnalyticsKeys.base[0], entity: 'currentMonthStats' }] as const,
  currentMonthStat: (params: string) =>
    queryOptions({
      queryKey: [{ ...passAnalyticsKeys.currentMonthStats()[0], params }] as const,
      queryFn: () => getCurrentMonthStats(params),
    }),
};

export { passKeys, passAnalyticsKeys };
