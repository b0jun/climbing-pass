import { QueryPrefetcher } from '@/shared/components';
import { passAnalyticsQueries } from '@/shared/lib/react-query/factory';

import { CurrentMonthStatsClient } from './components/CurrentMonthStatsClient';

export default async function CurrentMonthStatsPage({ params }: { params: Promise<{ gym: string }> }) {
  const { gym } = await params;
  return (
    <QueryPrefetcher queryOptions={passAnalyticsQueries.currentMonthStat(gym)}>
      <CurrentMonthStatsClient gym={gym} />
    </QueryPrefetcher>
  );
}
