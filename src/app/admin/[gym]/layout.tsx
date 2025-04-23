import { notFound } from 'next/navigation';

import { checkAuth } from '@/shared/lib';
import { db } from '@/shared/lib/prisma';

import { AdminLayout } from './components';

interface GymLayoutProps {
  children: React.ReactNode;
  params: Promise<{ gym: string }>;
}

export default async function GymLayout({ children, params }: GymLayoutProps) {
  const { gym } = await params;
  const { userId } = await checkAuth();

  const gymData = await db.gym.findUnique({
    where: { domain: gym, disabled: false },
    select: {
      id: true,
      name: true,
      logo: true,
      userId: true,
      location: true,
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
      <AdminLayout gymName={gymData.name} logo={gymData.logo} location={gymData.location}>
        {children}
      </AdminLayout>
    </main>
  );
}
