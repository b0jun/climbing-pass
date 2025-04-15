import { getCurrentMonthStats } from './actions/getCurrentMonthStats';
import { CurrentMonthStats } from './components';

interface PassAnalyticsPage {
  params: Promise<{ gym: string }>;
}

export default async function PassAnalyticsPage({ params }: PassAnalyticsPage) {
  const { gym } = await params;
  const response = await getCurrentMonthStats(gym);
  if (!response.success) {
    throw new Error(response.message);
  }

  return <CurrentMonthStats stats={response.data} />;
}
