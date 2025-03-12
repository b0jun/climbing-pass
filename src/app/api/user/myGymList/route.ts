import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const GET = async (request: NextRequest) => {
  try {
    const cookieStore = await cookies();
    console.log('cookie:', cookieStore);

    const session = await auth();
    console.log('@@@@@session SERVER:', session);
    // if (!session || !session.user?.id) {
    //   return NextResponse.json({ errorMessage: 'Unauthorized' }, { status: 401 });
    // }

    // const id = session.user.id;
    const id = 'clvffhawu0000y5hax0mmu4ny';
    const data = await prisma.gym.findMany({
      where: {
        disabled: false,
        userId: id,
      },
      select: {
        id: true,
        domain: true,
        name: true,
      },
    });
    return NextResponse.json(data ? data : [], {
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: e.code });
  }
};

export { GET };
