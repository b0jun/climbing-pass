import { ArrowLeft, Download } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="sticky top-14 z-10 mb-6 flex items-center gap-4 bg-[#faf9f6] py-2">
        <button type="button" className="flex items-center gap-2 text-sm text-gray-400 transition-colors" disabled>
          <ArrowLeft size={16} />
          패스 목록
        </button>
        <button
          type="button"
          className="flex items-center gap-1 rounded-sm bg-gray-200 px-2 py-1 text-[11px] text-gray-400 shadow-sm transition-colors"
          disabled
        >
          <Download size={16} />
          PDF 다운로드
        </button>
      </div>

      <div className="mx-auto flex min-h-[842px] w-[750px] flex-col rounded-md border border-gray-200 bg-white px-7 py-5 shadow-lg">
        <header className="mb-6 text-center">
          <div className="mx-auto h-8 w-1/2 animate-pulse rounded bg-gray-200"></div>
        </header>
        <section className="mb-6">
          <div className="mb-4 h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div className="col-span-2 h-5 w-1/2 animate-pulse rounded bg-gray-200"></div>
          </div>
        </section>
        <section className="mb-6 flex-1">
          <div className="mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-200"></div>
          <div className="border-gray-20 border bg-gray-50 p-3">
            <div className="mb-2 h-5 w-1/2 animate-pulse rounded bg-gray-200"></div>
            <div className="space-y-4">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200"></div>
                  <div className="ml-3 space-y-1">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mt-auto">
          <div className="mx-auto h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
          <div className="mx-auto mt-4 h-5 w-1/4 animate-pulse rounded bg-gray-200"></div>
          <div className="mt-4 flex items-center justify-between">
            <div className="relative h-[40px] w-[100px] animate-pulse rounded bg-gray-200"></div>
            <div className="flex items-center justify-end gap-4">
              <div className="h-5 w-12 animate-pulse rounded bg-gray-200"></div>
              <div className="relative flex items-center gap-8 bg-stone-200 px-2">
                <div className="h-5 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-5 w-12 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
