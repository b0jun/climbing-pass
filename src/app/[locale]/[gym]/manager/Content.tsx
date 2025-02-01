'use client';

export default function Content({ children }: { children: React.ReactNode }) {
  return <div className={`flex-1 p-4 transition-all duration-300 ease-in-out ml-0 lg:ml-[250px]`}>{children}</div>;
}
