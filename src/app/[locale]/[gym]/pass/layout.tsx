export default function PassLayout({ children }: { children: React.ReactNode }) {
  return <main className="relative mx-auto flex min-h-full max-w-xl flex-col shadow-mobile">{children}</main>;
}
