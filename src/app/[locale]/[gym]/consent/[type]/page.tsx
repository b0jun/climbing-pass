import { useTranslations } from 'next-intl';

import ConsentForm from '@/components/ConsentForm';

type Props = {
	params: {
		type: string;
	};
};

const Consent = ({ params: { type } }: Props) => {
	const t = useTranslations('Consent');

	return (
		<main className="flex flex-col justify-center">
			<ConsentForm
				title={t('title')}
				name={t('name')}
				phoneNumber={t('phoneNumber')}
				dateOfBirth={t('dateOfBirth')}
				consent={t('consent')}
				consentDesc={t('consentDesc')}
				consentCheckbox={t('consentCheckbox')}
				signature={t('signature')}
				signatureTitle={t('signatureTitle')}
				nextButton={t('nextButton')}
				submitButton={t('submitButton')}
			/>
		</main>
	);
};

export default Consent;
