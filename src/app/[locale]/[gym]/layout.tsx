import { notFound } from 'next/navigation';

import { db } from '@/shared/lib/prisma';

interface GymLayoutProps {
  children: React.ReactNode;
  params: Promise<{ gym: string }>;
}

export default async function GymLayout({ children, params }: GymLayoutProps) {
  const { gym } = await params;
  const gymExists = await db.gym.findUnique({
    where: { domain: gym, disabled: false },
    select: { id: true },
  });

  if (!gymExists) {
    notFound();
  }

  return <>{children}</>;
}
