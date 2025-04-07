export function VisitorStatsSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(3,_minmax(180px,_1fr))] gap-4">
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="animate-pulse space-y-3 rounded-lg bg-white p-5 shadow-lg">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-6 w-16 rounded bg-gray-200" />
          </div>
        ))}
    </div>
  );
}
