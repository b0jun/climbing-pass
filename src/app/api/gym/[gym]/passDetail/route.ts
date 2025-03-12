import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

const secret = process.env.AUTH_SECRET;

const GET = async (request: NextRequest, context: any) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const passId = searchParams.get('passId');
    if (!passId) {
      throw new Error('No Pass Id');
    }

    const token = await getToken({ req: request, secret });
    const userData = verifyJwt(token?.accessToken as string);
    const { gym } = context.params;

    if (!userData) {
      return NextResponse.json(
        { errorMessage: userData },
        {
          status: 401,
        },
      );
    }

    const gymData = await prisma.gym.findFirst({
      where: {
        domain: gym,
      },
      select: {
        name: true,
      },
    });

    const passDetailData = await prisma.pass.findFirst({
      where: {
        id: passId,
      },
      select: {
        name: true,
        phoneNumber: true,
        dateOfBirth: true,
        createdAt: true,
        type: true,
        signature: true,
      },
    });

    return NextResponse.json(
      {
        gymName: gymData ? gymData.name : '',
        passDetail: passDetailData,
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
