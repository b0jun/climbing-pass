import { QueryPrefetcher } from '@/shared/components';
import { passAnalyticsKeys } from '@/shared/lib/react-query/factory';

import { CurrentMonthStatsClient } from './components/CurrentMonthStatsClient';

export default async function CurrentMonthStatsPage({ params }: { params: Promise<{ gym: string }> }) {
  const { gym } = await params;
  return (
    <QueryPrefetcher queryOptions={passAnalyticsKeys.currentMonthStat(gym)}>
      <CurrentMonthStatsClient gym={gym} />
    </QueryPrefetcher>
  );
}
