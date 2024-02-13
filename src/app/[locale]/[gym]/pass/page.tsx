import Image from 'next/image';
import { useTranslations } from 'next-intl';

import PassButtonList from '@/components/PassButtonList';

export const dynamicParams = false;

const Pass = () => {
	const t = useTranslations('Pass');

	return (
		<section className="flex flex-col">
			<div className="flex flex-col px-5 mx-auto">
				<div className="flex justify-center my-8">
					<div className="w-[120px] h-[120px] bg-stone-400/10 rounded-[60px] flex items-center justify-center">
						<Image src="/images/logo.png" alt="logo" width={120} height={120} />
					</div>
				</div>
				<div className="px-3 mb-8 text-center">
					<h2 className="mb-2 text-3xl font-black text-extraDarkBlue">
						{t('selectPass')}
					</h2>
					<h2 className="text-lg font-bold opacity-80">{t('selectPassDesc')}</h2>
				</div>
				<PassButtonList
					dayPass={t('dayPass')}
					dayExperience={t('dayExperience')}
					firstVisit={t('firstVisit')}
				/>
			</div>
		</section>
	);
};

export default Pass;
