'use client';
import { useContext } from 'react';

import { GymDataContext } from '../components/AdminLayout/Context';

export const useGymData = () => {
  const context = useContext(GymDataContext);
  if (!context) {
    throw new Error('useGymData must be used within an AdminLayoutProvider');
  }
  return context;
};
