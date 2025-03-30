import { Pass } from '@prisma/client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { passKeys } from '@/shared/lib/react-query/factory';
import { makeServerQueryClient } from '@/shared/lib/react-query/queryClient.server';

import { PassDetailClient } from './components/PassDetailClient';

interface PassDetailProps {
  params: Promise<{ gym: string; id: Pass['id'] }>;
}

export default async function PassDetailPage({ params }: PassDetailProps) {
  const { gym, id } = await params;
  const queryParams = { gym, id };
  const queryClient = makeServerQueryClient();
  await queryClient.prefetchQuery(passKeys.detail({ gym, id }));
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <PassDetailClient queryParams={queryParams} />
    </HydrationBoundary>
  );
}
