'use client';

import { useQueryClient } from '@tanstack/react-query';
import { RotateCw, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';

import { dayjsKST } from '@/shared/lib/dayjs-config';
import { passKeys } from '@/shared/lib/react-query/factory';
import { updateQueryString } from '@/shared/utils';

import { useSearchPassModal } from '../hooks/useSearchPassModal';

import 'react-datepicker/dist/react-datepicker.css';

export function FilterControlsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // * 새로고침
  const refreshPassList = () => {
    const queryKey = passKeys.lists();
    queryClient.invalidateQueries({ queryKey });
  };

  // * 패스 검색
  const { open: openSearchPassModal } = useSearchPassModal();

  // * 날짜 선택
  const today = dayjsKST().format('YYYY/MM/DD');
  const datepickerRef = useRef<DatePicker>(null);

  const passDate = searchParams.get('passDate') || today;

  const setDateToToday = () => {
    const queryString = updateQueryString('passDate', undefined, searchParams);
    router.replace(`${pathname}?${queryString}`);
    datepickerRef.current?.setOpen(false);
  };

  // * 패스유형 선택
  const passType = (searchParams.get('passType') as 'DayPass' | 'DayExperience') || '';

  const handleChangePassType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const queryString = updateQueryString('passType', event.target.value || undefined, searchParams);
    router.replace(`${pathname}?${queryString}`);
  };

  const handleChangeDate = (date: Date | null) => {
    const newDate = date ? dayjsKST(date).format('YYYY/MM/DD') : undefined;
    const queryString = updateQueryString('passDate', newDate, searchParams);
    router.replace(`${pathname}?${queryString}`);
  };

  return (
    <div className="flex h-[50px] items-center justify-between gap-2 text-gray-700">
      <div className="flex h-full items-center gap-3">
        <button
          type="button"
          className="flex h-full w-[50px] items-center justify-center rounded-lg bg-white shadow-lg transition-all hover:bg-[#eeeeee] focus:outline-none focus:ring-4 focus:ring-[#e0e0e0]"
          onClick={refreshPassList}
        >
          <RotateCw size={18} />
        </button>
        <button
          onClick={openSearchPassModal}
          type="button"
          className="flex h-full w-[120px] items-center justify-center gap-2 rounded-lg bg-white shadow-lg transition-all hover:bg-[#eeeeee] focus:outline-none focus:ring-4 focus:ring-[#e0e0e0]"
        >
          <Search size={18} />
          <span>패스 검색</span>
        </button>
      </div>
      {/* TODO: Design 수정 */}
      <div className="flex h-full items-center gap-3">
        <select
          id="passType"
          className="h-full rounded-lg border-none bg-white text-gray-900 shadow-lg"
          onChange={handleChangePassType}
          value={passType}
        >
          <option value="">패스 유형</option>
          <option value="DayPass">일일이용</option>
          <option value="DayExperience">일일체험</option>
        </select>
        <div className="flex items-center">
          <DatePicker
            ref={datepickerRef}
            popperPlacement="bottom-start"
            selected={new Date(passDate)}
            onChange={handleChangeDate}
            dateFormat="yyyy/MM/dd"
            maxDate={new Date()}
            customInput={
              <input id="passDate" className="h-[50px] w-[110px] rounded-lg border-none px-2 py-1 shadow-lg" />
            }
          >
            <button type="button" onClick={setDateToToday} className="rounded-sm bg-emerald-500 px-2 py-1 text-white">
              Today
            </button>
          </DatePicker>
        </div>
      </div>
    </div>
  );
}
