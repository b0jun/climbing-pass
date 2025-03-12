import Link from 'next/link';
import { GymType } from '../../types/gym.type';

export function Item({ name, domain }: Omit<GymType, 'id'>) {
  return (
    <li className="rounded-lg border border-gray-200 p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center">
        <span className="flex-1 font-medium">{name}</span>
        <div className="flex gap-2">
          <Link
            href={`/${domain}/pass`}
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900"
          >
            패스
          </Link>
          <Link
            href={`/${domain}/manager`}
            className="hover:bg-black-700 rounded-md bg-black px-3 py-2 text-sm font-medium text-white"
          >
            관리
          </Link>
        </div>
      </div>
    </li>
  );
}
