'use client';

import { useErrorBoundary } from 'react-error-boundary';

interface ErrorSectionProps {
  message?: string;
  retryLabel?: string;
}

export function ErrorSection({
  message = '문제가 발생했어요. 다시 시도해주세요.',
  retryLabel = '다시 시도',
}: ErrorSectionProps) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-red-50 p-4 text-sm text-red-600 shadow">
      <p className="text-center">{message}</p>
      <button
        onClick={resetBoundary}
        className="rounded bg-red-500 px-3 py-1 text-white transition-colors hover:bg-red-600"
      >
        {retryLabel}
      </button>
    </div>
  );
}
