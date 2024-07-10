'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
	const t = useTranslations('Complete');

	return (
		<section className="flex flex-col items-center px-4 text-center w-full">
			<Image src="/images/complete.png" width={128} height={128} alt="complete" className="animate-bounce" />
			<h3 className="text-xl my-3 font-bold">{t(isDayPass ? 'titlePass' : 'titleExperience')}</h3>
			<h4 className="text-base">{t('description')}</h4>
			<div className="mt-5 w-[250px]">
				<Button label={t('goToMain')} onClick={goToMain} />
			</div>
		</section>
	);
};

export default Complete;
