import { notFound, redirect } from 'next/navigation';

import { auth } from '@/auth';
import { db } from '@/shared/lib/prisma';

import { AdminLayout } from './components';

interface GymLayoutProps {
  children: React.ReactNode;
  params: Promise<{ gym: string }>;
}

export default async function GymLayout({ children, params }: GymLayoutProps) {
  const { gym } = await params;
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = session.user.id;

  const gymData = await db.gym.findUnique({
    where: { domain: gym, disabled: false },
    select: {
      id: true,
      name: true,
      logo: true,
      userId: true,
      // TODO: location 추가
    },
  });

  if (!gymData) {
    notFound();
  }

  if (gymData.userId !== userId) {
    // TODO: 403
    notFound();
  }

  return (
    <main className="min-h-screen w-full min-w-[360px]">
      {/* TODO: logo 필수 값으로 수정 후 as string 제거 */}
      <AdminLayout gymName={gymData.name} logo={gymData.logo as string}>
        {children}
      </AdminLayout>
    </main>
  );
}
