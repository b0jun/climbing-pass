'use server';

import { auth } from '@/auth';
import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { VisitorStatsParams } from '../types/pass-list.type';

export async function getVisitorStats({ gym, passDate }: VisitorStatsParams) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('세션 정보가 없습니다.');
  }

  const baseDate = passDate ? dayjsKST(passDate) : dayjsKST();
  if (!baseDate.isValid()) {
    throw new Error('유효하지 않은 날짜입니다.');
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
    total,
    dayExperience,
    dayPass,
  };
}
