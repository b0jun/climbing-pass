'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type Props = {
	dayPass: string;
	dayExperience: string;
	firstVisit: string;
};

const PassButtonList = () => {
	const t = useTranslations('Pass');
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');
	return (
		<div className="flex-col flex gap-4 xs:flex-row xs:gap-6 mb-20">
			<Link
				href={{
					pathname: `${pathname}/dayPass/consent`,
					query: {
						...(lang && { lang }),
					},
				}}
				className="w-full h-24 flex items-center justify-center xs:w-32 xs:h-44 rounded-md shadow-lg text-darkBlue bg-lightBlue"
			>
				<h3 className="font-bold text-base xs:text-xl">{t('dayPass')}</h3>
			</Link>
			<Link
				href={{
					pathname: `${pathname}/dayExperience/consent`,
					query: {
						...(lang && { lang }),
					},
				}}
				className="w-full h-24 flex flex-col items-center justify-center xs:w-32 xs:h-44 rounded-md shadow-lg text-extraDarkBlue bg-extraLightBlue"
			>
				<h3 className="font-bold xs:mt-6 text-center text-base xs:text-xl">{t('dayExperience')}</h3>
				<p className="text-xs xs:text-sm">({t('firstVisit')})</p>
			</Link>
		</div>
	);
};

export default PassButtonList;

// const PassButtonList = ({ dayPass, dayExperience, firstVisit }: Props) => {
// 	const locale = useLocale();
// 	const isKo = locale === 'ko';
// 	const { gym } = useParams();

// 	return (
// 		<div className="flex gap-6">
// 			<Link
// 				href={`/${gym}/consent/dayPass`}
// 				className="flex items-center justify-center w-32 h-44 mb-20 rounded-md shadow-lg text-darkBlue bg-lightBlue"
// 			>
// 				<h3 className={cn('font-bold', isKo ? 'text-xl' : 'text-lg')}>{dayPass}</h3>
// 			</Link>
// 			<Link
// 				href={`/${gym}/consent/dayExperience`}
// 				className="flex flex-col items-center justify-center w-32 h-44 rounded-md shadow-lg text-extraDarkBlue bg-extraLightBlue"
// 			>
// 				<h3 className={cn('font-bold mt-6 text-center', isKo ? 'text-xl' : 'text-lg')}>
// 					{dayExperience}
// 				</h3>
// 				<p className="text-base">({firstVisit})</p>
// 			</Link>
// 		</div>
// 	);
// };

// export default PassButtonList;
