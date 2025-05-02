import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-error text-4xl font-bold">403 - Forbidden</h1>
      <p className="mt-4 text-lg text-gray-600">해당 시설을 조회할 수 있는 권한이 없습니다.</p>
      <Link
        href="/admin/home"
        className="mt-6 rounded-sm bg-gray-800 px-4 py-2 text-white transition-all hover:bg-gray-700"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
