'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import TextInput from '@/components/TextInput';
import { authenticate } from '@/lib/actions';

type FormData = {
  identifier: string;
  password: string;
};

const formInit = () => {
  const validations = {
    identifier: yup.string().required('아이디를 입력해주세요.'),
    password: yup.string().required('패스워드를 입력해주세요.'),
  };
  const resolver = yupResolver(yup.object().shape(validations));
  return { resolver };
};

const Login = () => {
  const methods = useForm<FormData>({ ...formInit(), mode: 'onBlur' });
  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = methods;
  const handleLogin = async (data: FormData) => {
    const result = await authenticate(data);
    if (result?.error) {
      if (result.error.message) {
        setError('identifier', { message: '아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.' });
        setError('password', { message: '' });
      }
    } else if (result.success) {
      window.location.href = '/home';
    }
  };
  console.log('VERCEL_URL:', process.env.VERCEL_URL);

  return (
    <FormProvider {...methods}>
      <div className="flex w-[400px] flex-col gap-4 px-4">
        <h1 className="text-4xl font-semibold">Manager 로그인</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleLogin)}>
          <TextInput name="identifier" autoComplete="off" label="아이디" maxLength={20} />
          <TextInput name="password" autoComplete="off" label="비밀번호" maxLength={20} type="password" />
          <Button type="submit" label="로그인" disabled={isSubmitting} />
        </form>
      </div>
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Spinner />
        </div>
      )}
    </FormProvider>
  );
};

export default Login;
