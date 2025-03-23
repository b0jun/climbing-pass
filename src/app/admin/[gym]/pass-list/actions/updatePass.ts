import { db } from '@/shared/lib/prisma';

export async function updatePass(passId: string, type: 'DayPass' | 'DayExperience') {
  return await db.pass.update({
    where: { id: passId },
    data: { type },
  });
}
