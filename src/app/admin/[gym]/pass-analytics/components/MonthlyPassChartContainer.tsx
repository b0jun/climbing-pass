import { delay } from '@/shared/utils';

import { fetchRecentMonthlyPassStats } from '../services/fetchRecentMonthlyPassStats';

import { MonthlyPassChartClient } from './MonthlyPassChartClient';

export async function MonthlyPassChartContainer({ gym }: { gym: string }) {
  await delay(300);
  const data = await fetchRecentMonthlyPassStats(gym);
  return <MonthlyPassChartClient data={data} />;
}
