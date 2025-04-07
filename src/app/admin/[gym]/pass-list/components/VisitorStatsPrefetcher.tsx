import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { passKeys } from '@/shared/lib/react-query/factory';
import { makeServerQueryClient } from '@/shared/lib/react-query/queryClient.server';

import { PassListParams } from '../types/pass-list.type';

interface VisitorStatsPrefetcherProps {
  children: React.ReactNode;
  queryParams: PassListParams;
}
export async function VisitorStatsPrefetcher({ children, queryParams }: VisitorStatsPrefetcherProps) {
  const queryOptions = passKeys.list(queryParams);
  const queryClient = makeServerQueryClient();
  await queryClient.prefetchQuery(queryOptions);
  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}
