'use server';

import { PassType } from '@prisma/client';
import dayjs from 'dayjs';

import { auth } from '@/auth';
import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { CurrentMonthStatsData } from '../types/pass-analytics.type';

// * 변화율 계산
function getChangeRate(current: number, previous: number): string {
  return (((current - previous) / (previous || 1)) * 100).toFixed(1);
}

// * 날짜 범위 계산
function getDateRangeForMonthComparison(today: dayjs.Dayjs) {
  const todayDate = today.startOf('day');
  const currentStart = today.startOf('month');
  const currentEnd = today.endOf('day');

  const prevMonth = today.subtract(1, 'month');
  const prevStart = prevMonth.startOf('month');

  const dateDiff = todayDate.diff(currentStart, 'day');
  const prevEnd = prevStart.add(dateDiff, 'day').endOf('day');

  return {
    current: { start: currentStart.toDate(), end: currentEnd.toDate() },
    previous: { start: prevStart.toDate(), end: prevEnd.toDate() },
    dayCount: currentEnd.diff(currentStart, 'day') + 1,
    prevDayCount: prevEnd.diff(prevStart, 'day') + 1,
  };
}

type GetCurrentMonthStatsResponse =
  | {
      success: true;
      data: CurrentMonthStatsData;
    }
  | {
      success: false;
      message: string;
    };

export async function getCurrentMonthStats(gymDomain: string): Promise<GetCurrentMonthStatsResponse> {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { success: false, message: '권한이 없습니다.' };
  }

  const today = dayjsKST();
  const { current, previous, dayCount, prevDayCount } = getDateRangeForMonthComparison(today);

  const [currentPasses, prevPasses] = await Promise.all([
    db.pass.findMany({
      where: {
        gymId: gymDomain,
        status: 'APPROVED',
        createdAt: { gte: current.start, lte: current.end },
      },
    }),
    db.pass.findMany({
      where: {
        gymId: gymDomain,
        status: 'APPROVED',
        createdAt: { gte: previous.start, lte: previous.end },
      },
    }),
  ]);

  const countByType = (passes: typeof currentPasses, type: PassType) => passes.filter((p) => p.type === type).length;

  const currentExperience = countByType(currentPasses, 'DayExperience');
  const prevExperience = countByType(prevPasses, 'DayExperience');

  const currentUsage = countByType(currentPasses, 'DayPass');
  const prevUsage = countByType(prevPasses, 'DayPass');

  return {
    success: true,
    data: {
      total: {
        value: currentPasses.length,
        change: getChangeRate(currentPasses.length, prevPasses.length),
      },
      experience: {
        value: currentExperience,
        change: getChangeRate(currentExperience, prevExperience),
      },
      usage: {
        value: currentUsage,
        change: getChangeRate(currentUsage, prevUsage),
      },
      dailyAverage: {
        value: Math.round(currentPasses.length / dayCount),
        change: getChangeRate(currentPasses.length / dayCount, prevPasses.length / prevDayCount),
      },
    },
  };
}
