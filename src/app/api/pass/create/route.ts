import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/shared/lib/prisma';

const POST = async (request: NextRequest) => {
  try {
    const { body } = await request.json();
    const { name, phoneNumber, dateOfBirth, shoesRental, signature, type, gym } = body;

    const userData = await db.gym.findFirst({
      select: {
        userId: true,
      },
      where: {
        domain: gym,
      },
    });

    await db.pass.create({
      data: {
        name,
        phoneNumber,
        dateOfBirth,
        type: type === 'dayPass' ? 'DayPass' : 'DayExperience',
        shoesRental: type === 'dayPass' ? shoesRental : true,
        signature,
        gymId: gym,
        userId: userData?.userId,
        status: 'WAIT',
      },
    });

    return NextResponse.json(
      { message: 'success' },
      {
        status: 201,
      },
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      {
        status: 500,
      },
    );
  }
};

export { POST };
