'use client';

import { useRouter } from 'next/navigation';

const RootPage = () => {
	const router = useRouter();
	return (
		<div className="flex w-full h-full items-center justify-center">
			<div className="flex flex-col items-center gap-4 bg-form p-20 rounded-2xl">
				<p className="text-lg">지원하지 않는 페이지입니다.</p>
				<button
					type="button"
					onClick={() => router.back()}
					className="bg-blue-300 px-3 py-1 rounded-md w-[100px]"
				>
					뒤로가기
				</button>
			</div>
		</div>
	);
};

export default RootPage;
