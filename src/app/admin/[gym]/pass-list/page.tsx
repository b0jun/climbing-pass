import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { passKeys } from '@/shared/lib/react-query/factory';
import { makeServerQueryClient } from '@/shared/lib/react-query/queryClient.server';

import { getPassList } from './actions';
import { PassListClient } from './components';

interface PassListProps {
  params: Promise<{ gym: string }>;
  searchParams: Promise<{ passType?: 'DayPass' | 'DayExperience'; passDate?: string }>;
}

export default async function PassListPage({ params, searchParams }: PassListProps) {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/login');
  }

  const { gym } = await params;
  const { passType, passDate } = await searchParams;

  const queryClient = makeServerQueryClient();

  // TODO: query Fn 공용로직으로 빼기
  await queryClient.prefetchQuery({
    queryKey: passKeys.list({ gym, passType, passDate }),
    queryFn: async ({ queryKey }) => {
      const [
        {
          params: { gym, passDate, passType },
        },
      ] = queryKey as ReturnType<typeof passKeys.list>;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const passListData = await getPassList({ gym, passDate, passType });
      return passListData;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PassListClient gym={gym} />
    </HydrationBoundary>
  );
}
