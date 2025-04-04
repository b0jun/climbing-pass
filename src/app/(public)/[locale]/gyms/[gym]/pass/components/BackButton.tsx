'use client';

import { ChevronLeft } from 'lucide-react';

import { useRouter } from '@/i18n/navigation.public';

export function BackButton() {
  const { back } = useRouter();

  return (
    <button type="button" onClick={back}>
      <ChevronLeft color="#393E46" size={28} />
    </button>
  );
}
