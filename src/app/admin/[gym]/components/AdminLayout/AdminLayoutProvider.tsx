'use client';
import { useState, useEffect, useMemo } from 'react';

import { AdminLayoutStateContext, GymDataContext } from './Context';

interface AdminLayoutProviderProps {
  children: React.ReactNode;
  gymName: string;
  logo: string;
}

const DESKTOP_BREAKPOINT = 1024;

const AdminLayoutProvider = ({ children, gymName, logo }: AdminLayoutProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);

  useEffect(() => {
    const debounce = (fn: () => void, ms: number) => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fn, ms);
      };
    };

    const checkScreenSize = () => {
      const isNowDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      setIsDesktop(isNowDesktop);
      setIsSidebarOpen(isNowDesktop);
    };

    const debouncedCheckScreenSize = debounce(checkScreenSize, 100);

    checkScreenSize();
    window.addEventListener('resize', debouncedCheckScreenSize);
    return () => window.removeEventListener('resize', debouncedCheckScreenSize);
  }, []);

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
      logo,
    }),
    [gymName, logo],
  );

  return (
    <AdminLayoutStateContext.Provider value={stateValue}>
      <GymDataContext.Provider value={dataValue}>
        <div className="min-w-screen relative flex min-h-screen w-full">
          {children}
          {!isDesktop && isSidebarOpen && (
            <div
              className="fixed inset-0 z-[9999] bg-black/30 transition-opacity duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      </GymDataContext.Provider>
    </AdminLayoutStateContext.Provider>
  );
};

export default AdminLayoutProvider;
