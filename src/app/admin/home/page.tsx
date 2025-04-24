import { checkAuth } from '@/shared/lib';

import { GymList } from './components';

export default async function HomePage() {
  await checkAuth();
  return <GymList />;
}
