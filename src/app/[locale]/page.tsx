import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Home = () => {
	const t = useTranslations('Index');
	return (
		<main>
			<h1>{t('title')}</h1>
			<Link href="/pass" locale="ko">
				PASS
			</Link>
		</main>
	);
};

export default Home;
