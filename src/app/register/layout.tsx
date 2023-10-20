export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<main className="bg-white max-w-xl m-auto shadow-mobile min-h-full">{props.children}</main>
	);
}
