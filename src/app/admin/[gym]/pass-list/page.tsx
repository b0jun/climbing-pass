import { PassType } from '@prisma/client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { passKeys } from '@/shared/lib/react-query/factory';
import { makeServerQueryClient } from '@/shared/lib/react-query/queryClient.server';

import { PassListClient } from './components';

interface PassListProps {
  params: Promise<{ gym: string }>;
  searchParams: Promise<{ passType?: PassType; passDate?: string }>;
}

export default async function PassListPage({ params, searchParams }: PassListProps) {
  const { gym } = await params;
  const { passType, passDate } = await searchParams;
  const queryParams = { gym, passType, passDate };
  const queryOptions = passKeys.list({ gym, passType, passDate });
  const queryClient = makeServerQueryClient();
  await queryClient.prefetchQuery(queryOptions);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PassListClient queryParams={queryParams} />
    </HydrationBoundary>
  );
}
