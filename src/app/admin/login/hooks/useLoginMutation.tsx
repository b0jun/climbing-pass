'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { login } from '../actions/login';
import { LoginFormData } from '../schema/loginSchema';

export function useLoginMutation(methods: UseFormReturn<LoginFormData>) {
  const { setError } = methods;
  const router = useRouter();
  const [blocked, setBlocked] = useState(false); // * 로그인 성공 후 버튼 비활성화

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (!response.success) {
        setError('identifier', { message: response.message });
        setError('password', { message: '' });
        return;
      }

      setBlocked(true);
      router.push('/admin/home');
    },
    onError: (error) => {
      toast.error('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
    },
  });

  return { mutate, isPending: isPending || blocked };
}
