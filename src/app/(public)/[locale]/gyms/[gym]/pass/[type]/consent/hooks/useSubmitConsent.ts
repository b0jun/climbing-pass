'use client';

import { Locale } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from '@/i18n/navigation.public';

import { PassValidType } from '../../types/passType.type';
import { submitConsent } from '../actions/submitConsent';
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
      const response = await submitConsent({ formData, signData, type, gymDomain, locale });
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (response) => {
      setBlocked(true);
      replace(`/gyms/${gym}/pass/complete?id=${response.id}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error('이용 동의서 제출에 실패했습니다. 데스크에 문의주세요.');
    },
    retry: 2,
  });
  return { mutate, isPending: isPending || blocked };
};
