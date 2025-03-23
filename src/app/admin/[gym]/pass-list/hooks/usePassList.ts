'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { passKeys } from '@/shared/lib/react-query/factory';

import { getPassList } from '../actions';
import { PassWithVisits } from '../types/pass-list.type';
import { PassType } from '@prisma/client';

export function usePassList(gym: string) {
  const searchParams = useSearchParams();

  const passType = (searchParams.get('passType') as PassType) || undefined;
  const passDate = searchParams.get('passDate') || undefined;

  const query = useSuspenseQuery<PassWithVisits[]>({
    queryKey: passKeys.list({ gym, passType, passDate }),
    // TODO: query Fn 공용로직으로 빼기
    queryFn: async ({ queryKey }) => {
      const [
        {
          params: { gym, passDate, passType },
        },
      ] = queryKey as ReturnType<typeof passKeys.list>;
      const passListData = await getPassList({ gym, passDate, passType });
      return passListData;
    },
  });

  return query;
}
