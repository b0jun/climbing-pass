'use server';

import { PassType, Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import { auth } from '@/auth';
import { db } from '@/shared/lib/prisma';

import { PassWithVisits } from '../types/pass-list.type';

const getDayRange = (date?: string) => {
  const baseDate = date && dayjs(date).isValid() ? dayjs(date) : dayjs();
  const startOfDay = baseDate.startOf('day').toDate();
  const endOfDay = baseDate.endOf('day').toDate();
  return { startOfDay, endOfDay };
};

export async function getPassList({
  gym,
  passType,
  passDate,
}: {
  gym: string;
  passType?: PassType;
  passDate?: string;
}): Promise<PassWithVisits[]> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error('권한이 없습니다.');
    }

    const userId = session.user.id;

    const gymData = await db.gym.findFirst({
      where: {
        domain: gym,
        userId,
      },
      select: {
        name: true,
        id: true,
      },
    });

    if (!gymData) {
      throw new Error('해당 지점을 찾을 수 없습니다.');
    }

    const { startOfDay, endOfDay } = getDayRange(passDate);

    const passListData = await db.$queryRaw<PassWithVisits[]>(
      Prisma.sql`
        SELECT
          p.id,
          p.name,
          p."phoneNumber" AS "phoneNumber",
          p."dateOfBirth" AS "dateOfBirth",
          p.signature,
          p.type,
          p.status,
          p."shoesRental" AS "shoesRental",
          p."createdAt" AS "createdAt",
          COUNT(*) OVER (PARTITION BY p.name, p."phoneNumber")::integer AS "totalVisits"
        FROM "Pass" p
        WHERE p."userId" = ${userId}
          AND p."gymId" = ${gym}
          AND p."createdAt" >= ${startOfDay}
          AND p."createdAt" <= ${endOfDay}
          AND p.status != 'DELETED'
          ${passType ? Prisma.sql`AND p.type = ${Prisma.raw(`'${passType}'`)}` : Prisma.sql``}
        ORDER BY p."createdAt" DESC
      `,
    );

    return passListData ?? [];
  } catch (error) {
    throw new Error((error instanceof Error && error.message) || '패스 목록을 불러오는 중 오류가 발생했습니다.');
  }
}
