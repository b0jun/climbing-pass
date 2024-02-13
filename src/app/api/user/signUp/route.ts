import * as bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';

interface RequestBody {
	name: string;
	identifier: string;
	password: string;
}

export async function POST(request: Request) {
	const body: RequestBody = await request.json();
	const salt = await bcrypt.genSalt();

	const user = await prisma.user.create({
		data: {
			name: body.name,
			identifier: body.identifier,

			password: await bcrypt.hash(body.password, salt),
		},
	});

	const { password, ...result } = user;
	return new Response(JSON.stringify(result));
}
