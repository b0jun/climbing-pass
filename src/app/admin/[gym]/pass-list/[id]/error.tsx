'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const router = useRouter();
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="sticky top-14 z-10 mb-6 flex items-center gap-4 bg-[#faf9f6] py-2">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-500"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          패스 목록
        </button>
      </div>
      <div className="mx-auto flex min-h-[842px] w-[750px] flex-col rounded-md border border-gray-200 bg-white px-7 py-5 shadow-lg">
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">오류가 발생했습니다</h1>
          <p className="mb-6 text-sm text-gray-600">
            동의서를 불러오지 못했습니다. 다시 시도하거나 관리자에게 문의해주세요.
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
              onClick={() => reset()}
            >
              새로고침
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
              onClick={() => router.back()}
            >
              이전 페이지로 돌아가기
            </button>
          </div>

          {isDev && (
            <div className="mt-6 w-full rounded-md bg-gray-100 p-4">
              <h2 className="mb-2 text-sm font-semibold text-gray-700">에러 정보 (개발 환경)</h2>
              <p className="text-sm text-gray-600">{error.message}</p>
              <pre className="mt-2 max-h-[200px] overflow-auto text-xs text-gray-500">{error.stack}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
