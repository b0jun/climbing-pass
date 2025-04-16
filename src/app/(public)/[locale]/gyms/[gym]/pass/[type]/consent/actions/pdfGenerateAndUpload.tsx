'use server';

import { Locale, Pass } from '@prisma/client';
import { renderToBuffer } from '@react-pdf/renderer';
import { put } from '@vercel/blob';

import { db } from '@/shared/lib/prisma';

import { ConsentDocument } from '../components';

interface PdfGenerateAndUploadRequest {
  name: Pass['name'];
  phoneNumber: Pass['phoneNumber'];
  dateOfBirth: Pass['dateOfBirth'];
  locale: Locale;
  signData: string;
  gymDomain: string;
}

type PdfGenerateAndUploadResponse = { success: true; url: string } | { success: false; message: string };

// * PDF 생성 및 Vercel Blob 업로드
export async function pdfGenerateAndUpload({
  name,
  phoneNumber,
  dateOfBirth,
  locale,
  signData,
  gymDomain,
}: PdfGenerateAndUploadRequest): Promise<PdfGenerateAndUploadResponse> {
  // const totalStart = performance.now();
  try {
    if (!name || !dateOfBirth || !locale || !signData) {
      throw new Error('모든 필드가 필요합니다.');
    }

    // const dbStart = performance.now();
    const gym = await db.gym.findUnique({
      where: { domain: gymDomain },
      select: { name: true, name_en: true, location: true, location_en: true },
    });
    // const dbEnd = performance.now();

    if (!gym) {
      throw new Error('해당 gymDomain에 대한 Gym 데이터를 찾을 수 없습니다.');
    }

    const pdfData = {
      name,
      phoneNumber,
      dateOfBirth,
      locale,
      signData,
      gymName: locale === 'ko' ? gym.name : gym.name_en,
      gymLocation: locale === 'ko' ? gym.location : gym.location_en,
    };

    // const renderStart = performance.now();
    // * PDF를 Buffer로 생성
    const pdfBuffer = await renderToBuffer(<ConsentDocument pdfData={pdfData} />);
    // const renderEnd = performance.now();

    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

    // const uploadStart = performance.now();
    // * Vercel Blob에 업로드
    const blob = await put(`${gymDomain}/consent/${name}_${Date.now()}.pdf`, pdfBlob, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: 'application/pdf',
    });
    // const uploadEnd = performance.now();

    // const totalEnd = performance.now();

    // console.log(`[PDF Upload] DB 조회: ${(dbEnd - dbStart).toFixed(1)}ms`);
    // console.log(`[PDF Upload] PDF 렌더링: ${(renderEnd - renderStart).toFixed(1)}ms`);
    // console.log(`[PDF Upload] Blob 업로드: ${(uploadEnd - uploadStart).toFixed(1)}ms`);
    // console.log(`[PDF Upload] 총 처리 시간: ${(totalEnd - totalStart).toFixed(1)}ms`);

    return {
      success: true,
      url: blob.url,
    };
  } catch (error) {
    return {
      success: false,
      message: 'PDF 생성 또는 업로드에 실패했습니다.',
    };
  }
}
