'use server';

import { Pass, Prisma } from '@prisma/client';

import { auth } from '@/auth';
import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { BasePassFields, PassListParams, PassWithVisits } from '../types/pass-list.type';

const getDayRange = (date: string) => {
  const baseDate = dayjsKST(date);
  return {
    startOfDay: baseDate.startOf('day').toDate(),
    endOfDay: baseDate.endOf('day').toDate(),
  };
};

type PassListRaw = {
  totalVisits: number;
  createdAt: Pass['createdAt'];
} & Pick<Pass, BasePassFields>;

type GetPassListResponse = { success: true; data: PassWithVisits[] } | { success: false; message: string };

export async function getPassList({ gym, passType, passDate }: PassListParams): Promise<GetPassListResponse> {
  const session = await auth();
  if (!session || !session.user) {
    return { success: false, message: '권한이 없습니다.' };
  }

  const userId = session.user.id;
  const today = dayjsKST();
  const baseDate = passDate && dayjsKST(passDate).isValid() ? dayjsKST(passDate) : today;
  const oneYearAgo = today.subtract(1, 'year').startOf('day');

  if (baseDate.isBefore(oneYearAgo)) {
    return { success: false, message: '1년보다 이전의 데이터는 조회할 수 없습니다.' };
  }

  const { startOfDay, endOfDay } = getDayRange(baseDate.toISOString());
  const totalVisitSince = today.subtract(1, 'year').startOf('day').toDate();

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
          WHERE "gymId" = ${gym}
            AND status != 'DELETED'
            AND "createdAt" >= ${totalVisitSince}
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

  return { success: true, data: passListData };
}
