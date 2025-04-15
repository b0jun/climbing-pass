'use client';

import { useVistorStats } from '../hooks';
import { VisitorStatsParams } from '../types/pass-list.type';

interface VisitorStatsClientProps {
  queryParams: VisitorStatsParams;
}

export function VisitorStatsClient({ queryParams }: VisitorStatsClientProps) {
  const { data } = useVistorStats(queryParams);

  const visitorStats = [
    {
      title: '방문자 수',
      value: data.total,
    },
    {
      title: '일일이용',
      value: data.dayPass,
    },
    {
      title: '일일체험',
      value: data.dayExperience,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {visitorStats.map(({ title, value }) => (
        <div key={title} className="space-y-3 rounded-lg bg-white p-5 shadow-lg">
          <div className="text-sm font-medium leading-4 text-gray-500">{title}</div>
          <div className="text-2xl font-bold leading-6 text-gray-900">{value}</div>
        </div>
      ))}
    </div>
  );
}
