'use server';

import { Locale } from '@prisma/client';
import { renderToBuffer } from '@react-pdf/renderer';
import { put } from '@vercel/blob';

import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

import { PassValidType } from '../../types/passType.type';
import { ConsentDocument } from '../components';
import { ConsentFormData } from '../schema/consentSchema';

interface SubmitConsentRequest {
  formData: ConsentFormData;
  signData: string;
  type: PassValidType;
  gymDomain: string;
  locale: Locale;
}

type SubmitConsentResponse = { success: true; id: string; url: string } | { success: false; message: string };

export async function submitConsent({
  formData,
  signData,
  type,
  gymDomain,
  locale,
}: SubmitConsentRequest): Promise<SubmitConsentResponse> {
  // const start = performance.now();

  const { consent, ...withoutConsent } = formData;
  const { name, phoneNumber, dateOfBirth, shoesRental } = withoutConsent;
  if (!name || !dateOfBirth || !locale || !signData || !gymDomain || !type) {
    return { success: false, message: '모든 필수 정보를 입력해주세요.' };
  }

  // const gymStart = performance.now();
  const gym = await db.gym.findUnique({
    where: { domain: gymDomain },
    select: {
      id: true,
      name: true,
      name_en: true,
      location: true,
      location_en: true,
    },
  });
  // const gymEnd = performance.now();

  if (!gym) {
    return { success: false, message: '체육관 정보를 찾을 수 없습니다.' };
  }

  const now = dayjsKST();
  const entryTime = now.locale(locale);

  const pdfData = {
    name,
    phoneNumber: phoneNumber || '',
    dateOfBirth,
    locale,
    signData,
    gymName: locale === 'ko' ? gym.name : gym.name_en,
    gymLocation: locale === 'ko' ? gym.location : gym.location_en,
    entryTime,
  };

  // const renderStart = performance.now();
  const pdfBuffer = await renderToBuffer(<ConsentDocument pdfData={pdfData} />);
  // const renderEnd = performance.now();

  // const dbStart = performance.now();
  const pass = await db.$transaction(async (tx) => {
    const createdPass = await tx.pass.create({
      data: {
        name,
        phoneNumber: phoneNumber || null,
        dateOfBirth,
        type: type === 'day-pass' ? 'DayPass' : 'DayExperience',
        locale,
        shoesRental: type === 'day-pass' ? shoesRental : true,
        status: 'WAIT',
        gymId: gymDomain,
        createdAt: now.toDate(),
        pdfUrl: '',
      },
    });

    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
    const blob = await put(`${gymDomain}/consent/${createdPass.id}.pdf`, pdfBlob, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: 'application/pdf',
    });

    await tx.pass.update({
      where: { id: createdPass.id },
      data: { pdfUrl: blob.url },
    });

    return { ...createdPass, pdfUrl: blob.url };
  });
  // const dbEnd = performance.now();

  // const end = performance.now();
  // console.log(`[Consent Submit] Gym 조회: ${(gymEnd - gymStart).toFixed(1)}ms`);
  // console.log(`[Consent Submit] PDF 렌더링: ${(renderEnd - renderStart).toFixed(1)}ms`);
  // console.log(`[Consent Submit] DB 및 업로드: ${(dbEnd - dbStart).toFixed(1)}ms`);
  // console.log(`[Consent Submit] 총 처리 시간: ${(end - start).toFixed(1)}ms`);

  return {
    success: true,
    id: pass.id,
    url: pass.pdfUrl,
  };
}
