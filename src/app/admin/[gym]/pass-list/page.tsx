import { PassType } from '@prisma/client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { passKeys } from '@/shared/lib/react-query/factory';
import { makeServerQueryClient } from '@/shared/lib/react-query/queryClient.server';

import { PassListClient } from './components';

interface PassListProps {
  params: Promise<{ gym: string }>;
  searchParams: Promise<{ passType?: PassType; passDate?: string }>;
}

export default async function PassListPage({ params, searchParams }: PassListProps) {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/login');
  }

  const { gym } = await params;
  const { passType, passDate } = await searchParams;

  const queryClient = makeServerQueryClient();
  await queryClient.prefetchQuery(passKeys.list({ gym, passType, passDate }));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PassListClient gym={gym} />
    </HydrationBoundary>
  );
}
