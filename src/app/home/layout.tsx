import { auth } from '@/auth';

import HomeHeader from './components/HomeHeader';
import { use } from 'react';

export default function Layout(props: { children: React.ReactNode }) {
  const session = use(auth());
  const isLogin = !!session;
  return (
    <main className="mx-auto flex min-h-full max-w-xl flex-col shadow-mobile">
      <HomeHeader isLogin={isLogin} />
      <div className="flex flex-1 flex-col bg-contents">{props.children}</div>
    </main>
  );
}
