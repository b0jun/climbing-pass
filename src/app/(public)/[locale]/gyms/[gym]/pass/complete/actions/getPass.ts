'use server';

import { Pass } from '@prisma/client';

import { dayjsUTC } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { PassAndGymData } from '../types/complete.type';

interface GetPassRequest {
  id: Pass['id'];
  gym: string;
}

type GetPassResponse =
  | { success: true; data: PassAndGymData }
  | { success: false; code: 'PASS_EXPIRED' | 'PASS_NOT_FOUND' };

const EXPIRE_TIME = 30; // * minute

export async function getPass({ id, gym }: GetPassRequest): Promise<GetPassResponse> {
  const pass = await db.pass.findUnique({
    where: { id, gymId: gym },
    select: {
      name: true,
      phoneNumber: true,
      createdAt: true,
      type: true,
      shoesRental: true,
      locale: true,
      gymId: true,
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

  if (!pass || !pass.gym) {
    return { success: false, code: 'PASS_NOT_FOUND' };
  }

  // * 30분 내의 데이터만 조회가능
  const limitTime = dayjsUTC(pass.createdAt).add(EXPIRE_TIME, 'minute');

  if (dayjsUTC().isAfter(limitTime)) {
    return { success: false, code: 'PASS_EXPIRED' };
  }

  const isKo = pass.locale === 'ko';

  return {
    success: true,
    data: {
      name: pass.name,
      phoneNumber: pass.phoneNumber,
      createdAt: pass.createdAt,
      type: pass.type,
      shoesRental: pass.shoesRental,
      locale: pass.locale,
      pdfUrl: pass.pdfUrl,
      gym: {
        name: isKo ? pass.gym.name : pass.gym.name_en,
        location: isKo ? pass.gym.location : pass.gym.location_en,
        logo: pass.gym.logo,
      },
    },
  };
}
