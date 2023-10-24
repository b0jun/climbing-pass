'use client';

import Image from 'next/image';
import { useRouter } from 'next-intl/client';

const BackButton = ({ hasBack }: { hasBack: boolean }) => {
	const { back } = useRouter();

	return (
		<div>
			{hasBack ? (
				<div className="flex items-center">
					<button
						type="button"
						onClick={back}
						className="flex items-center justify-center"
					>
						<Image src="/icons/ic_arrow_back.svg" alt="back" width={24} height={24} />
						<Image
							src="/images/text_logo.png"
							width={120}
							height={32}
							alt="text_logo"
						/>
					</button>
				</div>
			) : null}
		</div>
	);
};

export default BackButton;
