import Header from '@/components/Header';

export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<main className="max-w-xl min-h-full mx-auto bg-white shadow-mobile">
			<Header hasBack />
			{props.children}
		</main>
	);
}
