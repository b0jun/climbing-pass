import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Header = ({ type }: { type?: string }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');
	const pass = searchParams.get('pass');
	const isEng = lang === 'en';
	const pathname = usePathname();

	const isRegister = type === 'register';

	const changeLanguage = (lang: 'ko' | 'en') => {
		router.replace(`${pathname}?${type === 'register' ? `pass=${pass}&` : ''}lang=${lang}`);
	};

	const goBack = () => {
		router.back();
	};

	return (
		<div className="flex justify-between w-full px-10">
			{isRegister ? (
				<button type="button" onClick={goBack} className={`w-6 h-6 relative`}>
					<Image src="/icons/ic_arrow_back.svg" alt="back" fill />
				</button>
			) : (
				<div />
			)}
			<div className="flex gap-5">
				<button type="button" onClick={() => changeLanguage('ko')}>
					<p className={`text-base text-black ${!isEng ? 'underline' : ''}`}>한국어</p>
				</button>
				<button type="button" onClick={() => changeLanguage('en')}>
					<p className={`text-base text-black ${isEng ? 'underline' : ''}`}>English</p>
				</button>
			</div>
		</div>
	);
};

export default Header;
