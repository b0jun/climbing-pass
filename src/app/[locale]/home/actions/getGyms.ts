'use server';

import prisma from '@/lib/prisma';
import { GymType } from '../types/gym.type';

export async function getGyms(userId: string): Promise<GymType[]> {
  if (!userId) {
    throw new Error('User ID is required');
  }
  try {
    const data = await prisma.gym.findMany({
      where: { disabled: false, userId },
      select: { id: true, domain: true, name: true },
    });
    return data ?? [];
  } catch (error: any) {
    throw new Error(error.message || 'Internal Server Error');
  }
}
