'use server';

import { checkAuth } from '@/shared/lib';
import { db } from '@/shared/lib/prisma';

import { PassDetailData } from '../types/pass-detail.type';

export async function getPassDetail({ id, gym }: { id: string; gym: string }): Promise<PassDetailData> {
  try {
    const { userId } = await checkAuth();
    const passDetail = await db.pass.findFirst({
      where: {
        id,
        gymId: gym,
        status: { not: 'DELETED' },
        gym: { userId },
      },
      select: {
        name: true,
        type: true,
        phoneNumber: true,
        dateOfBirth: true,
        createdAt: true,
        signature: true,
        locale: true,
        pdfUrl: true,
        gym: {
          select: {
            name: true,
            name_en: true,
            location: true,
            location_en: true,
            logo: true,
          },
        },
      },
    });

    if (!passDetail) {
      throw new Error('해당 패스를 찾을 수 없습니다.');
    }
    return {
      name: passDetail.name,
      type: passDetail.type,
      phoneNumber: passDetail.phoneNumber,
      dateOfBirth: passDetail.dateOfBirth,
      createdAt: passDetail.createdAt,
      signature: passDetail.signature,
      locale: passDetail.locale,
      pdfUrl: passDetail.pdfUrl,
      gymName: passDetail.gym!.name,
      gymNameEn: passDetail.gym!.name_en,
      gymLocation: passDetail.gym!.location,
      gymLocationEn: passDetail.gym!.location_en,
      gymLogo: passDetail.gym!.logo,
    };
  } catch (error) {
    throw new Error((error instanceof Error && error.message) || '패스 상세 정보를 불러오는 중 오류가 발생했습니다.');
  }
}
