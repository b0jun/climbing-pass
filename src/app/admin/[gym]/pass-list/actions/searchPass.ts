'use server';

import { checkAuth } from '@/shared/lib';
import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { SeachPassResult, SearchPassRequest } from '../types/pass-list.type';

type UpdatePassResponse =
  | {
      success: true;
      passList: SeachPassResult[];
    }
  | {
      success: false;
      message: string;
    };

export async function searchPass(data: SearchPassRequest): Promise<UpdatePassResponse> {
  await checkAuth();

  const { name, phoneNumber, gymDomain } = data;
  const whereClause: any = {
    gymId: gymDomain,
    status: { in: ['WAIT', 'APPROVED'] },
    createdAt: {
      gte: dayjsKST().subtract(1, 'year').toDate(), // * 1년 이내
    },
  };

  if (name) whereClause.name = { equals: name, mode: 'insensitive' };
  if (phoneNumber) whereClause.phoneNumber = { equals: phoneNumber };

  const passList = await db.pass.findMany({
    where: whereClause,
    select: {
      id: true,
      createdAt: true,
      name: true,
      phoneNumber: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return { success: true, passList };
}
