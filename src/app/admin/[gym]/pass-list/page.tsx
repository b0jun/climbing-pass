import { PassType } from '@prisma/client';
import { Suspense } from 'react';

import { QueryPrefetcher } from '@/shared/components';
import { passKeys } from '@/shared/lib/react-query/factory';

import {
  FilterControlsClient,
  PassListClient,
  PassListSkeleton,
  VisitorStatsClient,
  VisitorStatsSkeleton,
} from './components';

interface PassListProps {
  params: Promise<{ gym: string }>;
  searchParams: Promise<{ passType?: PassType; passDate?: string }>;
}

export default async function PassListPage({ params, searchParams }: PassListProps) {
  const { gym } = await params;
  const { passType, passDate } = await searchParams;
  const visitorStatsQueryParams = { gym, passDate };
  const passListQueryParams = { gym, passType, passDate };
  return (
    <div className="space-y-4">
      <FilterControlsClient />
      <Suspense fallback={<VisitorStatsSkeleton />}>
        <QueryPrefetcher queryOptions={passKeys.visitorStat(visitorStatsQueryParams)}>
          <VisitorStatsClient queryParams={visitorStatsQueryParams} />
        </QueryPrefetcher>
      </Suspense>
      <Suspense fallback={<PassListSkeleton />}>
        <QueryPrefetcher queryOptions={passKeys.list(passListQueryParams)}>
          <PassListClient queryParams={passListQueryParams} />
        </QueryPrefetcher>
      </Suspense>
    </div>
  );
}
