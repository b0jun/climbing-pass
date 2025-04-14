'use server';

import { Pass, Prisma } from '@prisma/client';

import { auth } from '@/auth';
import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { BasePassFields, PassListParams, PassWithVisits } from '../types/pass-list.type';

const getDayRange = (date?: string) => {
  const baseDate = date && dayjsKST(date).isValid() ? dayjsKST(date) : dayjsKST();
  const startOfDay = baseDate.startOf('day').toDate();
  const endOfDay = baseDate.endOf('day').toDate();
  return { startOfDay, endOfDay };
};

type PassListRaw = {
  totalVisits: number;
  createdAt: Pass['createdAt'];
} & Pick<Pass, BasePassFields>;

export async function getPassList({ gym, passType, passDate }: PassListParams): Promise<PassWithVisits[]> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error('권한이 없습니다.');
    }

    const userId = session.user.id;

    const { startOfDay, endOfDay } = getDayRange(passDate);

    const passListDataRaw = await db.$queryRaw<PassListRaw[]>(
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
          COALESCE(t.total_visits, 0)::integer AS "totalVisits"
        FROM "Pass" p
        LEFT JOIN (
          SELECT
            name,
            "phoneNumber",
            COUNT(*) AS total_visits
          FROM "Pass"
          WHERE "userId" = ${userId}
            AND "gymId" = ${gym}
            AND status != 'DELETED'
          GROUP BY name, "phoneNumber"
        ) t ON p.name = t.name AND p."phoneNumber" = t."phoneNumber"
        WHERE p."userId" = ${userId}
          AND p."gymId" = ${gym}
          AND p."createdAt" >= ${startOfDay}
          AND p."createdAt" <= ${endOfDay}
          AND p.status != 'DELETED'
          ${passType ? Prisma.sql`AND p.type = ${Prisma.raw(`'${passType}'`)}` : Prisma.sql``}
        ORDER BY p."createdAt" DESC
      `,
    );

    const passListData = (passListDataRaw ?? []).map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));

    return passListData;
  } catch (error) {
    throw new Error((error instanceof Error && error.message) || '패스 목록을 불러오는 중 오류가 발생했습니다.');
  }
}
