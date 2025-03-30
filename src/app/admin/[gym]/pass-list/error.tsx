'use client';

import { RotateCw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="inline-block w-full overflow-hidden rounded-[10px] bg-white p-10 text-center shadow">
      <p className="mb-4 text-lg font-semibold text-error">{error.message}</p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-md border border-gray-400 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-200"
      >
        <RotateCw size={16} />
        다시 시도하기
      </button>
    </div>
  );
}
