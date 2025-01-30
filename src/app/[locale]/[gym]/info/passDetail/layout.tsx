export default async function Layout(props: { children: React.ReactNode }) {
  return <div className="flex-1 flex bg-[#464646]">{props.children}</div>;
}
