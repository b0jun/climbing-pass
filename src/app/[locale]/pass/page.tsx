import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Header from '@/components/Header';

const Pass = () => {
	const t = useTranslations('Pass');

	return (
		<main className="flex flex-col items-center justify-center">
			<Header />
			<div className="relative w-36 h-36 my-14">
				<Image src="/images/logo.png" alt="logo" fill />
			</div>
			<Link
				href="/consent/day-pass"
				className="flex flex-col items-center justify-center w-56 h-32 mb-20 bg-blue-200 rounded-md shadow-lg"
			>
				<h3 className="text-2xl">{t('dayPass')}</h3>
			</Link>
			<Link
				href="/consent/day-experience"
				className="flex flex-col items-center justify-center w-56 h-32 bg-blue-200 rounded-md shadow-lg"
			>
				<h3 className="text-2xl">{t('dayExperience')}</h3>
				<p>({t('firstVisit')})</p>
			</Link>
		</main>
	);
};

export default Pass;
