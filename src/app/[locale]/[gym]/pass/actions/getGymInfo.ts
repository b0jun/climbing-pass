import { unstable_cache } from 'next/cache';

import { db } from '@/shared/lib/prisma';

import { GymInfoResoponse } from '../types/gymInfo.type';

export async function getGymInfo(gymDomain: string): Promise<GymInfoResoponse> {
  if (!gymDomain) {
    throw new Error('Gym Params is required');
  }

  const cachedGetGymInfo = unstable_cache(
    async (gdomain: string) => {
      const gym = await db.gym.findUnique({
        where: { domain: gdomain, disabled: false },
        select: { logo: true, name: true, name_ko: true, name_en: true },
      });

      if (!gym) {
        throw new Error('Gym not found');
      }
      const names = {
        ko: gym.name,
        en: gym.name_en || gym.name,
      };
      // TODO: 지점 스키마 추가
      const locations = {
        ko: '전포',
        en: 'jeonpo',
      };
      return { logo: gym.logo, names, locations };
    },
    [`gym-info-${gymDomain}`],
    { tags: [`gym-info-${gymDomain}`] },
  );
  try {
    return await cachedGetGymInfo(gymDomain);
  } catch (error: any) {
    throw new Error(error.message || 'Internal Server Error');
  }
}
