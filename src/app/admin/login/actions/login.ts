'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

import { LoginFormData, loginSchema } from '../schema/loginSchema';

type AuthResponse =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export async function login(data: LoginFormData): Promise<AuthResponse> {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: '아이디 또는 비밀번호가 올바르지 않습니다.',
    };
  }

  const { identifier, password } = data;

  try {
    await signIn('credentials', {
      identifier,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      return {
        success: false,
        message: '아이디 또는 비밀번호가 올바르지 않습니다.',
      };
    }
    return {
      success: false,
      message: '인증 오류가 발생했습니다.',
    };
  }
}
/*
[Error Message 참고]
case 'Invalid identifier':
throw new Error('아이디가 올바르지 않습니다.');
case 'Invalid password':
throw new Error('비밀번호가 올바르지 않습니다.');
case 'Missing credentials':
throw new Error('아이디와 비밀번호를 입력해주세요.');
*/
