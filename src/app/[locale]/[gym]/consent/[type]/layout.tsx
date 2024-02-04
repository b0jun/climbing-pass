import Header from '@/components/Header';

export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<main className="bg-form max-w-xl min-h-full mx-auto shadow-mobile">
			<Header hasBack bg={'bg-form'} />
			<div className="bg-form">{props.children}</div>
		</main>
	);
}
