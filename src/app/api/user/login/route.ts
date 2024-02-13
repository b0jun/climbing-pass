import * as bcrypt from 'bcrypt';

import { signJwtAccessToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';

interface RequestBody {
	identifier: string;
	password: string;
}

export async function POST(request: Request) {
	// console.log('request', request);
	const body: RequestBody = await request.json();
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

		return new Response(JSON.stringify(result));
	}
	return new Response(JSON.stringify(null));
}
