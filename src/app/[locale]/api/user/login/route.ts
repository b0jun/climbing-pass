import * as bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { CustomError } from '@/lib/CustomError';
import { signJwtAccessToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';

interface RequestBody {
	identifier: string;
	password: string;
}

const POST = async (request: NextRequest) => {
	const body: RequestBody = await request.json();
	try {
		const user = await prisma.user.findFirst({
			where: {
				identifier: body.identifier,
			},
		});

		if (!user) {
			throw new CustomError('no user', 400);
		}

		if (!(await bcrypt.compare(body.password, user.password))) {
			throw new CustomError('not match', 400);
		}

		const { password, ...userWithoutPassword } = user;
		const accessToken = signJwtAccessToken(userWithoutPassword);
		const result = {
			accessToken,
		};

		return NextResponse.json(result);
	} catch (e: any) {
		const { message, status } = e;
		return NextResponse.json({ message }, { status });
	}
};

export { POST };
