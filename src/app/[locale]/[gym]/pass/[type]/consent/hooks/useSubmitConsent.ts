'use client';

import { Locale } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from '@/i18n/navigation';

import { PassValidType } from '../../types/passType.type';
import { submitPass } from '../actions/submitPass';
import { ConsentFormData } from '../schema/consentSchema';
import { uploadSignature } from '../utils/uploadSignature';

interface SubmitConsentParams {
  formData: ConsentFormData;
  signData: string;
  type: PassValidType;
  gymDomain: string;
  locale: Locale;
}

export const useSubmitConsent = () => {
  const { replace } = useRouter();
  const { gym, type } = useParams();
  const [blocked, setBlocked] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ formData, signData, type, gymDomain, locale }: SubmitConsentParams) => {
      // * 서명 이미지 업로드
      const uploadResponse = await uploadSignature(formData.name, signData);
      if (!uploadResponse.success) {
        return { success: false, message: uploadResponse.message };
      }
      // * 패스 Create
      const submitResponse = await submitPass({ formData, signatureUrl: uploadResponse.url, type, gymDomain, locale });
      return submitResponse;
    },
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      setBlocked(true);
      replace(`/${gym}/pass/${type}/complete`);
    },
    onError: () => {
      toast.error('이용 동의서 제출에 실패했습니다. 데스크에 문의주세요.');
    },
    retry: 2,
  });
  return { mutate, isPending: isPending || blocked };
};
