import { unstable_cache } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/shared/lib/prisma';

import { GymType } from '../types/gym.type';

export async function getGyms(): Promise<GymType[]> {
  const session = await auth();
  const userId = session?.user?.id as string; // * HomePage에서 Check

  const cachedGetGyms = unstable_cache(
    async (uid: string) => {
      const data = await db.gym.findMany({
        where: { disabled: false, userId: uid },
        select: { id: true, domain: true, name: true, location: true },
      });
      return data ?? [];
    },
    [`gyms-${userId}`],
    { tags: [`gyms-${userId}`], revalidate: 3600 },
  );

  try {
    return await cachedGetGyms(userId);
  } catch (error: any) {
    throw new Error(error.message || 'Internal Server Error');
  }
}
