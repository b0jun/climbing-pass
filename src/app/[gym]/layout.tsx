import GymWhiteList from '@/components/GymWhiteList';

export default async function Layout(props: { children: React.ReactNode }) {
	return (
		<>
			{props.children}
			<GymWhiteList />
		</>
	);
}
