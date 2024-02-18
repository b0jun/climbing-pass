'use client';

import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';

const GymWhiteList = () => {
	const { gym } = useParams();
	useEffect(() => {
		if (gym !== 'dolmenge_jeonpo') {
			notFound();
		}
	}, [gym]);
	return null;
};

export default GymWhiteList;
