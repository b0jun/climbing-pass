import { unstable_cache } from 'next/cache';

import { db } from '@/shared/lib/prisma';

import { GymInfoResoponse } from '../types/gymInfo.type';

export async function getGymInfoyDomain(gymDomain: string): Promise<GymInfoResoponse> {
  if (!gymDomain) {
    throw new Error('Gym Params가 없습니다.');
  }

  const cachedGetGymInfoByDomain = unstable_cache(
    async (domain: string) => {
      const gym = await db.gym.findUnique({
        where: { domain, disabled: false },
        select: { logo: true, name: true, name_en: true, location: true, location_en: true },
      });

      if (!gym) {
        throw new Error('Gym데이터를 찾을 수 없습니다.');
      }
      const names = {
        ko: gym.name,
        en: gym.name_en,
      };
      const locations = {
        ko: gym.location,
        en: gym.location_en,
      };

      return { logo: gym.logo, names, locations };
    },
    [`gym-info-${gymDomain}`],
    { tags: [`gym-info-${gymDomain}`] },
  );
  try {
    return await cachedGetGymInfoByDomain(gymDomain);
  } catch (error: any) {
    throw new Error(error.message || 'Internal Server Error');
  }
}

// import { unstable_cache } from 'next/cache';

// import { db } from '@/shared/lib/prisma';

// export const getGymByDomain = unstable_cache(
//   async (domain: string) => {
//     return await db.gym.findUnique({
//       where: { domain },
//     });
//   },
//   (domain) => [`gym-${domain}`],
//   {
//     revalidate: 3600, // 1시간마다 캐시 갱신
//     tags: ['gym'], // 선택적 태그
//   },
// );
