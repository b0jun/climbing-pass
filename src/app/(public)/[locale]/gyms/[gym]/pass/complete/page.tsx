import { notFound } from 'next/navigation';

import { getPass } from './actions/getPass';
import { CompleteClient, CompleteError } from './components';

interface CompletePageProps {
  params: Promise<{ gym: string }>;
  searchParams: Promise<{ id?: string }>;
}

export const dynamic = 'force-dynamic';

export default async function CompletePage({ params, searchParams }: CompletePageProps) {
  const { gym } = await params;
  const { id } = await searchParams;
  if (!id) {
    notFound();
  }

  const result = await getPass({ id, gym });

  if (!result.success) {
    return <CompleteError code={result.code} />;
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-linear-to-b from-blue-100 to-white px-4 py-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <CompleteClient gym={gym} pass={result.data} />
    </div>
  );
}
