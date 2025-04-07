export function PassListSkeleton() {
  return (
    <div className="inline-block w-full animate-pulse overflow-hidden rounded-[10px] bg-white align-middle shadow-lg">
      <div className="relative overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm text-gray-500">
          <thead className="border-b bg-gray-50 text-xs text-gray-700">
            <tr>
              <th scope="col" className="w-[40px] whitespace-nowrap px-3 py-3">
                순번
              </th>
              <th scope="col" className="w-[130px] whitespace-nowrap px-3 py-3">
                이름
              </th>
              <th scope="col" className="w-[120px] whitespace-nowrap px-3 py-3">
                전화번호
              </th>
              <th scope="col" className="w-[70px] whitespace-nowrap px-3 py-3">
                방문횟수
              </th>
              <th scope="col" className="w-[100px] whitespace-nowrap px-3 py-3">
                생년월일
              </th>
              <th scope="col" className="w-[90px] whitespace-nowrap px-3 py-3">
                입장 등록시간
              </th>
              <th scope="col" className="w-[70px] whitespace-nowrap px-3 py-3">
                패스 유형
              </th>
              <th scope="col" className="w-[70px] whitespace-nowrap px-3 py-3">
                암벽화 대여
              </th>
              <th scope="col" className="w-[70px] whitespace-nowrap px-3 py-3">
                입장 상태
              </th>
              <th scope="col" className="w-[200px] whitespace-nowrap px-3 py-3" />
            </tr>
          </thead>
          <tbody className="[&>tr>td]:h-[50px] [&>tr>td]:px-3 [&>tr>td]:py-2">
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="border-b">
                {Array(10)
                  .fill(0)
                  .map((_, j) => (
                    <td key={j}>
                      <div className="h-4 w-full rounded bg-gray-200" />
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
