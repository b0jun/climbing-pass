export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<main className="max-w-xl min-h-full mx-auto bg-white shadow-mobile">{props.children}</main>
	);
}
