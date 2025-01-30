export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<main className="flex flex-col min-h-full">
			<div className="flex-1 flex">{props.children}</div>
		</main>
	);
}
