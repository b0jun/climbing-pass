'use client';

import { useRouter } from 'next/navigation';

const RootPage = () => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-form p-20">
        <p className="text-lg">지원하지 않는 페이지입니다.</p>
        <button type="button" onClick={() => router.back()} className="w-[100px] rounded-md bg-blue-300 px-3 py-1">
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default RootPage;
