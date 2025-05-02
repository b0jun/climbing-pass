export default function CurrentMonthStatsLoading() {
  return (
    <div className="animate-pulse rounded-[10px] bg-white p-4 shadow-md">
      <div className="mb-2 h-6 w-28 rounded-sm bg-gray-200" />
      <div className="mb-4 h-4 w-48 rounded-sm bg-gray-100" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs">
            <div className="mb-2 flex items-center justify-between">
              <div className="h-4 w-20 rounded-sm bg-gray-200" />
              <div className="h-5 w-5 rounded-full bg-gray-200" />
            </div>
            <div className="h-6 w-24 rounded-sm bg-gray-300" />
            <div className="mt-1 h-4 w-32 rounded-sm bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
