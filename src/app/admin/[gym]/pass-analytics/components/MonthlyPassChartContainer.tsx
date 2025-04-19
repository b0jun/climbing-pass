import { delay } from '@/shared/utils';

import { getRecentMonthlyPassStats } from '../actions/getRecentMonthlyPassStats';

import { MonthlyPassChartClient } from './MonthlyPassChartClient';

export async function MonthlyPassChartContainer({ gym }: { gym: string }) {
  await delay(300);
  const response = await getRecentMonthlyPassStats(gym);
  if (!response.success) throw new Error(response.message);
  return <MonthlyPassChartClient data={response.data} />;
}
