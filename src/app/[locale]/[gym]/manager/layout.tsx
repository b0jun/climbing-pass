import Header from './Header';
import Sidebar from './Sidebar';

export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<main className="flex flex-col min-h-full">
			<Header />
			<Sidebar />
			<div className="flex-1 flex ml-[200px]">{props.children}</div>
		</main>
	);
}
