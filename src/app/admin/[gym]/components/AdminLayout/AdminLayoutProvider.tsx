'use client';

import { useMemo, useState } from 'react';

import { useMediaQuery } from '@/shared/hooks';

import { AdminLayoutStateContext, GymDataContext } from './Context';

interface AdminLayoutProviderProps {
  children: React.ReactNode;
  gymName: string;
  location: string;
  logo: string;
}

const DESKTOP_BREAKPOINT = 1024;

const AdminLayoutProvider = ({ children, gymName, location, logo }: AdminLayoutProviderProps) => {
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const stateValue = useMemo(
    () => ({
      isSidebarOpen,
      setIsSidebarOpen,
      isDesktop,
      openSidebar,
    }),
    [isSidebarOpen, isDesktop],
  );

  const dataValue = useMemo(
    () => ({
      gymName,
      location,
      logo,
    }),
    [gymName, location, logo],
  );

  return (
    <AdminLayoutStateContext.Provider value={stateValue}>
      <GymDataContext.Provider value={dataValue}>
        <div className="relative flex min-h-screen w-full min-w-screen">
          {children}
          {!isDesktop && isSidebarOpen && (
            <div className="fixed inset-0 z-999 bg-black/30 transition-opacity duration-300" onClick={closeSidebar} />
          )}
        </div>
      </GymDataContext.Provider>
    </AdminLayoutStateContext.Provider>
  );
};

export default AdminLayoutProvider;
