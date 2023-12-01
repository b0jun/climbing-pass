import React, { ButtonHTMLAttributes } from 'react';

type Props = {
	label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
	const { label, type = 'button', ...rest } = props;

	return (
		<button
			type={type}
			className="w-full h-12 my-6 font-bold text-white rounded-md bg-main disabled:bg-gray-200 disabled:text-gray-400/50"
			{...rest}
		>
			{label}
		</button>
	);
};

export default Button;
