import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

const GET = async (request: NextRequest, context: any) => {
	try {
		const token = await getToken({ req: request, secret });
		const userData = verifyJwt(token?.accessToken as string);
		const { gym } = context.params;

		if (!userData) {
			return NextResponse.json(
				{ errorMessage: 'No Auth' },
				{
					status: 401,
				}
			);
		}
		const gymData = await prisma.gym.findFirst({
			where: {
				domain: gym,
				userId: userData.id,
			},
			select: {
				name: true,
			},
		});

		if (!gymData) {
			return NextResponse.json(
				{ errorMessage: 'No Permission' },
				{
					status: 403,
				}
			);
		}

		const searchParams = request.nextUrl.searchParams;
		const passDate = searchParams.get('passDate') ?? dayjs().format('YYYY/MM/DD');
		const passType = searchParams.get('passType');

		const { id } = userData;

		const nextDate = new Date(passDate);
		nextDate.setDate(nextDate.getDate() + 1);

		const passData = await prisma.pass.findMany({
			where: {
				userId: id,
				gymId: gym,
				createdAt: {
					gte: new Date(passDate),
					lt: new Date(nextDate),
				},
				...(passType && { type: passType as 'DayPass' | 'DayExperience' }),
				NOT: {
					status: 'DELETED',
				},
			},
			select: {
				id: true,
				name: true,
				phoneNumber: true,
				dateOfBirth: true,
				createdAt: true,
				type: true,
				status: true,
				shoesRental: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(
			{
				gymName: gymData ? gymData.name : '',
				passList: passData ? passData : [],
			},
			{
				status: 200,
			}
		);
	} catch (e: any) {
		return NextResponse.json({ message: e.message }, { status: e.code });
	}
};

export { GET };