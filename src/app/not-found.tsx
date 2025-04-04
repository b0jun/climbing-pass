'use client';
import Link from 'next/link';

import { Document } from '@/shared/components';

export default function NotFound() {
  return (
    <Document locale="ko">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-form p-20">
          <p className="text-lg">지원하지 않는 페이지입니다.</p>
          <Link href="/" className="w-[100px] rounded-md bg-gray-300 px-3 py-1 text-white hover:bg-gray-400">
            홈으로 가기
          </Link>
        </div>
      </div>
    </Document>
  );
}
