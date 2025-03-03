'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

interface AuthResponse {
  success?: boolean;
  message?: string;
  error?: {
    message: string;
    details?: string;
  };
}

export async function authenticate(formData: { identifier: string; password: string }): Promise<AuthResponse> {
  try {
    await signIn('credentials', {
      identifier: formData.identifier,
      password: formData.password,
      redirect: false,
    });
    return { success: true, message: '로그인에 성공했습니다.' };
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: { message: err.message } };
    }
    return { error: { message: '로그인에 실패했습니다.', details: err instanceof Error ? err.message : String(err) } };
  }
}
