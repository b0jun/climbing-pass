import * as bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

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

		if (user && (await bcrypt.compare(body.password, user.password))) {
			const { password, ...userWithoutPassword } = user;
			const accessToken = signJwtAccessToken(userWithoutPassword);
			const result = {
				accessToken,
			};

			return NextResponse.json(result);
		}
	} catch (e: any) {
		return NextResponse.json({ message: e.message }, { status: e.code });
	}
};

export { POST };
