import { delay } from '@/shared/utils';

import { getCurrentMonthStats } from '../actions/getCurrentMonthStats';

import { CurrentMonthStatsClient } from './CurrentMonthStatsClient';

export async function CurrentMonthStatsContainer({ gym }: { gym: string }) {
  await delay(300);
  const response = await getCurrentMonthStats(gym);
  if (!response.success) throw new Error(response.message);
  return <CurrentMonthStatsClient data={response.data} />;
}
