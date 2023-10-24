import { useTranslations } from 'next-intl';

import ConsentForm from '@/components/ConsentForm';
import Header from '@/components/Header';

type Props = {
	params: {
		type: string;
	};
};

const Consent = ({ params: { type } }: Props) => {
	const t = useTranslations('Consent');

	return (
		<main className="flex flex-col justify-center h-full">
			<Header hasBack />
			<ConsentForm
				title={t('title')}
				name={t('name')}
				phoneNumber={t('phoneNumber')}
				dateOfBirth={t('dateOfBirth')}
				consent={t('consent')}
				consentDesc={t('consentDesc')}
				signature={t('signature')}
				submitButton={t('submitButton')}
			/>
		</main>
	);
};

export default Consent;
