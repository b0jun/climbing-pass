'use server';

import { checkAuth, checkGymOwner } from '@/shared/lib';
import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { VisitorStatsParams } from '../types/pass-list.type';

type GetVisitorStatsResponse =
  | { success: true; data: { total: number; dayExperience: number; dayPass: number } }
  | { success: false; message: string };

export async function getVisitorStats({ gym, passDate }: VisitorStatsParams): Promise<GetVisitorStatsResponse> {
  const { userId } = await checkAuth();
  await checkGymOwner(userId, gym);

  const today = dayjsKST();
  const baseDate = passDate && dayjsKST(passDate).isValid() ? dayjsKST(passDate) : today;
  const oneYearAgo = today.subtract(1, 'year').startOf('day');

  if (baseDate.isBefore(oneYearAgo)) {
    return { success: false, message: '1년보다 이전의 데이터는 조회할 수 없습니다.' };
  }

  const start = baseDate.startOf('day').toDate();
  const end = baseDate.endOf('day').toDate();

  const passes = await db.pass.findMany({
    where: {
      gymId: gym,
      status: 'APPROVED',
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    select: {
      type: true,
    },
  });
  const total = passes.length;
  const dayExperience = passes.filter((p) => p.type === 'DayExperience').length;
  const dayPass = passes.filter((p) => p.type === 'DayPass').length;

  return {
    success: true,
    data: {
      total,
      dayExperience,
      dayPass,
    },
  };
}
