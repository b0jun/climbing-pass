'use client';

import cn from 'classnames';
import { usePathname } from 'next-intl/client';

import BackButton from '../BackButton';

const Header = ({ hasBack = false, bg }: { hasBack?: boolean; bg: string }) => {
	// const isKo = locale === 'ko';
	// const pathname = usePathname();

	return (
		<div className={cn('flex items-center justify-between w-full h-12 pl-3 pr-5', bg)}>
			<BackButton hasBack={hasBack} />
			<div className="flex gap-5">
				{/* <Link href={`${pathname}`} locale="ko" replace>
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
				</Link> */}
			</div>
		</div>
	);
};

export default Header;
