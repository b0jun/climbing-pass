'use client';

import { Locale } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from '@/i18n/navigation.public';

import { PassValidType } from '../../types/passType.type';
import { pdfGenerateAndUpload } from '../actions/pdfGenerateAndUpload';
import { submitPass } from '../actions/submitPass';
import { ConsentFormData } from '../schema/consentSchema';

interface SubmitConsentParams {
  formData: ConsentFormData;
  signData: string;
  type: PassValidType;
  gymDomain: string;
  locale: Locale;
}

export const useSubmitConsent = () => {
  const { replace } = useRouter();
  const { gym } = useParams();
  const [blocked, setBlocked] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ formData, signData, type, gymDomain, locale }: SubmitConsentParams) => {
      // * PDF 업로드
      const pdfResponse = await pdfGenerateAndUpload({
        name: formData.name,
        phoneNumber: formData.phoneNumber || '',
        dateOfBirth: formData.dateOfBirth,
        locale,
        signData,
        gymDomain,
      });
      if (!pdfResponse.success || !pdfResponse.url) {
        return { success: false, message: 'PDF 업로드 실패' };
      }

      // * 패스 Create
      const submitResponse = await submitPass({ formData, pdfUrl: pdfResponse.url, type, gymDomain, locale });
      return submitResponse;
    },
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      setBlocked(true);
      if ('id' in response) {
        replace(`/gyms/${gym}/pass/complete?id=${response.id}`);
      }
    },
    onError: () => {
      toast.error('이용 동의서 제출에 실패했습니다. 데스크에 문의주세요.');
    },
    retry: 2,
  });
  return { mutate, isPending: isPending || blocked };
};
