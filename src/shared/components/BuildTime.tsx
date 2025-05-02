export default function BuildTime() {
  if (process.env.NEXT_PUBLIC_IS_DEV !== 'true') return null;
  return (
    <div className="fixed top-0 left-0 z-9999999 text-sm opacity-55">Build Time: {new Date().toLocaleString()}</div>
  );
}
