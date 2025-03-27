'use server';

import { auth } from '@/auth';
import { db } from '@/shared/lib/prisma';

import { PassUpdateRequest } from '../types/pass.type';

type UpdatePassResponse =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export async function updatePass({ id, status, type, shoesRental }: PassUpdateRequest): Promise<UpdatePassResponse> {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return {
        success: false,
        message: '권한이 없습니다.',
      };
    }

    const updateData: Omit<PassUpdateRequest, 'id'> = {};

    if (status) updateData.status = status;
    if (type) updateData.type = type;
    if (shoesRental !== undefined) updateData.shoesRental = shoesRental;

    await db.pass.update({
      where: { id },
      data: updateData,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: '패스 수정에 실패하였습니다.',
    };
  }
}
