'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-16 py-8">
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-center text-red-600 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">문제가 발생했습니다.</h2>
        <p className="text-sm">{error.message || '데이터를 불러오는 중 오류가 발생했습니다.'}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => reset()}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  );
}
