import Image from 'next/image';

import PassButtonList from '@/components/PassButtonList';

export const dynamicParams = false;

const Pass = () => {
	return (
		<section className="flex flex-col">
			<div className="flex flex-col px-5 mx-auto">
				<div className="flex justify-center my-8">
					<div className="w-[120px] h-[120px] bg-stone-400/10 rounded-[60px] flex items-center justify-center">
						<Image src="/images/logo.png" alt="logo" width={120} height={120} />
					</div>
				</div>
				<div className="px-3 mb-8 text-center">
					<h2 className="mb-2 text-3xl font-black text-extraDarkBlue">이용권 선택</h2>
					<h2 className="text-lg font-bold opacity-80">이용권 유형을 선택해주세요.</h2>
				</div>
				<PassButtonList />
			</div>
		</section>
	);
};

export default Pass;
