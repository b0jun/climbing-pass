import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export const dynamic = 'force-dynamic';

const GET = async (request: NextRequest) => {
	try {
		const token = await getToken({ req: request, secret });
		const userData = verifyJwt(token?.accessToken as string);

		if (!userData) {
			return NextResponse.json(
				{ errorMessage: userData },
				{
					status: 401,
				}
			);
		}

		const { id } = userData;

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
