'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

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
}

export const useSubmitConsent = () => {
  const { replace } = useRouter();
  const { gym, type } = useParams();
  const [blocked, setBlocked] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ formData, signData, type, gymDomain }: SubmitConsentParams) => {
      // * 서명 이미지 업로드
      const signatureUrl = await uploadSignature(formData.name, signData);
      // * 패스 Create
      const passData = await submitPass({ formData, signatureUrl, type, gymDomain });

      return passData;
    },
    onSuccess: () => {
      setBlocked(true);
      replace(`/${gym}/pass/${type}/complete`);
    },
  });
  return { mutate, isPending: isPending || blocked };
};
