'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { getNavItems } from '@/app/admin/config/navigation';

import { useGymData } from '../../hooks';
import { useAdminLayoutState } from '../../hooks/useAdminLayoutState';

export function Header() {
  const { isSidebarOpen, isDesktop, openSidebar } = useAdminLayoutState();
  const { logo, gymName } = useGymData();

  const { gym: gymDomain } = useParams();
  const pathname = usePathname();

  const navItems = useMemo(() => getNavItems(gymDomain as string), [gymDomain]);
  const currentLabel = useMemo(() => {
    const currentItem = navItems.find((item) => pathname.includes(item.key));
    return currentItem?.label;
  }, [navItems, pathname]);

  return (
    <header className="sticky top-0 z-[999] flex h-14 items-center justify-between gap-2 bg-[#faf9f6] px-4 transition-all duration-300 ease-in-out lg:ml-[250px]">
      <div className="flex items-center gap-2">
        {!isDesktop && (
          <button
            type="button"
            onClick={openSidebar}
            disabled={isSidebarOpen}
            aria-label="Open sidebar"
            className="text-lg"
          >
            <Menu size={24} />
          </button>
        )}
        <h1 className="font-bold">{currentLabel}</h1>
      </div>
      {!isDesktop && logo && (
        <div className="relative flex aspect-video h-10">
          <Image
            key={`${gymName}-logo`}
            src={logo}
            alt={`${gymName}-logo`}
            fill
            sizes="250px"
            className="object-contain"
            priority
          />
        </div>
      )}
    </header>
  );
}
