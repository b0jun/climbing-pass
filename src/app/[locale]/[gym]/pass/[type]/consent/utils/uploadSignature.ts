'use client';

import { upload } from '@vercel/blob/client';

// TODO: 추후 공용 로직으로 추가
export async function uploadSignature(name: string, signData: string): Promise<string> {
  try {
    const fileName = `${name}.png`;
    const decodedURL = signData.replace(/^data:image\/\w+;base64,/, '');
    const buf = Buffer.from(decodedURL, 'base64');
    const blob = new Blob([buf], { type: 'image/png' });
    const file = new File([blob], fileName, { type: 'image/png' });

    const { url } = await upload(`signature/${fileName}`, file, {
      access: 'public',
      handleUploadUrl: '/api/pass/upload',
    });

    return url;
  } catch (error) {
    throw new Error('서명 업로드에 실패했습니다.');
  }
}
