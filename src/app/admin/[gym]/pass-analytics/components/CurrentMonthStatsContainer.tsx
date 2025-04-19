import { delay } from '@/shared/utils';

import { fetchCurrentMonthStats } from '../services/fetchCurrentMonthStats';

import { CurrentMonthStatsClient } from './CurrentMonthStatsClient';

export async function CurrentMonthStatsContainer({ gym }: { gym: string }) {
  await delay(300);
  const data = await fetchCurrentMonthStats(gym);
  return <CurrentMonthStatsClient data={data} />;
}
