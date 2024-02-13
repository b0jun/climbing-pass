import ConsentForm from '@/components/ConsentForm';

type Props = {
	params: {
		type: string;
	};
};

const Consent = ({ params: { type } }: Props) => {
	return (
		<section className="flex flex-col justify-center">
			<ConsentForm />
		</section>
	);
};

export default Consent;
