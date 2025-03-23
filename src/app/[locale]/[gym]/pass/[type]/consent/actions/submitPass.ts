'use server';

import { db } from '@/shared/lib/prisma';

import { ConsentFormData } from '../schema/consentSchema';

interface SubmitPassParams {
  formData: ConsentFormData;
  signatureUrl: string;
  type: string;
  gymDomain: string;
}

export async function submitPass({ formData, signatureUrl, type, gymDomain }: SubmitPassParams) {
  try {
    const { consent, ...withoutConsent } = formData;

    const isDayPass = type === 'day-pass';

    const gymData = await db.gym.findFirst({
      select: { userId: true },
      where: { domain: gymDomain },
    });
    if (!gymData) {
      throw new Error('Gym not found');
    }

    const { name, phoneNumber, dateOfBirth, shoesRental } = withoutConsent;

    const passData = await db.pass.create({
      data: {
        name,
        phoneNumber: phoneNumber || '', // TODO: phoneNumber 스키마 옵셔널로 수정
        dateOfBirth: dateOfBirth,
        shoesRental: isDayPass ? shoesRental : true,
        type: isDayPass ? 'DayPass' : 'DayExperience',
        signature: signatureUrl,
        status: 'WAIT',
        gymId: gymDomain,
        userId: gymData.userId,
      },
    });
    return passData;
  } catch (error) {
    throw new Error('동의서 제출에 실패했습니다.');
  }
}
