import React from 'react';

type Props = {
	label: string;
	onClick: () => void;
	disabled?: boolean;
};

const Button = ({ label, onClick, disabled = false }: Props) => {
	return (
		<button
			type="button"
			className="w-full h-12 my-6 font-bold text-white rounded-md bg-main disabled:bg-gray-200 disabled:text-gray-400/50"
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

export default Button;
