'use server';

import { auth } from '@/auth';
import { db } from '@/shared/lib/prisma';

import { PassDetailData } from '../types/pass-detail.type';

export async function getPassDetail({ id, gym }: { id: string; gym: string }): Promise<PassDetailData> {
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
        id: true,
        name: true,
        logo: true,
      },
    });

    if (!gymData) {
      throw new Error('해당 지점을 찾을 수 없습니다.');
    }

    const passDetail = await db.pass.findFirst({
      where: {
        id,
        gymId: gym,
        userId,
        status: {
          not: 'DELETED',
        },
      },
      select: {
        name: true,
        type: true,
        phoneNumber: true,
        dateOfBirth: true,
        createdAt: true,
        signature: true,
      },
    });

    if (!passDetail) {
      throw new Error('해당 패스를 찾을 수 없습니다.');
    }
    return { ...passDetail, gymName: gymData.name, gymLogo: gymData.logo as string };
  } catch (error) {
    throw new Error((error instanceof Error && error.message) || '패스 상세 정보를 불러오는 중 오류가 발생했습니다.');
  }
}
