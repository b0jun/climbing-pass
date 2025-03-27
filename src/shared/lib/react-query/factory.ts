import { queryOptions } from '@tanstack/react-query';

import { passListFn } from '@/app/admin/[gym]/pass-list/fetchFn/passListFn';
import { PassListParams } from '@/app/admin/[gym]/pass-list/types/pass-list.type';

const passKeys = {
  base: [{ scope: 'pass' }] as const,
  lists: () => [{ ...passKeys.base[0], entity: 'passList' }] as const,
  list: (params: PassListParams) =>
    queryOptions({
      queryKey: [{ ...passKeys.lists()[0], params }],
      queryFn: () => passListFn(params),
    }),
};

export { passKeys };
