import { unstable_cache } from 'next/cache';

import { checkAuth } from '@/shared/lib';
import { db } from '@/shared/lib/prisma';

import { GymType } from '../types/gym.type';

export async function getGyms(): Promise<GymType[]> {
  const { userId } = await checkAuth();
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
