import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

const GET = async (request: NextRequest, context: any) => {
	try {
		const searchParams = request.nextUrl.searchParams;
		const passDate = searchParams.get('passDate');
		const passType = searchParams.get('passType');

		if (!passDate) {
			throw new Error('No Pass Date');
		}

		const token = await getToken({ req: request, secret });
		const userData = verifyJwt(token?.accessToken as string);
		const { gym } = context.params;

		if (!userData) {
			return NextResponse.json(
				{ errorMessage: userData },
				{
					status: 401,
				}
			);
		}

		const { id } = userData;
		const gymData = await prisma.gym.findFirst({
			where: {
				domain: gym,
			},
			select: {
				name: true,
			},
		});
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
				...(passType !== 'all' && { type: passType as 'DayPass' | 'DayExperience' }),
			},
			select: {
				id: true,
				name: true,
				phoneNumber: true,
				dateOfBirth: true,
				createdAt: true,
				type: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});

		const processedPassData = passData.map((pass) => ({
			...pass,
			type: pass.type === 'DayPass' ? '일일이용' : '일일체험',
		}));
		return NextResponse.json(
			{
				gymName: gymData ? gymData.name : '',
				passList: processedPassData ? processedPassData : [],
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
