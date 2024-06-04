// app/dolmenge_jeonpo/pass/[slug]/layout.js
import { notFound } from 'next/navigation';

import { PassType } from '@/types/pass';

export default function Layout({
	children,
	params: { type },
}: {
	children: React.ReactNode;
	params: { type: PassType };
}) {
	if (type === 'dayPass' || type === 'dayExperience') {
		return <>{children}</>;
	} else {
		notFound();
	}
}
