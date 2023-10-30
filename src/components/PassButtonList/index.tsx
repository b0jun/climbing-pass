'use client';

import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next-intl/link';

type Props = {
	dayPass: string;
	dayExperience: string;
	firstVisit: string;
};

const PassButtonList = ({ dayPass, dayExperience, firstVisit }: Props) => {
	const locale = useLocale();
	const isKo = locale === 'ko';
	const { gym } = useParams();

	return (
		<div className="flex gap-6">
			<Link
				href={`/${gym}/consent/day-pass`}
				className="flex items-center justify-center w-32 h-44 mb-20 rounded-md shadow-lg text-darkBlue bg-lightBlue"
			>
				<h3 className={cn('font-bold', isKo ? 'text-xl' : 'text-lg')}>{dayPass}</h3>
			</Link>
			<Link
				href={`/${gym}/consent/day-experience`}
				className="flex flex-col items-center justify-center w-32 h-44 rounded-md shadow-lg text-extraDarkBlue bg-extraLightBlue"
			>
				<h3 className={cn('font-bold mt-6 text-center', isKo ? 'text-xl' : 'text-lg')}>
					{dayExperience}
				</h3>
				<p className="text-base">({firstVisit})</p>
			</Link>
		</div>
	);
};

export default PassButtonList;
