import { auth } from '@/auth';

export async function authCheck() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('로그인이 필요합니다.');
  }
  return session;
}
