'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import { PassType } from '@/types/pass';

type Props = {
	params: {
		gym: string;
		type: PassType;
	};
};

const Complete = ({ params: { gym, type } }: Props) => {
	const router = useRouter();
	const goToMain = () => {
		router.replace(`/${gym}/pass`);
	};
	const isDayPass = type === 'dayPass';

	return (
		<section className="flex flex-col items-center px-4 text-center w-full">
			<Image src="/images/complete.png" width={128} height={128} alt="complete" className="animate-bounce" />
			<h3 className="text-xl my-3 font-bold">{isDayPass ? '일일이용' : '일일체험'} 신청 완료</h3>
			<h4 className="text-base">카운터 직원에게 이 화면을 보여주세요.</h4>
			<div className="mt-5 w-[250px]">
				<Button label="처음으로" onClick={goToMain} />
			</div>
		</section>
	);
};

export default Complete;
