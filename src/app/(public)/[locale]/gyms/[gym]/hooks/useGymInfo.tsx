'use client';

import { createContext, useContext } from 'react';

import { GymInfoResoponse } from '../types/gymInfo.type';

const GymInfoContext = createContext<GymInfoResoponse | null>(null);

export function GymInfoContextProvider({ value, children }: { value: GymInfoResoponse; children: React.ReactNode }) {
  return <GymInfoContext.Provider value={value}>{children}</GymInfoContext.Provider>;
}

export function useGymInfo() {
  const ctx = useContext(GymInfoContext);
  if (!ctx) throw new Error('useGym must be used within GymContextProvider');
  return ctx;
}
