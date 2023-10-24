import Image from 'next/image';

import Header from '@/components/Header';
import PassButtonList from '@/components/PassButtonList';

const Pass = () => {
	return (
		<main className="flex flex-col">
			<Header />
			<div className="flex flex-col px-5 mx-auto">
				<div className="flex justify-center my-8">
					<Image src="/images/logo.png" alt="logo" width={144} height={144} />
				</div>
				<div className="px-3 mb-8">
					<h2 className="mb-2 text-3xl font-black text-extraDarkBlue">이용권 선택</h2>
					<h2 className="text-lg font-bold opacity-80">이용권 유형을 선택해주세요.</h2>
				</div>
				<PassButtonList />
			</div>
		</main>
	);
};

export default Pass;
