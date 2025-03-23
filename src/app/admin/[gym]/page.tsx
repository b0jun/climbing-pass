import { redirect } from 'next/navigation';

interface GymPageProps {
  params: Promise<{ gym: string }>;
}

export default async function GymPage({ params }: GymPageProps) {
  const { gym } = await params;
  redirect(`/admin/${gym}/pass-list`);
}
