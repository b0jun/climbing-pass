import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

const POST = async (request: NextRequest) => {
	try {
		console.log('##request##', request);
		const data = await prisma.pass.create({
			data: {
				name: '123',
				phoneNumber: '01046466415',
				dateOfBirth: '1994/02/28',
				signature: '1232',
				type: 'DayPass',
			},
		});
		console.log('data@@', data);
		// const fetchOption = await fetchOptions({
		// 	method: 'POST',
		// 	data: {
		// 		blocks: {
		// 			searchPage,
		// 		},
		// 	},
		// });
		// const fetchResult = await fetch(`${EXTERNAL_API_URL}/blocks/list`, fetchOption.options);
		// const result = await fetchParser(fetchResult);
		// return NextResponse.json(result.data, { status: result.status });
	} catch (e: any) {
		console.log('e@@', e);

		// return NextResponse.json({ message: e.message }, { status: 500 });
	}
};

export { POST };
