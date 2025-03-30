'use client';

import { RotateCw } from 'lucide-react';

export default function Loading() {
  return (
    <div className="inline-block w-full min-w-[740px] overflow-hidden rounded-[10px] bg-[#fff] align-middle">
      <div className="flex min-h-[80px] items-center justify-between px-4">
        <button
          type="button"
          disabled
          className="flex items-center gap-2 rounded-lg border border-gray-500 bg-gray-100 p-2 text-[14px] text-gray-400"
        >
          <RotateCw size={16} />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-[36px] w-[100px] rounded-lg bg-gray-100" />
          <div className="h-[36px] w-[100px] rounded-lg bg-gray-100" />
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              {Array.from({ length: 10 }).map((_, i) => (
                <th key={i} className="whitespace-nowrap px-4 py-3 last:text-right">
                  &nbsp;
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b bg-white last:border-b-0 hover:bg-gray-50">
                {Array.from({ length: 10 }).map((_, colIdx) => (
                  <td key={colIdx} className="h-[65px] px-4 py-2">
                    <div className="h-4 animate-pulse rounded bg-gray-200" />
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
