export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<main className="flex flex-col max-w-xl min-h-full mx-auto shadow-mobile">
			<div className="flex items-center justify-center flex-1 bg-[#f2f2f2]">
				{props.children}
			</div>
		</main>
	);
}
