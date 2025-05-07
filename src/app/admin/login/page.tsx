'use client';

import { useActionState } from 'react';

import { Button, Input, Spinner } from '@/shared/components';

import { login } from './actions/login';

const initialState = {
  fields: { identifier: '', password: '' },
  errors: { identifier: [], password: [] },
};

export default function Login() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  return (
    <div className="bg-form mx-4 w-full max-w-md rounded-lg border shadow-xs sm:mx-auto">
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Manager Login</h1>
      </div>
      <form action={formAction} className="px-6">
        <div className="space-y-2">
          <Input
            name="identifier"
            type="text"
            defaultValue={state.fields?.identifier}
            autoComplete="off"
            label="아이디"
            errorMessage={state.errors?.identifier?.[0]}
          />
          <Input
            name="password"
            type="password"
            defaultValue={state.fields?.password}
            autoComplete="off"
            label="비밀번호"
            errorMessage={state.errors?.password?.[0]}
          />
        </div>
        <Button type="submit" disabled={isPending} className={`w-full ${isPending ? 'opacity-50' : ''}`}>
          로그인
        </Button>
      </form>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Spinner />
        </div>
      )}
    </div>
  );
}
