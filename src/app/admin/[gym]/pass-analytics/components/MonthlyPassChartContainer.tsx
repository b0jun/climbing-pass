import { delay } from '@/shared/utils';

import { getRecentMonthlyPassStats } from '../lib/getRecentMonthlyPassStats';

import { MonthlyPassChartClient } from './MonthlyPassChartClient';

export async function MonthlyPassChartContainer({ gym }: { gym: string }) {
  await delay(300);
  const data = await getRecentMonthlyPassStats(gym);
  return <MonthlyPassChartClient data={data} />;
}
