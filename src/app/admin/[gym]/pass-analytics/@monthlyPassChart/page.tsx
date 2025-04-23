import { delay } from '@/shared/utils';

import { MonthlyPassChartClient } from './components/MonthlyPassChartClient';
import { getRecentMonthlyPassStats } from './lib/getRecentMonthlyPassStats';

export default async function MonthlyPassChartPage({ params }: { params: Promise<{ gym: string }> }) {
  const { gym } = await params;
  await delay(300);
  const data = await getRecentMonthlyPassStats(gym);
  return <MonthlyPassChartClient data={data} />;
}
