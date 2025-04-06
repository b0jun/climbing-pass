import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import { GymList } from './components';

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/admin/login');
  return <GymList userId={session.user.id} />;
}
