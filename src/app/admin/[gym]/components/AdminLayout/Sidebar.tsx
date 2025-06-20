'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { useGymData } from '../../hooks';
import { useAdminLayoutState } from '../../hooks/useAdminLayoutState';

import { getNavItems } from './constants/navigation';

export function Sidebar() {
  const { gym: gymDomain } = useParams();
  const pathname = usePathname();

  const { isSidebarOpen, setIsSidebarOpen, isDesktop } = useAdminLayoutState();
  const { gymName, location, logo } = useGymData();

  const navItems = getNavItems(gymDomain as string);

  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 z-1000 h-full w-[250px] bg-[#fff] px-3 shadow-lg transition-transform duration-300 ease-in-out ${isDesktop || isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
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
      <ul className="space-y-1 text-[14px]">
        {navItems.map((item) => (
          <li key={item.key}>
            {item.href ? (
              <Link
                href={item.href}
                className={`block rounded-md p-2 transition-all duration-200 ${
                  pathname.includes(item.key) ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <div className="px-2 py-2 text-xs font-semibold text-gray-500">{item.label}</div>
            )}
            {item.children && (
              <ul className="mt-1 ml-4 space-y-1">
                {item.children.map((child) => (
                  <li key={child.key}>
                    <Link
                      href={child.href!}
                      className={`block rounded-md p-2 transition-all duration-200 ${
                        pathname.includes(child.key) ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
                      }`}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {!isDesktop && isSidebarOpen && (
        <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4">
          <X size={24} />
        </button>
      )}
    </aside>
  );
}
