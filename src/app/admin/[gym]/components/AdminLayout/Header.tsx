'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { getNavItems, NavItem } from '@/app/admin/config/navigation';

import { useGymData } from '../../hooks';
import { useAdminLayoutState } from '../../hooks/useAdminLayoutState';

function findCurrentNavLabel(navItems: NavItem[], pathname: string): string {
  for (const item of navItems) {
    if (item.children?.length) {
      const child = item.children.find((c) => c.href && pathname.startsWith(c.href));
      if (child) return child.label;
    } else if (item.href && pathname.startsWith(item.href)) {
      return item.label;
    }
  }
  return '';
}

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
  const currentLabel = findCurrentNavLabel(navItems, pathname);

  return (
    <header className="sticky top-0 z-998 flex h-14 items-center justify-between gap-2 bg-[#faf9f6] px-4 transition-all duration-300 ease-in-out lg:ml-[250px]">
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
