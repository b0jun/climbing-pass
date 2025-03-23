'use client';
import { useContext } from 'react';

import { AdminLayoutStateContext } from '../components/AdminLayout/Context';

export const useAdminLayoutState = () => {
  const context = useContext(AdminLayoutStateContext);
  if (!context) {
    throw new Error('useAdminLayoutState must be used within an AdminLayoutProvider');
  }
  return context;
};
