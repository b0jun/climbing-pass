'use client';
import { useState, useEffect } from 'react';

import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const isNowDesktop = window.innerWidth >= 1024;
      setIsDesktop(isNowDesktop);
      setIsSidebarOpen(isNowDesktop);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex min-h-screen relative min-w-screen w-full">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isDesktop={isDesktop} />
      {!isDesktop && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 transition-opacity duration-300 z-[9999]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="w-full bg-[#faf9f6]">
        <Header isSidebarOpen={isSidebarOpen} isDesktop={isDesktop} openSidebar={openSidebar} />
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default Wrapper;
