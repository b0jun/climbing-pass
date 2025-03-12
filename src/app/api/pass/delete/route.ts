import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

const secret = process.env.AUTH_SECRET;

const DELETE = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request, secret });
    const userData = verifyJwt(token?.accessToken as string);

    if (!userData) {
      return NextResponse.json(
        { errorMessage: 'No Auth' },
        {
          status: 401,
        },
      );
    }

    const gymData = await prisma.gym.findFirst({
      where: {
        userId: userData.id,
      },
    });

    if (!gymData) {
      return NextResponse.json(
        { errorMessage: 'No Permission' },
        {
          status: 403,
        },
      );
    }

    const { body } = await request.json();
    const { id } = body;

    await prisma.pass.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
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

export { DELETE };
