import { dehydrate, HydrationBoundary, QueryKey, FetchQueryOptions } from '@tanstack/react-query';

import { getQueryClient } from '../lib/react-query/get-query-client';

interface QueryPrefetcherProps<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  children: React.ReactNode;
  queryOptions: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
}

const QueryPrefetcher = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  children,
  queryOptions,
}: QueryPrefetcherProps<TQueryFnData, TError, TData, TQueryKey>) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(queryOptions);

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default QueryPrefetcher;
