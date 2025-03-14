import Image from 'next/image';

const Spinner = () => {
	return (
		<Image
			className="animate-spin"
			src="/icons/ic_spinner.svg"
			width={50}
			height={50}
			alt="spinner"
		/>
	);
};

export default Spinner;
