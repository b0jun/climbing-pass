export function Skeleton() {
  return (
    <ul className="flex flex-col gap-2 opacity-70">
      {Array(2)
        .fill(0)
        .map((_, idx) => (
          <li key={idx} className="rounded-lg border border-gray-200 bg-gray-100 p-3 shadow-sm">
            <div className="flex animate-pulse items-center">
              <div className="h-5 w-36 rounded-md bg-gray-300"></div>
              <div className="ml-auto flex gap-2">
                <div className="h-8 w-12 rounded-md bg-gray-300"></div>
                <div className="h-8 w-12 rounded-md bg-gray-400"></div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
