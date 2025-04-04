interface PassTypeLayoutProps {
  children: React.ReactNode;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const types = ['day-pass', 'day-experience'];
  return types.map((type) => ({ type }));
}

export default function PassTypeLayout({ children }: PassTypeLayoutProps) {
  return <>{children}</>;
}
