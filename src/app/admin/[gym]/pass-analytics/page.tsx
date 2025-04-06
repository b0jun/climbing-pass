import { getCurrentMonthStats } from './actions/getCurrentMonthStats';
import { CurrentMonthStats } from './components';

interface PassAnalyticsPage {
  params: Promise<{ gym: string }>;
}

export default async function PassAnalyticsPage({ params }: PassAnalyticsPage) {
  const { gym } = await params;
  const stats = await getCurrentMonthStats(gym);
  return <CurrentMonthStats stats={stats} />;
}
