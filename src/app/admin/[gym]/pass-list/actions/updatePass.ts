'use server';

import { checkAuth } from '@/shared/lib';
import { db } from '@/shared/lib/prisma';

import { PassUpdateRequest } from '../types/pass-list.type';

type UpdatePassResponse =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export async function updatePass({ id, status, type, shoesRental }: PassUpdateRequest): Promise<UpdatePassResponse> {
  await checkAuth();

  const updateData: Omit<PassUpdateRequest, 'id'> = {};

  if (status) updateData.status = status;
  if (type) updateData.type = type;
  if (shoesRental !== undefined) updateData.shoesRental = shoesRental;

  await db.pass.update({
    where: { id },
    data: updateData,
  });

  return { success: true };
}
