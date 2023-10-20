'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LANGUAGE } from '../constants/lang';
import Header from '../components/Header';

const Pass = () => {
	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');
	const isEng = lang === 'en';
	const currentLang = isEng ? 'EN' : 'KO';

	return (
		<main className="flex flex-col items-center justify-center py-10">
			<Header />
			<div className="relative w-36 h-36 my-14">
				<Image src="/images/logo.png" alt="logo" fill />
			</div>
			<Link
				href={{
					pathname: '/register',
					query: { pass: 'day-pass', ...(lang && { lang }) },
				}}
				className="w-56 h-32 bg-blue-200 flex flex-col justify-center items-center rounded-md mb-20 shadow-lg"
			>
				<h3 className="text-2xl">{LANGUAGE[currentLang].dayPass1}</h3>
			</Link>
			<Link
				href={{
					pathname: '/register',
					query: { pass: 'first-visit', ...(lang && { lang }) },
				}}
				className="w-56 h-32 bg-blue-200 flex flex-col justify-center items-center rounded-md shadow-lg"
			>
				<h3 className="text-2xl">{LANGUAGE[currentLang].dayPass2}</h3>
				<p>({LANGUAGE[currentLang].firstVisit})</p>
			</Link>
		</main>
	);
};

export default Pass;
