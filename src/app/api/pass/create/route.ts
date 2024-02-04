import { NextRequest, NextResponse } from 'next/server';

const POST = async (request: NextRequest) => {
	try {
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
		// return NextResponse.json({ message: e.message }, { status: 500 });
	}
};

export { POST };
