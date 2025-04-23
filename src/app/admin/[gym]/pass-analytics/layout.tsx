export default function PassAnalyticsLayout({
  currentMonthStats,
  monthlyPassChart,
}: {
  children: React.ReactNode;
  currentMonthStats: React.ReactNode;
  monthlyPassChart: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {currentMonthStats}
      {monthlyPassChart}
    </div>
  );
}
