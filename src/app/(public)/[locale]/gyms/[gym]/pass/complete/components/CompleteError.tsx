'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CompleteError({ code }: { code: string }) {
  const t = useTranslations('Complete');

  const errorMessage = (() => {
    switch (code) {
      case 'PASS_EXPIRED':
        return t('errorExpired');
      case 'PASS_NOT_FOUND':
        return t('errorNotFound');
      default:
        return t('errorUnknown');
    }
  })();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white px-4 py-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <motion.div
        className="w-full max-w-[320px] overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center gap-4 p-6 text-center text-gray-700">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800">{t('errorTitle')}</h2>
          <p className="whitespace-pre-wrap text-sm">{errorMessage}</p>
        </div>
      </motion.div>
    </div>
  );
}
