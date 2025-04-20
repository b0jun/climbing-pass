import Link from 'next/link';
import { Suspense } from 'react';

import { getGyms } from '../lib/getGyms';
import { GymType } from '../types/gym.type';

const GymList = async ({ userId }: { userId: string }) => {
  return (
    <GymList.Layout>
      <Suspense fallback={<GymList.Skeleton />}>
        <GymList.Content userId={userId} />
      </Suspense>
    </GymList.Layout>
  );
};

GymList.Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mx-auto w-full px-16 py-8">
      <div className="mb-5 text-center">
        <h3 className="text-xl font-bold text-[#443627]">나의 지점 리스트</h3>
        <div className="mx-auto mt-2 h-0.5 w-16 bg-[#443627]" />
      </div>
      <div className="space-y-2.5">{children}</div>
    </section>
  );
};

GymList.Content = async ({ userId }: { userId: string }) => {
  const gyms = await getGyms(userId);
  const isEmpty = gyms.length === 0;
  if (isEmpty) {
    return <GymList.EmptyState />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {gyms.map((gym) => (
        <GymList.Item key={gym.id} {...gym} />
      ))}
    </ul>
  );
};

GymList.Item = ({ name, domain, location }: Omit<GymType, 'id'>) => {
  return (
    <li className="rounded-lg border border-gray-200 p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-2">
          <span className="font-medium">{name}</span>
          <span className="text-sm font-medium text-gray-500">{location}</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/gyms/${domain}/pass`}
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900"
          >
            패스
          </Link>
          <Link
            href={`/admin/${domain}/pass-list`}
            className="hover:bg-black-700 rounded-md bg-black px-3 py-2 text-sm font-medium text-white"
          >
            관리
          </Link>
        </div>
      </div>
    </li>
  );
};

GymList.EmptyState = () => {
  return (
    <div className="rounded-lg border border-gray-200 p-3 text-center text-gray-500 shadow-sm transition-shadow hover:shadow-md">
      아직 등록된 지점이 없습니다.
    </div>
  );
};

GymList.Skeleton = () => {
  return (
    <ul className="flex flex-col gap-2 opacity-70">
      {Array(2)
        .fill(0)
        .map((_, idx) => (
          <li key={idx} className="rounded-lg border border-gray-200 bg-gray-100 p-3 shadow-sm">
            <div className="flex animate-pulse items-center gap-1">
              <div className="h-5 w-36 rounded-md bg-gray-300" />
              <div className="ml-auto flex gap-2">
                <div className="h-8 w-12 rounded-md bg-gray-300" />
                <div className="h-8 w-12 rounded-md bg-gray-400" />
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default GymList;
