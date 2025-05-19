import { PASS_VALID_TYPES } from './types/passType.type';

interface PassTypeLayoutProps {
  children: React.ReactNode;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return PASS_VALID_TYPES.map((type) => ({ type }));
}

export default function PassTypeLayout({ children }: PassTypeLayoutProps) {
  return <>{children}</>;
}
