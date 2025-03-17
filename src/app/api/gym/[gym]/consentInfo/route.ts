import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/shared/lib/prisma';

const GET = async (request: NextRequest, context: any) => {
  try {
    const { gym } = context.params;
    const gymData = await db.gym.findFirst({
      where: {
        domain: gym,
      },
      select: {
        name_ko: true,
        name_en: true,
      },
    });

    return NextResponse.json(
      {
        name_ko: gymData?.name_ko,
        name_en: gymData?.name_en,
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: e.code });
  }
};

export { GET };
