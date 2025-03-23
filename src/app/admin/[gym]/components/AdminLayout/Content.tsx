'use client';

export function Content({ children }: { children: React.ReactNode }) {
  return <div className={`ml-0 flex-1 p-4 transition-all duration-300 ease-in-out lg:ml-[250px]`}>{children}</div>;
}
