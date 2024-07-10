import { useTranslations } from 'next-intl';
import { InputHTMLAttributes } from 'react';

import TextInput from '../TextInput';

type Props = InputHTMLAttributes<HTMLInputElement>;

const TextInputBirth = (props: Props) => {
	const t = useTranslations('Consent');
	return <TextInput {...props} name="dateOfBirth" label={t('dateOfBirth')} placeholder="1998/07/31" />;
};

export default TextInputBirth;
