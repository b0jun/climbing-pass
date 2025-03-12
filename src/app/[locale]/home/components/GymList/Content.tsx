import { use } from 'react';
import { getGyms } from '../../actions/getGyms';
import { GymList } from './GymList';

export function Content({ userId }: { userId: string }) {
  const gyms = use(getGyms(userId));
  const isEmpty = gyms.length === 0;

  if (isEmpty) {
    return <GymList.EmptyState />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {gyms.map((gym) => (
        <GymList.Item key={gym.id} {...gym} />
      ))}
    </ul>
  );
}
