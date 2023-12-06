import Header from '@/components/Header';

export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<main className="max-w-xl flex flex-col min-h-full mx-auto shadow-mobile">
			<Header bg="bg-contents" />
			<div className="flex-1 flex justify-center items-center bg-contents">
				{props.children}
			</div>
		</main>
	);
}
