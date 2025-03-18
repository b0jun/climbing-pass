import { auth } from '@/auth';

import HomeHeader from './components/HomeHeader';

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();
  const isLogin = !!session;
  return (
    <main className="mx-auto flex min-h-full max-w-xl flex-col shadow-mobile">
      <HomeHeader isLogin={isLogin} />
      <div className="flex flex-1 flex-col bg-contents">{props.children}</div>
    </main>
  );
}
