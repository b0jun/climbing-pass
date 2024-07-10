import ConsentForm from './components/ConsentForm';

async function fetchConsentInfo() {
	try {
		const res = await fetch(`${process.env.NEXTAUTH_URL}/api/gym/dolmenge_jeonpo/consentInfo`, {
			cache: 'no-cache',
		});
		if (!res.ok) {
			throw new Error('Failed to fetch consent information');
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return { message: 'Error fetching consent information' };
	}
}

const Consent = async () => {
	const gymData = await fetchConsentInfo();
	return (
		<section className="flex flex-col justify-center">
			<ConsentForm gymData={gymData} />
		</section>
	);
};

export default Consent;
