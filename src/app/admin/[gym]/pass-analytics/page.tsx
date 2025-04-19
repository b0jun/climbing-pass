import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  CurrentMonthStatsContainer,
  CurrentMonthStatsSkeleton,
  ErrorSection,
  MonthlyPassChartContainer,
  MonthlyPassChartSkeleton,
} from './components';

interface PassAnalyticsPage {
  params: Promise<{ gym: string }>;
}

export default async function PassAnalyticsPage({ params }: PassAnalyticsPage) {
  const { gym } = await params;

  return (
    <div className="grid grid-cols-1 gap-4">
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense fallback={<CurrentMonthStatsSkeleton />}>
          <CurrentMonthStatsContainer gym={gym} />
        </Suspense>
      </ErrorBoundary>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ErrorBoundary fallback={<ErrorSection />}>
          <Suspense fallback={<MonthlyPassChartSkeleton />}>
            <MonthlyPassChartContainer gym={gym} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
