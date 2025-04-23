import { delay } from '@/shared/utils';

import { CurrentMonthStatsClient } from './components/CurrentMonthStatsClient';
import { getCurrentMonthStats } from './lib/getCurrentMonthStats';

export default async function CurrentMonthStatsPage({ params }: { params: Promise<{ gym: string }> }) {
  const { gym } = await params;

  await delay(300);
  const data = await getCurrentMonthStats(gym);
  return <CurrentMonthStatsClient data={data} />;
}
