export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<main className="flex flex-col min-h-full mx-auto shadow-mobile">
			<div className="flex-1 flex justify-center items-center">{props.children}</div>
		</main>
	);
}
