'use client';
import { OverlayProvider } from '@toss/use-overlay';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <OverlayProvider>{children}</OverlayProvider>;
};

export default Providers;
