'use client';

import { ArrowDownIcon, ArrowUpIcon, Users, Calendar, Info, Rabbit, Turtle } from 'lucide-react';

import { dayjsKST } from '@/shared/lib/dayjs-config';

import { useCurrentMonthStats } from '../hooks/useCurrentMonthStats';

export function CurrentMonthStatsClient({ gym }: { gym: string }) {
  const { data } = useCurrentMonthStats(gym);

  const list = [
    { title: '총 방문자', value: data.total.value, change: parseFloat(data.total.change), icon: Users },
    {
      title: '일일체험 방문자',
      value: data.experience.value,
      change: parseFloat(data.experience.change),
      icon: Turtle,
    },
    { title: '일일이용 방문자', value: data.usage.value, change: parseFloat(data.usage.change), icon: Rabbit },
    {
      title: '일 평균 방문자',
      value: data.dailyAverage.value,
      change: parseFloat(data.dailyAverage.change),
      icon: Calendar,
    },
  ];

  const now = dayjsKST();
  const startOfMonth = now.startOf('month');

  const prevMonth = now.subtract(1, 'month');
  const endOfPrevRange = dayjsKST(prevMonth).endOf('month');
  const startOfPrevMonth = prevMonth.startOf('month');

  const rangeEndDate = Math.min(now.date(), endOfPrevRange.date());
  const prevNow = prevMonth.date(rangeEndDate);

  const formattedPrevRange = `${startOfPrevMonth.format('YYYY년 M월 D일')} ~ ${prevNow.format('M월 D일')}`;
  const formattedRange = `${startOfMonth.format('YYYY년 M월 D일')} ~ ${now.format('M월 D일')}`;

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-md">
      <div className="mb-2 text-lg/6 font-semibold text-gray-800">이번 달 방문 통계</div>
      <div className="mb-4 text-sm/4 text-gray-400">{formattedRange}</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {list.map(({ title, value, change, icon: Icon }, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm/4 font-medium text-gray-500">{title}</span>
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl/6 font-bold text-gray-900">{value.toLocaleString()}</div>
            <div className="mt-1 flex items-center">
              <span
                className={`flex items-center text-xs font-medium ${change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
              >
                {change >= 0 ? <ArrowUpIcon className="mr-1 h-4 w-4" /> : <ArrowDownIcon className="mr-1 h-4 w-4" />}
                {Math.abs(change)}%
              </span>
              <div className="group relative ml-1 flex items-center gap-[2px] text-xs/4 text-gray-400">
                전월 대비 <Info className="inline h-3 w-3" />
                <div className="absolute -top-8 left-0 z-10 hidden w-max rounded bg-black px-2 py-1 text-[10px] text-white group-hover:block">
                  {formattedPrevRange} 기준 비교
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
