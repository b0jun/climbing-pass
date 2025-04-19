'use server';

import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { MonthlyPassStatsData } from '../types/pass-analytics.type';

type GetRecentMonthlyPassStatsResponse =
  | { success: true; data: MonthlyPassStatsData[] }
  | { success: false; message: string };

export async function getRecentMonthlyPassStats(gymDomain: string): Promise<GetRecentMonthlyPassStatsResponse> {
  try {
    const today = dayjsKST();
    const sixMonthsAgo = today.subtract(5, 'month').startOf('month').toDate();
    const endOfThisMonth = today.endOf('month').toDate();

    const passes = await db.pass.findMany({
      where: {
        gymId: gymDomain,
        status: 'APPROVED',
        createdAt: {
          gte: sixMonthsAgo,
          lte: endOfThisMonth,
        },
      },
      select: {
        createdAt: true,
        type: true,
      },
    });

    const statsMap = new Map<string, MonthlyPassStatsData>();

    for (let i = 0; i < 6; i++) {
      const month = today.subtract(i, 'month').format('YYYY-MM');
      statsMap.set(month, {
        month,
        dayExperience: 0,
        dayUse: 0,
      });
    }

    for (const pass of passes) {
      const month = dayjsKST(pass.createdAt).format('YYYY-MM');
      const entry = statsMap.get(month);
      if (!entry) continue;

      if (pass.type === 'DayExperience') {
        entry.dayExperience += 1;
      } else if (pass.type === 'DayPass') {
        entry.dayUse += 1;
      }
    }

    const sorted = Array.from(statsMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, value]) => ({
        ...value,
        month: dayjsKST(value.month).format('M월'),
      }));

    return { success: true, data: sorted };
  } catch (error) {
    return {
      success: false,
      message: '최근 월별 방문자 통계를 불러오는 데 실패했습니다.',
    };
  }
}
