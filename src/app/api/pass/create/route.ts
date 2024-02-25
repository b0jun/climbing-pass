import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

const POST = async (request: NextRequest) => {
	try {
		const { body } = await request.json();
		const { name, phoneNumber, dateOfBirth, signature, type, gym } = body;

		const userData = await prisma.gym.findFirst({
			select: {
				userId: true,
			},
			where: {
				domain: gym,
			},
		});

		await prisma.pass.create({
			data: {
				name,
				phoneNumber,
				dateOfBirth,
				type: type === 'day-pass' ? 'DayPass' : 'DayExperience',
				signature,
				gymId: gym,
				userId: userData?.userId,
			},
		});

		return NextResponse.json(
			{ message: 'success' },
			{
				status: 201,
			}
		);
	} catch (e: any) {
		return NextResponse.json(
			{ message: e.message },
			{
				status: 500,
			}
		);
	}
};

export { POST };
