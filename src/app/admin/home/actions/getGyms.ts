'use server';
import { unstable_cache } from 'next/cache';

import { db } from '@/shared/lib/prisma';

import { GymType } from '../types/gym.type';

export async function getGyms(userId: string): Promise<GymType[]> {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const cachedGetGyms = unstable_cache(
    async (uid: string) => {
      const data = await db.gym.findMany({
        where: { disabled: false, userId: uid },
        select: { id: true, domain: true, name: true, location: true },
      });
      return data ?? [];
    },
    [`gyms-${userId}`],
    { tags: [`gyms-${userId}`] },
  );

  try {
    return await cachedGetGyms(userId);
  } catch (error: any) {
    throw new Error(error.message || 'Internal Server Error');
  }
}
