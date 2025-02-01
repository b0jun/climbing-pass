'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CloseIcon } from '@/components/SVG';
import { usePathname } from '@/navigation';
import useGymName from '@/services/useGymName';

export default function Sidebar({
  isOpen,
  setIsOpen,
  isDesktop,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDesktop: boolean;
}) {
  const { gym } = useParams();
  const pathname = usePathname();
  const { data: name, isPending } = useGymName();
  return (
    <aside
      id="sidebar"
      className={`z-[10000] fixed top-0 left-0 h-full w-[250px] bg-[#fff] px-3 shadow-lg transition-transform duration-300 ease-in-out
        ${isDesktop || isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <h2 className="font-bold h-[56px] flex items-center">
        {isPending ? <div className="w-[120px] h-[20px] bg-gray-200 animate-pulse rounded"></div> : name}
      </h2>
      <ul className="flex flex-col text-[14px]">
        <li>
          <Link
            href={`/${gym}/manager/passList`}
            className={`block p-2 rounded-md transition-all duration-200 
              ${pathname.includes('/manager/passList') ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'}`}
          >
            일일 패스 현황
          </Link>
        </li>
        <li>
          <Link
            href={`/${gym}/manager/passAnalytics`}
            className={`block p-2 rounded-md transition-all duration-200 
              ${pathname.includes('/manager/passAnalytics') ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'}`}
          >
            패스 통계
          </Link>
        </li>
      </ul>
      {!isDesktop && isOpen && (
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
          <CloseIcon width={24} height={24} />
        </button>
      )}
    </aside>
  );
}
