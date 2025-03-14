export default async function Layout(props: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-full flex-col shadow-mobile">
      <div className="flex flex-1 items-center justify-center bg-gray-100">{props.children}</div>
    </main>
  );
}
