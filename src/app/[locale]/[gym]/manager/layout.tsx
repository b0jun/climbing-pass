import Wrapper from './Wrapper';

export default async function Layout(props: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-screen min-w-[360px]">
      <Wrapper>{props.children}</Wrapper>
    </main>
  );
}
