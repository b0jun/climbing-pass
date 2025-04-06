'use server';

import { PassType } from '@prisma/client';

import { auth } from '@/auth';
import { dayjsUTC } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

export async function getCurrentMonthStats(gymDomain: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error('세션이 없습니다.');
  }

  const today = dayjsUTC();
  const currentStart = today.startOf('month');
  const currentEnd = today;

  const prevMonth = today.subtract(1, 'month');
  const prevEndDay = Math.min(today.date(), prevMonth.daysInMonth());
  const prevStart = prevMonth.startOf('month');
  const prevEnd = prevMonth.date(prevEndDay);

  const [currentPasses, prevPasses] = await Promise.all([
    db.pass.findMany({
      where: {
        gymId: gymDomain,
        status: 'APPROVED',
        createdAt: { gte: currentStart.toDate(), lte: currentEnd.toDate() },
      },
    }),
    db.pass.findMany({
      where: {
        gymId: gymDomain,
        status: 'APPROVED',
        createdAt: { gte: prevStart.toDate(), lte: prevEnd.toDate() },
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
}
