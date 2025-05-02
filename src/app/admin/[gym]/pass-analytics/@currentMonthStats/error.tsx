'use client';

import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function CurrentMonthStatsError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  function refreshAndReset() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[210px] flex-col items-center rounded-[10px] bg-white p-6 shadow-md">
      <div className="mb-2 flex justify-center">
        <AlertTriangle className="text-error h-8 w-8" />
      </div>
      <div className="mb-1 text-lg font-semibold text-gray-800">이번 달 방문 통계를 불러오는 데 실패했어요</div>
      <p className="mb-4 text-sm text-gray-500">{error.message}</p>
      <button
        onClick={refreshAndReset}
        className="bg-error rounded-sm px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
      >
        다시 시도하기
      </button>
    </div>
  );
}
