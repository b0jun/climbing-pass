'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { login } from '../actions/login';
import { LoginFormData } from '../schema/loginSchema';

export function useLoginMutation(methods: UseFormReturn<LoginFormData>) {
  const { setError } = methods;
  const router = useRouter();
  const [blocked, setBlocked] = useState(false); // 로그인 성공 후 버튼 비활성화

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setBlocked(true);
      router.push('/home');
    },
    onError: (error: Error) => {
      setError('identifier', { message: error.message });
      setError('password', { message: '' });
    },
  });

  return { mutate, isPending: isPending || blocked };
}
