'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { signOut } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error: any, query) => {
			if (
				error.response.data.message === 'TokenExpiredError' ||
				error.response.data.message === 'JsonWebTokenError'
			) {
				signOut();
			}
		},
	}),
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
