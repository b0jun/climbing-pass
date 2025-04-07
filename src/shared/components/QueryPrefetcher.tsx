import { dehydrate, HydrationBoundary, QueryKey, FetchQueryOptions } from '@tanstack/react-query';

import { makeServerQueryClient } from '@/shared/lib/react-query/queryClient.server';

interface QueryPrefetcherProps<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  children: React.ReactNode;
  queryOptions: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
}

const QueryPrefetcher = async <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  children,
  queryOptions,
}: QueryPrefetcherProps<TQueryFnData, TError, TData, TQueryKey>) => {
  const queryClient = makeServerQueryClient();
  await queryClient.prefetchQuery(queryOptions);
  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default QueryPrefetcher;
