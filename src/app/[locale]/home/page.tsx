import { Suspense } from 'react';

import { auth } from '@/auth';

import { redirect } from 'next/navigation';
import { GymList } from './components/GymList/GymList';

export default async function HomePage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return redirect('/login');
  }
  return (
    <GymList>
      <Suspense fallback={<GymList.Skeleton />}>
        <GymList.Content userId={session.user.id} />
      </Suspense>
    </GymList>
  );
}
