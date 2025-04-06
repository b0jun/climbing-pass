'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Admin error:', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-red-50 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-md rounded-lg border border-red-200 bg-white p-6 text-center shadow-lg"
      >
        <div className="mb-4 flex justify-center">
          <AlertTriangle size={40} className="text-red-500" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-800">문제가 발생했어요</h2>
        <p className="whitespace-pre-line text-sm text-gray-600">
          {'데이터를 불러오는 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.'}
        </p>

        <button
          onClick={reset}
          className="mt-6 w-full rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          다시 시도
        </button>
      </motion.div>
    </div>
  );
}
