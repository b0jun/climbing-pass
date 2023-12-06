'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Button from '@/components/Button';

type Props = {
	params: {
		gym: string;
	};
};

const Complete = ({ params: { gym } }: Props) => {
	const t = useTranslations('Complete');
	const router = useRouter();
	const goToMain = () => {
		router.replace(`/${gym}/pass`);
	};

	return (
		<div className="flex flex-col items-center px-4 text-center w-full">
			<Image
				src="/images/complete.png"
				width={128}
				height={128}
				alt="complete"
				className="animate-bounce"
			/>
			<h3 className="text-xl my-3 font-bold">{t('titlePass')}</h3>
			<h4 className="text-base">{t('description')}</h4>
			<div className="mt-5 w-[250px]">
				<Button label={t('goToMain')} onClick={goToMain} />
			</div>
		</div>
	);
};

export default Complete;
