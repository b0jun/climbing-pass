import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import { GymList } from './components';

export default async function HomePage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return redirect('/admin/login');
  }

  return <GymList />;
}
