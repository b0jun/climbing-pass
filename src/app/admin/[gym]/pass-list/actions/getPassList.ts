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
  const session = await auth();

  if (!session || !session.user) {
    throw new Error('No Permission');
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
    throw new Error('No Permission');
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

  return passListData;
}
