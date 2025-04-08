'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { getNavItems } from '@/app/admin/config/navigation';

import { useGymData } from '../../hooks';
import { useAdminLayoutState } from '../../hooks/useAdminLayoutState';

export function Header() {
  const { gym: gymDomain } = useParams();
  const pathname = usePathname();
  const [isMount, setIsMount] = useState(false);

  const { isSidebarOpen, isDesktop, openSidebar } = useAdminLayoutState();
  const { logo, gymName } = useGymData();

  useEffect(() => {
    setIsMount(true);
  }, []);

  const navItems = getNavItems(gymDomain as string);
  const currentItem = navItems.find((item) => pathname.includes(item.key));
  const currentLabel = currentItem?.label ?? '';

  return (
    <header className="sticky top-0 z-[999] flex h-14 items-center justify-between gap-2 bg-[#faf9f6] px-4 transition-all duration-300 ease-in-out lg:ml-[250px]">
      <div className="flex items-center gap-2">
        {isMount && !isDesktop && (
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
      {isMount && !isDesktop && (
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
