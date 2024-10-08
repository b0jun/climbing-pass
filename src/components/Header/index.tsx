'use client';

import cn from 'classnames';
import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/navigation';

import BackButton from '../BackButton';

const Header = ({ hasBack = false, bg }: { hasBack?: boolean; bg: string }) => {
	const pathname = usePathname();
	const locale = useLocale();
	const isKo = locale !== 'en';
	return (
		<div className={cn('flex items-center justify-between w-full h-12 pl-3 pr-5', bg)}>
			<BackButton hasBack={hasBack} />
			<div className="flex gap-5">
				<Link href={`${pathname}`} locale="ko" replace>
					<p
						className={cn('text-gray-600 text-base h-12 flex items-center', {
							['underline']: isKo,
						})}
					>
						한국어
					</p>
				</Link>
				<Link href={`${pathname}`} locale="en" replace>
					<p
						className={cn('text-gray-600 text-base h-12 flex items-center', {
							['underline']: !isKo,
						})}
					>
						English
					</p>
				</Link>
			</div>
		</div>
	);
};

export default Header;
