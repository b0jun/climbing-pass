'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

import { MonthlyPassStatsData } from '../type';

interface MonthlyPassChartProps {
  data: MonthlyPassStatsData[];
}

export function MonthlyPassChartClient({ data }: MonthlyPassChartProps) {
  return (
    <div className="rounded-[10px] bg-white p-4 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">월별 방문 유형 분석</h2>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              cursor={{ fill: '#e5e7eb99' }}
              contentStyle={{ fontSize: '0.875rem' }}
              formatter={(value: number) => `${value}명`}
            />
            <Legend />
            <Bar dataKey="dayExperience" name="일일체험" fill="#7a4dffcc" radius={[4, 4, 0, 0]} />
            <Bar dataKey="dayUse" name="일일이용" fill="#4d4dffcc" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
