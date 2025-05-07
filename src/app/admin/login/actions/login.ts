'use server';

import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

import { loginSchema, LoginSchemaType } from '../schema/loginSchema';

type AuthResponse = {
  fields?: LoginSchemaType;
  errors?: Record<string, string[]>;
};

export async function login(_: AuthResponse, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validated = loginSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      fields: rawData as LoginSchemaType,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { identifier, password } = validated.data;
  try {
    await signIn('credentials', {
      identifier,
      password,
    });
    redirect('/admin/home');
  } catch (err) {
    if (err instanceof AuthError) {
      return {
        fields: validated.data,
        errors: {
          password: ['아이디 또는 비밀번호가 올바르지 않습니다.'],
        },
      };
    }
    throw err;
  }
}
/*
* [AuthError: Error Message 참고]
case 'Invalid identifier':
throw new Error('아이디가 올바르지 않습니다.');
case 'Invalid password':
throw new Error('비밀번호가 올바르지 않습니다.');
case 'Missing credentials':
throw new Error('아이디와 비밀번호를 입력해주세요.');
*/
