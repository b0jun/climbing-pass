import { Item } from './Item';
import { EmptyState } from './EmptyState';
import { Skeleton } from './Skeleton';
import { Content } from './Content';

export function GymList({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full px-16 py-8">
      <div className="mb-5 text-center">
        <h3 className="text-xl font-bold text-[#443627]">나의 지점 리스트</h3>
        <div className="mx-auto mt-2 h-0.5 w-16 bg-[#443627]"></div>
      </div>
      <div className="space-y-2.5">{children}</div>
    </section>
  );
}

GymList.Content = Content;
GymList.Item = Item;
GymList.EmptyState = EmptyState;
GymList.Skeleton = Skeleton;
