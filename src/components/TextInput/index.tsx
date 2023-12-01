import cn from 'classnames';
import { useFormContext } from 'react-hook-form';

import type { InputHTMLAttributes } from 'react';

type Props = {
	name: string;
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = (props: Props) => {
	const { name, label, onChange: inputOnChange, ...rest } = props;
	const {
		register,
		clearErrors,
		formState: { errors },
	} = useFormContext();
	const isError = !!errors[name];
	const errorMessage = errors[name]?.message?.toString();

	const { onChange: registerOnchange, ...registerRest } = register(name);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		registerOnchange(e);
		if (inputOnChange) inputOnChange(e);
		if (errorMessage) clearErrors(name);
	};

	return (
		<div className="relative">
			<input
				{...registerRest}
				id={name}
				onChange={onChange}
				placeholder=" "
				className={cn(
					'placeholder:text-transparent focus:placeholder:text-gray-400 block rounded-t-lg text-base px-2.5 pb-2.5 pt-5 w-full text-gray-900 bg-slate-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer',
					{ ['!border-error']: isError }
				)}
				{...rest}
			/>
			<label
				htmlFor={name}
				className={cn(
					'absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 font-bold',
					{ ['!text-error peer-focus:!text-error']: isError }
				)}
			>
				{label}
			</label>
			{isError && <p className="text-sm text-error mt-2 ml-2">{errorMessage}</p>}
		</div>
	);
};

export default TextInput;
