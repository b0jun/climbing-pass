import { checkAuth } from '@/shared/lib';

import HomeHeader from './components/HomeHeader';

export default async function Layout(props: { children: React.ReactNode }) {
  await checkAuth();

  return (
    <main className="shadow-mobile mx-auto flex min-h-full max-w-xl min-w-[576px] flex-col">
      <HomeHeader />
      <div className="bg-contents flex flex-1 flex-col">{props.children}</div>
    </main>
  );
}
