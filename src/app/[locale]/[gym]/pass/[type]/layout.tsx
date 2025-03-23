import { notFound } from 'next/navigation';
import { use } from 'react';

import { PASS_VALID_TYPES, PassValidType } from './types/passType.type';

interface PassTypeLayoutProps {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}

export default function PassTypeLayout({ children, params }: PassTypeLayoutProps) {
  const { type } = use(params);
  if (!PASS_VALID_TYPES.includes(type as PassValidType)) {
    notFound();
  }
  return <>{children}</>;
}
