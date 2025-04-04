import { notFound } from 'next/navigation';

import { db } from '@/shared/lib/prisma';

import { getGymInfoyDomain } from './actions/getGymInfoyDomain';
import { GymInfoContextProvider } from './hooks/useGymInfo';

interface GymLayoutProps {
  children: React.ReactNode;
  params: Promise<{ gym: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const gyms = await db.gym.findMany({
    where: { disabled: false },
    select: { domain: true },
  });

  return gyms.map((gym) => ({
    gym: gym.domain,
  }));
}

export default async function GymLayout({ children, params }: GymLayoutProps) {
  const { gym } = await params;
  const gymInfo = await getGymInfoyDomain(gym);

  if (!gymInfo) {
    notFound();
  }

  return <GymInfoContextProvider value={gymInfo}>{children}</GymInfoContextProvider>;
}
