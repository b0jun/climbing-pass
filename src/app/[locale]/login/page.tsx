'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Spinner, TextInput } from '@/shared/components';

import { useLoginMutation } from './hooks/useLoginMutation';
import { LoginFormData, loginSchema } from './schema/loginSchema';

const Login = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { identifier: '', password: '' },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;
  const { mutate, isPending } = useLoginMutation(methods);

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-4 w-full max-w-md rounded-lg border bg-form shadow-sm sm:mx-auto">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Manager Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="px-6">
          <div className="space-y-4">
            <TextInput name="identifier" autoComplete="off" label="아이디" maxLength={20} />
            <TextInput name="password" autoComplete="off" label="비밀번호" maxLength={20} type="password" />
          </div>
          <Button type="submit" disabled={isPending} className={`w-full ${isValid ? '' : 'opacity-50'}`}>
            {isPending ? '로그인 중...' : '로그인'}
          </Button>
        </form>
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Spinner />
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default Login;
