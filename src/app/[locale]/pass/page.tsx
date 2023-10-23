import Image from 'next/image';

import Header from '@/components/Header';
import PassButtonList from '@/components/PassButtonList';

const Pass = () => {
	return (
		<main className="flex flex-col items-center justify-center">
			<Header />
			<div className="relative w-36 h-36 my-14">
				<Image src="/images/logo.png" alt="logo" fill />
			</div>
			<div className="w-full mb-8 px-28">
				<h2 className="mb-2 text-4xl font-black text-indigo-900">이용권 선택</h2>
				<h2 className="text-lg font-bold">☺︎이용권 유형을 선택해주세요.</h2>
			</div>
			<PassButtonList />
		</main>
	);
};

export default Pass;
