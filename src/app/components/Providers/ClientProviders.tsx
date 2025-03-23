'use client';

import { OverlayProvider } from 'overlay-kit';

import { QueryProvider } from './ReactQuery';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <OverlayProvider>
      <QueryProvider>{children}</QueryProvider>
    </OverlayProvider>
  );
}
