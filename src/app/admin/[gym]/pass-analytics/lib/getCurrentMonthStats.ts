import { PassType } from '@prisma/client';

import { authCheck } from '@/shared/lib/authCheck';
import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

export async function getCurrentMonthStats(gymDomain: string) {
  await authCheck();

  const today = dayjsKST();
  const currentStart = today.startOf('month');
  const currentEnd = today.endOf('day');

  const prevMonth = today.subtract(1, 'month');
  const prevStart = prevMonth.startOf('month');
  const dateDiff = today.diff(currentStart, 'day');
  const prevEnd = prevStart.add(dateDiff, 'day').endOf('day');

  try {
    const [currentPasses, prevPasses] = await Promise.all([
      db.pass.findMany({
        where: {
          gymId: gymDomain,
          status: 'APPROVED',
          createdAt: {
            gte: currentStart.toDate(),
            lte: currentEnd.toDate(),
          },
        },
      }),
      db.pass.findMany({
        where: {
          gymId: gymDomain,
          status: 'APPROVED',
          createdAt: {
            gte: prevStart.toDate(),
            lte: prevEnd.toDate(),
          },
        },
      }),
    ]);

    const countByType = (passes: typeof currentPasses, type: PassType) => passes.filter((p) => p.type === type).length;

    const dayCount = currentEnd.diff(currentStart, 'day') + 1;
    const prevDayCount = prevEnd.diff(prevStart, 'day') + 1;

    return {
      total: {
        value: currentPasses.length,
        change: (((currentPasses.length - prevPasses.length) / (prevPasses.length || 1)) * 100).toFixed(1),
      },
      experience: {
        value: countByType(currentPasses, 'DayExperience'),
        change: (
          ((countByType(currentPasses, 'DayExperience') - countByType(prevPasses, 'DayExperience')) /
            (countByType(prevPasses, 'DayExperience') || 1)) *
          100
        ).toFixed(1),
      },
      usage: {
        value: countByType(currentPasses, 'DayPass'),
        change: (
          ((countByType(currentPasses, 'DayPass') - countByType(prevPasses, 'DayPass')) /
            (countByType(prevPasses, 'DayPass') || 1)) *
          100
        ).toFixed(1),
      },
      dailyAverage: {
        value: Math.round(currentPasses.length / dayCount),
        change: (
          ((currentPasses.length / dayCount - prevPasses.length / prevDayCount) /
            (prevPasses.length / prevDayCount || 1)) *
          100
        ).toFixed(1),
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '현재 월 통계 데이터를 가져오는 중 오류가 발생했습니다.');
  }
}
