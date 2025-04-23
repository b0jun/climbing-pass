import { db } from '@/shared/lib/prisma';

export async function checkGymOwner(userId: string, gymDomain: string) {
  const gym = await db.gym.findUnique({
    where: { domain: gymDomain },
    select: { id: true, userId: true },
  });

  if (!gym) {
    throw new Error('등록된 시설이 아닙니다.');
  }

  if (gym.userId !== userId) {
    throw new Error('해당 시설에 대한 권한이 없습니다.');
  }

  return { gymId: gym.id };
}
