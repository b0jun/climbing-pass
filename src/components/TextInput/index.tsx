import { useFormContext } from 'react-hook-form';

import type { InputHTMLAttributes } from 'react';

type Props = {
	id: string;
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = (props: Props) => {
	const { id, label } = props;
	const { register } = useFormContext();

	return (
		<div className="relative">
			<input
				{...register(id)}
				type="text"
				id={id}
				className="block rounded-t-lg text-base px-2.5 pb-2.5 pt-5 w-full text-gray-900 bg-slate-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
				placeholder=" "
			/>
			<label
				htmlFor={id}
				className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 font-bold"
			>
				{label}
			</label>
		</div>
	);
};

export default TextInput;
