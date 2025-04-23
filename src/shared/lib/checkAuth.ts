import { redirect } from 'next/navigation';

import { auth } from '@/auth';

export async function checkAuth() {
  const session = await auth();
  if (!session || !session.user || typeof session.user.id !== 'string') {
    redirect('/admin/login');
  }
  return { userId: session.user.id };
}
