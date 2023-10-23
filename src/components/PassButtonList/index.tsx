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
				className="flex items-center justify-center mb-20 text-white rounded-md shadow-lg h-52 bg-indigo-950 w-44"
			>
				<h3 className={cn('font-bold', isKo ? 'text-2xl' : 'text-xl')}>{t('dayPass')}</h3>
			</Link>
			<Link
				href="/consent/day-experience"
				className="flex flex-col items-center justify-center text-white bg-indigo-900 rounded-md shadow-lg h-52 w-44"
			>
				<h3 className={cn('font-bold mt-6', isKo ? 'text-2xl' : 'text-xl')}>
					{t('dayExperience')}
				</h3>
				<p>({t('firstVisit')})</p>
			</Link>
		</div>
	);
};

export default PassButtonList;
