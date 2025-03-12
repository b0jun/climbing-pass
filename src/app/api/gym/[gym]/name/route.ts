import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

const GET = async (request: NextRequest, context: any) => {
  try {
    const { gym } = context.params;

    const gymData = await prisma.gym.findFirst({
      where: {
        domain: gym,
      },
      select: {
        name: true,
      },
    });

    return NextResponse.json(gymData ? gymData.name : '', {
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: e.code });
  }
};

export { GET };
