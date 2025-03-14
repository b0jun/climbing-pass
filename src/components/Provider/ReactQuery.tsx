'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { signOut } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  // * TODO: Query Error 적용
  // queryCache: new QueryCache({
  //   onError: (error: any, query) => {
  //   },
  // }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: false,
    },
  },
});

const ReactQuery = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQuery;
