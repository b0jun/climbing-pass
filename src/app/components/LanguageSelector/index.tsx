import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

const LanguageSelector = ({ type }: { type?: string }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');
	const pass = searchParams.get('pass');
	const isEng = lang === 'en';
	const pathname = usePathname();

	const changeLanguage = (lang: 'ko' | 'en') => {
		router.replace(`${pathname}?${type === 'register' ? `pass=${pass}&` : ''}lang=${lang}`);
	};
	return (
		<div className="flex justify-end w-full mb-14 gap-6 px-10">
			<button type="button" onClick={() => changeLanguage('ko')}>
				<p className={`text-base text-black ${!isEng ? 'underline' : ''}`}>한국어</p>
			</button>
			<button type="button" onClick={() => changeLanguage('en')}>
				<p className={`text-base text-black ${isEng ? 'underline' : ''}`}>English</p>
			</button>
		</div>
	);
};

export default LanguageSelector;
