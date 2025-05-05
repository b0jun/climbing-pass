import { PassType } from '@prisma/client';
import { Suspense } from 'react';

import { QueryPrefetcher } from '@/shared/components';
import { passQueries } from '@/shared/lib/react-query/factory';

import { FilterControlsClient, PassListClient, VisitorStatsClient, VisitorStatsSkeleton } from './components';

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
        <QueryPrefetcher queryOptions={passQueries.visitorStat(visitorStatsQueryParams)}>
          <VisitorStatsClient queryParams={visitorStatsQueryParams} />
        </QueryPrefetcher>
      </Suspense>
      <QueryPrefetcher queryOptions={passQueries.list(passListQueryParams)}>
        <PassListClient queryParams={passListQueryParams} />
      </QueryPrefetcher>
    </div>
  );
}
