import { Metadata, Viewport } from 'next';

import { Document } from '@/shared/components';

export const metadata: Metadata = {
  title: 'PASS Manager',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  return <Document locale="ko">{children}</Document>;
}
