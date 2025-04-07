import { queryOptions } from '@tanstack/react-query';

import { passDetailFn } from '@/app/admin/[gym]/pass-list/[id]/fetchFn/passDetailFn';
import { PassDetailParams } from '@/app/admin/[gym]/pass-list/[id]/types/pass-detail.type';
import { passListFn } from '@/app/admin/[gym]/pass-list/fetchFn/passListFn';
import { visitorStatsFn } from '@/app/admin/[gym]/pass-list/fetchFn/visitorStatsFn';
import { PassListParams, VisitorStatsParams } from '@/app/admin/[gym]/pass-list/types/pass-list.type';

const passKeys = {
  base: [{ scope: 'pass' }] as const,
  lists: () => [{ ...passKeys.base[0], entity: 'passList' }] as const,
  list: (params: PassListParams) =>
    queryOptions({
      queryKey: [{ ...passKeys.lists()[0], params }] as const,
      queryFn: () => passListFn(params),
      refetchInterval: 15000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    }),
  visitorStats: () => [{ ...passKeys.base[0], entity: 'visitorStats' }] as const,
  visitorStat: (params: VisitorStatsParams) =>
    queryOptions({
      queryKey: [{ ...passKeys.visitorStats()[0], params }] as const,
      queryFn: () => visitorStatsFn(params),
      refetchInterval: 15000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    }),
  details: () => [{ ...passKeys.base[0], entity: 'passDetail' }] as const,
  detail: (params: PassDetailParams) =>
    queryOptions({
      queryKey: [{ ...passKeys.details()[0], params }] as const,
      queryFn: () => passDetailFn(params),
    }),
};

export { passKeys };
