'use client';

// import { OverlayProvider } from '@toss/use-overlay';

import { QueryProvider } from './ReactQuery';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <QueryProvider>
      {children}
      {/* <OverlayProvider>{children}</OverlayProvider> */}
    </QueryProvider>
  );
}
