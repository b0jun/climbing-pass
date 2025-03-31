'use server';

import { Locale } from '@prisma/client';

import { db } from '@/shared/lib/prisma';

import { PassValidType } from '../../types/passType.type';
import { ConsentFormData } from '../schema/consentSchema';

interface SubmitPassParams {
  formData: ConsentFormData;
  signatureUrl: string;
  type: PassValidType;
  gymDomain: string;
  locale: Locale;
}

type SubmitPassResponse =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export async function submitPass({
  formData,
  signatureUrl,
  type,
  gymDomain,
  locale,
}: SubmitPassParams): Promise<SubmitPassResponse> {
  try {
    const { consent, ...withoutConsent } = formData;

    const isDayPass = type === 'day-pass';

    const gymData = await db.gym.findFirst({
      select: { userId: true },
      where: { domain: gymDomain },
    });
    if (!gymData) {
      return { success: false, message: '해당 지점을 찾을 수 없습니다.' };
    }

    const { name, phoneNumber, dateOfBirth, shoesRental } = withoutConsent;

    await db.pass.create({
      data: {
        name,
        phoneNumber: phoneNumber || '', // TODO: phoneNumber 스키마 옵셔널로 수정
        dateOfBirth: dateOfBirth,
        shoesRental: isDayPass ? shoesRental : true,
        type: isDayPass ? 'DayPass' : 'DayExperience',
        locale,
        signature: signatureUrl,
        status: 'WAIT',
        gymId: gymDomain,
        userId: gymData.userId,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, message: '동의서 제출에 실패했습니다. 데스크에 문의주세요.' };
  }
}
