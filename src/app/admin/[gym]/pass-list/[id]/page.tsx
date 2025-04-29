import { Pass } from '@prisma/client';
import { Suspense } from 'react';

import { QueryPrefetcher } from '@/shared/components';
import { passKeys } from '@/shared/lib/react-query/factory';

import { PassDetailClient } from './components/PassDetailClient';

interface PassDetailProps {
  params: Promise<{ gym: string; id: Pass['id'] }>;
}

export default async function PassDetailPage({ params }: PassDetailProps) {
  const { gym, id } = await params;
  const queryParams = { gym, id };
  return (
    <Suspense>
      <QueryPrefetcher queryOptions={passKeys.detail({ gym, id })}>
        <PassDetailClient queryParams={queryParams} />
      </QueryPrefetcher>
    </Suspense>
  );
}
