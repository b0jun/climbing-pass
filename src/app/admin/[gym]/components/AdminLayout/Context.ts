import { createContext } from 'react';

export interface AdminLayoutStateContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isDesktop: boolean;
  openSidebar: () => void;
}

export const AdminLayoutStateContext = createContext<AdminLayoutStateContextType | undefined>(undefined);

export interface GymDataContextType {
  gymName: string;
  location: string;
  logo: string;
}

export const GymDataContext = createContext<GymDataContextType | undefined>(undefined);
