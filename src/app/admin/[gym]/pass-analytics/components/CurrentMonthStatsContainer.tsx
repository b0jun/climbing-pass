import { delay } from '@/shared/utils';

import { getCurrentMonthStats } from '../lib/getCurrentMonthStats';

import { CurrentMonthStatsClient } from './CurrentMonthStatsClient';

export async function CurrentMonthStatsContainer({ gym }: { gym: string }) {
  await delay(300);
  const data = await getCurrentMonthStats(gym);
  return <CurrentMonthStatsClient data={data} />;
}
