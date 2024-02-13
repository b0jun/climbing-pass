import { InputHTMLAttributes } from 'react';

import TextInput from '../TextInput';

type Props = InputHTMLAttributes<HTMLInputElement>;

const TextInputBirth = (props: Props) => {
	return <TextInput {...props} name="dateOfBirth" label="생년월일" placeholder="1998/07/31" />;
};

export default TextInputBirth;
