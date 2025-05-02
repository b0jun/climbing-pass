import { Info } from 'lucide-react';

export function PassListSkeleton() {
  return (
    <div className="inline-block w-full animate-pulse overflow-hidden rounded-[10px] bg-white align-middle shadow-lg">
      <div className="relative overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm text-gray-500">
          <thead className="border-b bg-gray-50 text-xs text-gray-700">
            <tr>
              <th scope="col" className="w-[50px] px-3 py-3 whitespace-nowrap">
                순번
              </th>
              <th scope="col" className="w-[130px] px-3 py-3 whitespace-nowrap">
                이름
              </th>
              <th scope="col" className="w-[120px] px-3 py-3 whitespace-nowrap">
                전화번호
              </th>
              <th scope="col" className="w-[80px] px-3 py-3 whitespace-nowrap">
                <div className="relative flex h-[16.5px] items-center gap-[2px]">
                  방문횟수
                  <Info size={12} className="cursor-pointer text-gray-500" />
                </div>
              </th>
              <th scope="col" className="w-[100px] px-3 py-3 whitespace-nowrap">
                생년월일
              </th>
              <th scope="col" className="w-[90px] px-3 py-3 whitespace-nowrap">
                입장 등록시간
              </th>
              <th scope="col" className="w-[70px] px-3 py-3 whitespace-nowrap">
                패스 유형
              </th>
              <th scope="col" className="w-[70px] px-3 py-3 whitespace-nowrap">
                암벽화 대여
              </th>
              <th scope="col" className="w-[70px] px-3 py-3 whitespace-nowrap">
                입장 상태
              </th>
              <th scope="col" className="w-[200px] px-3 py-3 whitespace-nowrap" />
            </tr>
          </thead>
          <tbody className="[&>tr>td]:h-[50px] [&>tr>td]:px-3 [&>tr>td]:py-2">
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="border-b">
                {Array(10)
                  .fill(0)
                  .map((_, j) => (
                    <td key={j}>
                      <div className="h-4 w-full rounded-sm bg-gray-200" />
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
