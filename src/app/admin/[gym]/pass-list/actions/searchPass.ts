'use server';

import { auth } from '@/auth';
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
  try {
    const session = await auth();

    if (!session || !session.user) {
      return {
        success: false,
        message: '권한이 없습니다.',
      };
    }

    const { name, phoneNumber, gymDomain } = data;
    const whereClause: any = {
      gymId: gymDomain,
      status: { not: 'DELETED' },
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 6)), // * 6개월 이내
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
  } catch (error) {
    return {
      success: false,
      message: '패스 수정에 실패하였습니다.',
    };
  }
}
