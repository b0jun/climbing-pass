import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Complete = () => {
	const t = useTranslations('Complete');

	return (
		<div className="flex flex-col items-center px-4 text-center">
			<Image
				src="/images/complete.png"
				width={128}
				height={128}
				alt="complete"
				className="animate-bounce"
			/>
			<h3 className="text-base my-3">{t('titlePass')}</h3>
			<h4 className="text-lg font-bold">{t('description')}</h4>
		</div>
	);
};

export default Complete;
