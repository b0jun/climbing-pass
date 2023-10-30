import Link from 'next/link';

import { locales } from '@/constants/locales';

export const dynamicParams = false;

export function generateStaticParams() {
	// TODO: GET DB GYM LIST
	const gyms = ['brosclimbing'];

	return locales
		.map((locale) => {
			return gyms.map((gym) => ({ locale, gym }));
		})
		.flat();
}

const Gym = ({ params: { gym } }: { params: { gym: string } }) => {
	return (
		<>
			<Link href={`/${gym}/pass`}>{gym} PASS</Link>
		</>
	);
};

export default Gym;
