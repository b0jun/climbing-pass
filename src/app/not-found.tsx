'use client';
import Link from 'next/link';

import { Document } from '@/shared/components';

export default function NotFound() {
  return (
    <Document locale="ko">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="text-error text-4xl font-bold">404 - NotFound</h1>
        <p className="mt-4 text-lg text-gray-600">지원하지 않는 페이지입니다.</p>
        <Link href="/" className="mt-6 rounded-sm bg-gray-800 px-4 py-2 text-white transition-all hover:bg-gray-700">
          홈으로 돌아가기
        </Link>
      </div>
    </Document>
  );
}
