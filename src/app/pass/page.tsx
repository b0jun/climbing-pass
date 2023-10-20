import Image from 'next/image';
import Link from 'next/link';

export default function Pass() {
	return (
		<main className="flex flex-col items-center justify-center py-10">
			<div className="relative w-36 h-36 mb-14">
				<Image src="/images/logo.png" alt="logo" fill />
			</div>
			<Link
				href={{
					pathname: '/register',
					query: { pass: 'day-pass' },
				}}
				className="w-56 h-32 bg-blue-200 flex flex-col justify-center items-center rounded-md mb-20 shadow-lg"
			>
				<h3 className="text-2xl">일일이용</h3>
			</Link>
			<Link
				href={{
					pathname: '/register',
					query: { pass: 'first-pass' },
				}}
				className="w-56 h-32 bg-blue-200 flex flex-col justify-center items-center rounded-md shadow-lg"
			>
				<h3 className="text-2xl">일일체험</h3>
				<p>(첫 이용자)</p>
			</Link>
		</main>
	);
}
