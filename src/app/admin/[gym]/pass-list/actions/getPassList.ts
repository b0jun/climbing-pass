'use server';

import { Pass, Prisma } from '@prisma/client';

import { checkAuth, checkGymOwner } from '@/shared/lib';
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
  const { userId } = await checkAuth();
  await checkGymOwner(userId, gym);

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
            CASE
              WHEN "phoneNumber" IS NOT NULL AND "phoneNumber" != ''
                THEN name || '|' || "phoneNumber"
              ELSE name || '|' || "dateOfBirth"
            END AS match_key,
            COUNT(*) AS total_visits
          FROM "Pass"
          WHERE "gymId" = ${gym}
            AND status IN ('WAIT', 'APPROVED')
            AND "createdAt" >= ${totalVisitSince}
          GROUP BY match_key
        ) t ON (
          CASE
            WHEN p."phoneNumber" IS NOT NULL AND p."phoneNumber" != ''
              THEN p.name || '|' || p."phoneNumber"
            ELSE p.name || '|' || p."dateOfBirth"
          END = t.match_key
        )
        WHERE p."gymId" = ${gym}
          AND p."createdAt" >= ${startOfDay}
          AND p."createdAt" <= ${endOfDay}
          AND p.status IN ('WAIT', 'APPROVED')
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
