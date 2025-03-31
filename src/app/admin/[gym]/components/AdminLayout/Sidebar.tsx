'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { getNavItems } from '@/app/admin/config/navigation';

import { useGymData } from '../../hooks';
import { useAdminLayoutState } from '../../hooks/useAdminLayoutState';

export function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen, isDesktop } = useAdminLayoutState();
  const { gymName, location, logo } = useGymData();

  const { gym: gymDomain } = useParams();
  const pathname = usePathname();

  const navItems = useMemo(() => getNavItems(gymDomain as string), [gymDomain]);
  return (
    <aside
      id="sidebar"
      className={`fixed left-0 top-0 z-[10000] h-full w-[250px] bg-[#fff] px-3 shadow-lg transition-transform duration-300 ease-in-out ${isDesktop || isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div className="p-2">
        {logo && (
          <div className="relative flex aspect-video h-12">
            <Image
              key="gym-logo"
              src={logo}
              alt={`${gymName}_logo`}
              fill
              className="object-contain"
              sizes="250px"
              priority
            />
          </div>
        )}
        <div className="flex h-[56px] items-center gap-2">
          <h2 className="font-bold">{gymName}</h2>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>
      <ul className="flex flex-col text-[14px]">
        {navItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className={`block rounded-md p-2 transition-all duration-200 ${pathname.includes(item.key) ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {!isDesktop && isSidebarOpen && (
        <button onClick={() => setIsSidebarOpen(false)} className="absolute right-4 top-4">
          <X size={24} />
        </button>
      )}
    </aside>
  );
}
