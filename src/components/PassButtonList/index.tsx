import cn from 'classnames';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next-intl/link';

const PassButtonList = () => {
	const t = useTranslations('Pass');
	const locale = useLocale();
	const isKo = locale === 'ko';

	return (
		<div className="flex gap-6">
			<Link
				href="/consent/day-pass"
				className="flex items-center justify-center w-32 h-44 mb-20 rounded-md shadow-lg text-darkBlue bg-lightBlue"
			>
				<h3 className={cn('font-bold', isKo ? 'text-xl' : 'text-lg')}>{t('dayPass')}</h3>
			</Link>
			<Link
				href="/consent/day-experience"
				className="flex flex-col items-center justify-center w-32 h-44 rounded-md shadow-lg text-extraDarkBlue bg-extraLightBlue"
			>
				<h3 className={cn('font-bold mt-6 text-center', isKo ? 'text-xl' : 'text-lg')}>
					{t('dayExperience')}
				</h3>
				<p className="text-base">({t('firstVisit')})</p>
			</Link>
		</div>
	);
};

export default PassButtonList;
