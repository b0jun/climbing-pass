'use client';

import Image from 'next/image';
import { useRouter } from 'next-intl/client';

const BackButton = ({ hasBack }: { hasBack: boolean }) => {
	const { back } = useRouter();

	return (
		<div>
			{hasBack ? (
				<button type="button" onClick={back}>
					<Image src="/icons/ic_arrow_back.svg" alt="back" width={24} height={24} />
				</button>
			) : null}
		</div>
	);
};

export default BackButton;
