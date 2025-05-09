import { checkAuth, checkGymOwner } from '@/shared/lib';
import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { MonthlyPassStatsData } from '../type';

export async function getRecentMonthlyPassStats(gymDomain: string): Promise<MonthlyPassStatsData[]> {
  const { userId } = await checkAuth();
  await checkGymOwner(userId, gymDomain);

  const today = dayjsKST();
  const sixMonthsAgo = today.subtract(5, 'month').startOf('month').toDate();
  const endOfThisMonth = today.endOf('month').toDate();

  try {
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

    return Array.from(statsMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, value]) => ({
        ...value,
        month: dayjsKST(value.month).format('M월'),
      }));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : '최근 월별 방문자 통계를 가져오는 중 오류가 발생했습니다.',
    );
  }
}
