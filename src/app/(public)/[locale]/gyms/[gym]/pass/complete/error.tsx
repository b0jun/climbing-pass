'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('Complete');

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('CompletePage error:', error);
    }
  }, [error]);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-linear-to-b from-blue-100 to-white px-4 py-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <motion.div
        className="w-full max-w-[320px] overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center gap-4 p-6 text-center text-gray-700">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800">{t('errorTitle')}</h2>
          <button
            onClick={reset}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-xs transition-transform active:scale-95"
          >
            {t('retry')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
