import ConsentForm from '@/components/ConsentForm';

type Props = {
	params: {
		type: string;
	};
};

const Consent = ({ params: { type } }: Props) => {
	return (
		<main className="flex flex-col justify-center">
			<ConsentForm />
		</main>
	);
};

export default Consent;
