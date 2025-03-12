import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { verifyJwt } from '@/lib/jwt';

const prisma = new PrismaClient();

const getSixMonthsAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  return date;
};

const secret = process.env.AUTH_SECRET;

export async function GET(request: NextRequest, { params }: { params: { gym: string } }) {
  const token = await getToken({ req: request, secret });
  const userData = verifyJwt(token?.accessToken as string);
  // if (!userData) {
  //   return NextResponse.json({ errorMessage: 'No Auth' }, { status: 401 });
  // }
  const { gym } = params;

  if (!gym) {
    return NextResponse.json({ error: 'gym is required' }, { status: 400 });
  }

  try {
    const sixMonthsAgo = getSixMonthsAgo();

    const passes = await prisma.pass.findMany({
      where: {
        gymId: gym,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        createdAt: true,
        type: true,
      },
    });

    // 월별 데이터 가공
    const monthlyDataMap = passes.reduce(
      (acc, pass) => {
        const month = new Date(pass.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!acc[month]) {
          acc[month] = { dailyUse: 0, dailyExp: 0 };
        }
        if (pass.type === 'DayPass') {
          acc[month].dailyUse += 1;
        } else if (pass.type === 'DayExperience') {
          acc[month].dailyExp += 1;
        }
        return acc;
      },
      {} as Record<string, { dailyUse: number; dailyExp: number }>,
    );

    // 6개월 범위 보정
    const result = [];
    const currentDate = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() - i);
      const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      result.push({
        month: monthKey,
        dailyUse: monthlyDataMap[monthKey]?.dailyUse || 0,
        dailyExp: monthlyDataMap[monthKey]?.dailyExp || 0,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching pass data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
